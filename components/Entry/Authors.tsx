import { NextPage } from "next"
import Head from "next/head"
import React, { useRef, useState, useEffect, useContext } from "react"

import { User } from "../../models/interfaces"

interface Props {
  users?: Array<User>
}

const Authors: NextPage<Props> = ({ users }) => {
  return (
    <div>
      <h2 className="mb-1 text-sm font-medium text-gray-500">Authors</h2>
      <div className="flex -space-x-2 overflow-hidden mb-6">
        {users.map((user: User) => (
          <div key={user.id} className="tooltip">
            <img
              className={`inline-block h-10 w-10 rounded-full border-2 border-white
      ${user.imageUrl ? "" : "hidden"}`}
              src={user.imageUrl}
              alt=""
              title={user.name ? user.name : user.email}
            ></img>
            <span className="tooltiptext">
              {user.name ? user.name : user.email}
            </span>
            <div
              className={`inline-block font-bold w-10 h-10 bg-blue-600 tooltip
      text-white text-center justify-center rounded-full border-2 border-white
      ${user.imageUrl ? "hidden" : ""}`}
            >
              <span className="m-1 text-2xl">
                {user.name ? user.name.substring(0, 1) : "?"}
              </span>
              <span className="tooltiptext">
                {user.name ? user.name : user.email}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* <ul className="mt-3 space-y-3">
        {users
          ? users.map((user: User) => (
              <li key={user.id} className="flex justify-start">
                <a href="#" className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-5 w-5 rounded-full"
                      src={
                        user.imageUrl
                          ? user.imageUrl
                          : "https://res.cloudinary.com/raskin-me/image/upload/v1609178151/litedocs/unnamed_gnub6h.jpg"
                      }
                      alt={user.name}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </a>
              </li>
            ))
          : null}
      </ul> */}
    </div>
  )
}

export default Authors
