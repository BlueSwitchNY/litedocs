import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, User } from "@prisma/client"
import auth from "../../../../middleware/auth"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const userAuth = await auth(req, res)
  const user = userAuth as User

  const prisma = new PrismaClient({ log: ["query"] })
  const {
    query: { handle },
  } = req
  console.log(req.query)

  const teamHandle = handle as unknown
  const teamHandleString = teamHandle as string

  try {
    const team = await prisma.team.findUnique({
      where: {
        handle: teamHandleString,
      },
      include: {
        Members: true,
      },
    })

    const isMember = team.Members.some((m) => m.userId === user.id)
    if (!isMember) {
      res.status(401)
      res.json({ authorized: false })
    }
    //return categories if user is part of the team
    else {
      const categories = await prisma.entry.findMany({
        select: {
          Category: true,
        },
        where: {
          Team: {
            handle: teamHandleString,
          },
        },
        distinct: ["categoryId"],
      })

      res.status(200)
      res.json({ authorized: true, categories })
    }
  } catch (err) {
    res.status(500)
    res.json({ error: err.message })
  } finally {
    await prisma.$disconnect()
  }
}
