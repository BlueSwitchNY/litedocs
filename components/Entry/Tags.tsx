import { NextPage } from "next"
import Head from "next/head"
import React, { useRef, useState, useEffect, useContext } from "react"

import { Tag } from "../../models/interfaces"

interface Props {
  tags?: Array<Tag>
}

const Tags: NextPage<Props> = ({ tags }) => {
  return (
    <div>
      <h2 className="mb-1 text-sm font-medium text-gray-500">Tags</h2>
      <ul className="mt-2 leading-8">
        {tags
          ? tags.map((tag: Tag) => (
              <li key={tag.id} className="inline">
                <a
                  href="#"
                  className="mr-1 relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5"
                >
                  <div className="absolute flex-shrink-0 flex items-center justify-center">
                    {/* <span
                className="h-1.5 w-1.5 rounded-full bg-red-500"
                aria-hidden="true"
              /> */}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {tag.name}
                  </div>
                </a>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default Tags
