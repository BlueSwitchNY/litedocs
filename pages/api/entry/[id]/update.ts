import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, User } from "@prisma/client"
import auth from "../../../../middleware/auth"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const userAuth = await auth(req, res)
  const user = userAuth as User

  const prisma = new PrismaClient({ log: ["query"] })
  const {
    query: { id },
  } = req

  const entryId = id as unknown
  const entryIdString = entryId as string

  try {
    const { entry } = req.body
    const { title, category, tagsText, body, code } = entry
    console.log(req.body)

    const existingEntry = await prisma.entry.findUnique({
      where: {
        id: parseInt(entryIdString),
      },
      include: {
        Category: true,
        Author: true,
        Team: {
          include: {
            Members: true,
          },
        },
      },
    })

    const isMember = existingEntry.Team
      ? existingEntry.Team.Members.some((m) => m.userId === user.id)
      : false

    if (existingEntry.Author.issuer !== user.issuer && !isMember) {
      res.status(401)
      res.json({ authorized: false })
    }
    //only authorized if user is team member or entry author
    else {
      const tagsResponse = await handleUpdateTags(
        prisma,
        entryIdString,
        tagsText
      )

      let categoryId = 0
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: category.toLowerCase(),
        },
      })
      if (existingCategory) categoryId = existingCategory.id
      else {
        const newCategory = await prisma.category.create({
          data: {
            name: category.toLowerCase(),
          },
        })
        categoryId = newCategory.id
      }

      const entryResponse = await prisma.entry.update({
        where: { id: parseInt(entryIdString) },
        data: {
          title,
          Category: {
            connect: {
              id: categoryId,
            },
          },
          tagsText,
          body,
          code,
          dateUpdated: new Date(),
        },
      })

      //log history record
      const entryHistory = await prisma.entryHistory.create({
        data: {
          title,
          tagsText,
          body,
          code,
          Entry: {
            connect: {
              id: entryResponse.id,
            },
          },
        },
      })

      if (entryResponse.teamId) {
        await prisma.log.create({
          data: {
            note: "Updated",
            User: {
              connect: {
                id: user.id,
              },
            },
            EntryHistory: {
              connect: {
                id: entryHistory.id,
              },
            },
            Entry: {
              connect: {
                id: entryResponse.id,
              },
            },
            Team: {
              connect: {
                id: entryResponse.teamId,
              },
            },
          },
        })
      } else {
        await prisma.log.create({
          data: {
            note: "Updated",
            User: {
              connect: {
                id: user.id,
              },
            },
            EntryHistory: {
              connect: {
                id: entryHistory.id,
              },
            },
            Entry: {
              connect: {
                id: entryResponse.id,
              },
            },
          },
        })
      }

      res.status(201)
      res.json({ entryResponse, tagsResponse })
    }
  } catch (err) {
    res.status(500)
    res.json({ error: err.message })
    console.error(err.message)
  } finally {
    await prisma.$disconnect()
  }
}

async function handleUpdateTags(prisma, entryId, tagsText) {
  const entry = await prisma.entry.findUnique({
    where: {
      id: parseInt(entryId),
    },
    include: {
      Tags: true,
    },
  })
  const currentTagsText = entry.tagsText
  const currentTagArray = currentTagsText.split(",")
  const updatedTagArray = tagsText.split(",")

  let deletedTags = []

  //delete tags that are not in the updated array
  entry.Tags.forEach((tag) => {
    if (!updatedTagArray.includes(tag.name)) {
      prisma.tag
        .delete({
          where: {
            id: tag.id,
          },
        })
        .then((res) => {
          deletedTags.push(res)
        })
    }
  })

  let newTags = []

  //add tags that are not in the current array
  updatedTagArray.forEach((tag) => {
    if (!currentTagArray.includes(tag) && tag.length > 0) {
      prisma.tag
        .create({
          data: {
            Entry: {
              connect: {
                id: entry.id,
              },
            },
            name: tag,
          },
        })
        .then((res) => {
          newTags.push(res)
        })
    }
  })

  return { deletedTags, newTags }
}
