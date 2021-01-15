import { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect, useContext } from "react"

import { User } from "../../models/interfaces"

interface Props {
  user: User
  handleLogout: any
}

const ProfileNavItem: NextPage<Props> = ({ user, handleLogout }) => {
  return (
    <div className="flex-shrink-0 flex bg-gray-600 p-4">
      <a href="#" className="flex-shrink-0 group block">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={
                user && user.imageUrl
                  ? user.imageUrl
                  : "https://res.cloudinary.com/raskin-me/image/upload/v1609178151/litedocs/unnamed_gnub6h.jpg"
              }
              alt=""
            />
          </div>
          {user ? (
            <div className="ml-3">
              <p className="text-base font-medium text-gray-100 group-hover:text-gray-200">
                {user ? (user.name ? user.name : user.email) : ""}
              </p>
              <p className="text-sm font-medium text-gray-300">
                <span className="hover:text-gray-400">View profile</span>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a
                  href="#"
                  className="py-2 text-gray-300 hover:text-gray-400"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </p>
            </div>
          ) : null}
        </div>
      </a>
    </div>
  )
}

export default ProfileNavItem
