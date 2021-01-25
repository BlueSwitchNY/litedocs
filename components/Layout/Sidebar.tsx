import * as React from "react"
import Router from "next/router"
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"

import { NextPage } from "next"
import Link from "next/link"

import SidebarItems from "./SideBarItems"
import ProfileNavItem from "./ProfileNavItem"
import { documentTextIcon } from "../SVG/Heroicons"

import { User, Member, Team, Tag } from "../../models/interfaces"

interface SideBarProps {
  userAgent?: string
  openSidebar: boolean
  setOpenSidebar: any
}

const SideBar: NextPage<SideBarProps> = ({ openSidebar, setOpenSidebar }) => {
  const company = {
    name: "LiteDocs",
    logoImageUrl:
      "https://res.cloudinary.com/raskin-me/image/upload/v1609184213/litedocs/litedocs-logo-text_xvcix3.png",
  }

  const [loggedIn, setLoggedIn] = React.useContext(LoggedInContext)
  const [magic] = React.useContext(MagicContext)

  /**
   * Log user out of of the session with our app (clears the `auth` cookie)
   * Log the user out of their session with Magic
   */
  const handleLogout = async () => {
    fetch(`/api/user/logout`, {
      method: "GET",
    })
    setLoggedIn(false)
    await magic.user.logout()
  }

  const [currentUser, setCurrentUser] = React.useState(null)
  const [teamTags, setTeamTags] = React.useState([])
  let teamTagsArray = []

  async function getUser(user) {
    let resUser = await fetch(`/api/user/magic/${user.issuer}`)
    let dataUser = await resUser.json()
    const dataUserObject: User = dataUser.user
    setCurrentUser(dataUserObject)
    // const userInitials = document.querySelector("#userInitials")
    // userInitials.innerHTML = dataUserObject.name
    //   ? dataUserObject.name.substring(0, 1)
    //   : "?"

    // dataUserObject.Memberships.forEach((membership: Member) => {
    //   const handle = membership.Team.handle
    //   let teamAndTags = {
    //     team: handle,
    //     tags: [],
    //   }

    //   fetch(`/api/team/${handle}/tags`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       teamAndTags.tags = res.tags
    //       teamTagsArray.push(teamAndTags)
    //       setTeamTags(teamTagsArray)
    //       console.log("teamTags:", teamTagsArray)
    //     })
    // })
  }

  React.useEffect(() => {
    fetch(`/api/user`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          getUser(data.user)
        }
      })
  }, [])
  return (
    <>
      {/* Off-canvas menu for MOBILE, show/hide based on off-canvas menu state. */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 flex z-40
        transition-opacity ease-linear duration-300
        ${
          openSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        `}
        >
          <div
            onClick={() => setOpenSidebar(false)}
            className={`fixed inset-0`}
            aria-hidden="true"
          >
            <div className={`absolute inset-0 bg-gray-600 opacity-75`} />
          </div>
          <div
            onClick={() => setOpenSidebar(false)}
            className={`relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800
          transition ease-in-out duration-300 transform
            ${openSidebar ? "-translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                {/* Heroicon name: x */}
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-12 w-auto"
                src={company.logoImageUrl}
                alt={company.name}
              />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2">
                <SidebarItems currentUser={currentUser} />
              </nav>
            </div>
            <ProfileNavItem user={currentUser} handleLogout={handleLogout} />
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>

      {/* Static sidebar for DESKTOP */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
              <img
                className="h-12 w-auto"
                src={company.logoImageUrl}
                alt={company.name}
              />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-gray-800">
                <SidebarItems currentUser={currentUser} />
              </nav>
            </div>
            <ProfileNavItem user={currentUser} handleLogout={handleLogout} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar
