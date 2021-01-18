import { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect, useContext } from "react"

import { Entry } from "../../models/interfaces"

interface Props {
  category: String
  entries: Array<Entry>
}

const DocSection: NextPage<Props> = ({ category, entries }) => {
  const [showDocs, setShowDocs] = useState(true)

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }
  return (
    <div>
      <div
        className="md:flex md:items-center md:justify-between cursor-pointer"
        onClick={() => setShowDocs(!showDocs)}
      >
        <div>
          <p
            className="flex items-center text-gray-300 px-2 py-1 lg:text-base text-md 
                        font-medium rounded-md"
          >
            {toTitleCase(category)}
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0 text-gray-300">
          {showDocs ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
      </div>

      {showDocs
        ? entries.map((entry: Entry) => {
            if (entry.Category && entry.Category.name === category) {
              return (
                <a
                  href={`/entry/${entry.id}`}
                  className="ml-4 flex items-center text-gray-300 hover:bg-gray-700 
        hover:text-white px-2 py-1 lg:text-sm text-base font-medium rounded-md"
                >
                  <span className="truncate">{entry.title}</span>
                </a>
              )
            }
          })
        : null}
    </div>
  )
}

export default DocSection
