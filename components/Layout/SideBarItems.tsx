import * as React from "react"
import Router from "next/router"
import { useContext, useState, useEffect, useRef } from "react"
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"

import { NextPage } from "next"
import Link from "next/link"

import DocSection from "./DocSection"

import {
  viewGridIcon,
  documentsIcon,
  userGroupIcon,
  hashtagIcon,
} from "../SVG/Heroicons"

import { User, Entry, Member, Team, Tag } from "../../models/interfaces"

interface SideBarItemsProps {
  currentUser: User
  teamTagsList?: Array<TeamTags>
}

interface TeamTags {
  team: string
  tags: Array<Tag>
}

const SideBarItems: NextPage<SideBarItemsProps> = ({ currentUser }) => {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    const pathName = window.location.pathname
    if (pathName) {
      setCurrentPath(pathName)
    }
  }, [])

  //generate unique categories
  //TODO: swap with /team/[handle]/categories api response
  let teamCategories = {}
  if (currentUser) {
    currentUser.Memberships.forEach((membership: Member) => {
      let categorySet = new Set()
      membership.Team.Entries.forEach((entry: Entry) => {
        categorySet.add(entry.Category ? entry.Category.name : "other")
      })
      teamCategories[membership.Team.handle] = Array.from(categorySet).sort()
    })
  }
  return (
    <>
      <div className="space-y-1">
        <Link href="/">
          <a
            className={`flex items-center px-2 py-2 lg:text-sm text-base font-medium rounded-md
          ${
            currentPath === "/"
              ? "bg-gray-900 text-white group"
              : "text-gray-300 hover:bg-gray-700 hover:text-white group"
          }`}
          >
            {viewGridIcon(
              24,
              24,
              "mr-4 text-gray-400 group-hover:text-gray-300"
            )}
            Dashboard
          </a>
        </Link>
        <Link href="/me">
          <a
            className={`flex items-center px-2 py-2 lg:text-sm text-base font-medium rounded-md
          ${
            currentPath === "/me"
              ? "bg-gray-900 text-white group"
              : "text-gray-300 hover:bg-gray-700 hover:text-white group"
          }
          `}
          >
            {documentsIcon(
              24,
              24,
              "mr-4 text-gray-400 group-hover:text-gray-300"
            )}
            Personal
          </a>
        </Link>
      </div>
      <div className="mt-10">
        {currentUser
          ? currentUser.Memberships.map((membership: Member) => {
              return (
                <div key={membership.id}>
                  <p className="px-2 text-xs font-semibold uppercase tracking-wider">
                    <a
                      href={`/${membership.Team.handle}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {membership.Team.name}
                    </a>
                  </p>
                  <div className="mt-2 space-y-1">
                    {teamCategories[membership.Team.handle].map((category) => (
                      <DocSection
                        category={category}
                        entries={membership.Team.Entries}
                      />
                    ))}
                  </div>
                </div>
              )
            })
          : null}
      </div>
      {/* {teamTagsList.map((teamTags: TeamTags) => (
        <div key={teamTags.team}>
          <a href={`/${teamTags.team}`}>
            <h3
              className={`mt-2 mb-0 px-2 py-2 rounded-lg flex items-center font-semibold text-white 
            focus:outline-none hover:bg-gray-700 focus:text-white 
            focus:bg-gray-700 hover:text-white
            uppercase tracking-wider text-xs`}
            >
              {teamTags.team}
            </h3>
          </a>
          <div>
            {teamTags.tags.map((tag: Tag) => (
              <a
                key={tag.id}
                href={`?tag=${tag.name}`}
                className={`px-2 py-1 rounded-lg flex items-center font-medium text-sm
        text-gray-300 hover:bg-gray-700 focus:outline-none focus:text-white 
        focus:bg-gray-700 hover:text-white`}
              >
                {hashtagIcon(20, 20, "mr-2 opacity-50")}
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      ))} */}
    </>
  )
}

export default SideBarItems
