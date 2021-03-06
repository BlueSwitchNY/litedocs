import * as React from "react"
import Router from "next/router"
import { useContext, useState, useEffect, useRef } from "react"
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"

import { NextPage } from "next"
import Link from "next/link"

interface Props {
  openSidebar: boolean
  setOpenSidebar: any
}

const Menubar: NextPage<Props> = ({ openSidebar, setOpenSidebar }) => {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    const pathName = window.location.pathname
    if (pathName) {
      setCurrentPath(pathName)
    }
  }, [])

  function handleSearch(input) {
    //console.log("input:", input)
    //TODO: include other non-team paths
    // if (currentPath !== "/me" && currentPath !== "/") {
    //   Router.push(`/${currentPath.substring(1)}?tag=${input}`)
    // }
  }
  return (
    <>
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none 
          focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden"
          onClick={() => setOpenSidebar(true)}
        >
          <span className="sr-only">Open sidebar</span>
          {/* Heroicon name: menu-alt-2 */}
          <svg
            className="h-6 w-6"
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
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex">
            <form className="w-full flex lg:ml-0" action="#" method="GET">
              <label htmlFor="search_field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  {/* Heroicon name: search */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 
                      4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search_field"
                  className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 
                  placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 
                  focus:border-transparent sm:text-sm"
                  placeholder="Search"
                  type="search"
                  name="tag"
                  //onKeyUp={(e) => handleSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
          {/* <div className="ml-4 flex items-center lg:ml-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm 
              font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Create
            </button>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Menubar
