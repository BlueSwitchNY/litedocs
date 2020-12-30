import { NextPage } from "next"
import Head from "next/head"
import React, { useRef, useState, useEffect, useContext } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

import Authors from "./Authors"
import Tags from "./Tags"

import { User, Tag } from "../../models/interfaces"

interface Props {
  users?: Array<User>
  tags?: Array<Tag>
  dateUpdated?: Date
}

const Details: NextPage<Props> = ({ users, tags, dateUpdated }) => {
  return (
    <>
      <h2 className="sr-only">Details</h2>
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          {/* Heroicon name: calendar */}
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-900 text-sm font-medium">
            Updated on{" "}
            <time dateTime={dayjs(dateUpdated).utc().format("YYYY-MM-DD")}>
              {dayjs(dateUpdated).utc().format("MMM D, YYYY")}
            </time>
          </span>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
        <Authors users={users} />
        <Tags tags={tags} />
      </div>
    </>
  )
}

export default Details
