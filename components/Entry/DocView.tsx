import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router from "next/router"
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
import Markdown from "react-markdown"
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import styled from "styled-components"
import beautify from "js-beautify"
const beautifyJS = beautify.js
import DataTable, { defaultThemes } from "react-data-table-component"

import Activity from "./Activity"
import Details from "./Details"

import { User, Entry, EntryHistory, Log } from "../../models/interfaces"

interface Props {
  entry: Entry
}

const DocView: NextPage<Props> = ({ entry }) => {
  const now = dayjs()

  const lastUpdatedLog: Log = entry.Logs[0]
  const logUsers: Array<User> = entry.Logs.map((log) => log.User)
  let userIdSet = new Set()
  let authors: Array<User> = []
  logUsers.forEach((user: User) => {
    if (!userIdSet.has(user.id)) {
      userIdSet.add(user.id)
      authors.push(user)
    }
  })

  const activityStyles = {
    header: {
      style: {
        minHeight: "56px",
        fontSize: "14px",
        letterSpacing: ".05em",
        textTransform: "uppercase",
        color: "rgba(113,128,150,1)",
        top: 0,
        position: "sticky",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        fontWeight: 900,
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "0px",
        borderBottomWidth: "0px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        letterSpacing: ".05em",
        textTransform: "uppercase",
        color: "rgba(113,128,150,1)",
        top: 0,
        position: "sticky",
        // paddingLeft: "1.5rem",
        // paddingRight: "1.5rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        fontSize: "0.75rem",
        fontWeight: 700,
        borderBottomWidth: "0px",
        borderColor: "rgba(237,242,247,1)",
        backgroundColor: "rgba(247,250,252,1)",
        // boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)",
      },
    },
    cells: {
      style: {
        borderColor: "#FFFFFF",
        "&:not(:last-of-type)": {
          borderTopWidth: "0px",
          borderBottomWidth: "0px",
          borderStyle: "dashed",
          borderColor: "#FFFFFF",
        },
      },
    },
  }

  const activityData = entry.Logs
  const activityColumns = [
    {
      name: "Date/Time",
      cell: (row: Log) => (
        <div>{dayjs(row.createdAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    {
      name: "Author",
      cell: (row: Log) => <div>{row.User.name}</div>,
    },
    {
      name: "Action",
      cell: (row: Log) => <div>{row.note}</div>,
    },
  ]
  return (
    <main
      className="flex-1 relative overflow-y-auto focus:outline-none"
      tabIndex={-1}
    >
      <div className="py-8 xl:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
          <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
            <div>
              <div>
                <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                  <div>
                    <h1 className="mb-0 text-2xl font-bold text-gray-900">
                      {entry.title}
                    </h1>
                    {/* <p className="mt-2 text-sm text-gray-500">
                      #400 opened by{" "}
                      <a href="#" className="font-medium text-gray-900">
                        Hilary Mahy{" "}
                      </a>
                      in{" "}
                      <a href="#" className="font-medium text-gray-900">
                        Customer Portal
                      </a>
                    </p> */}
                  </div>
                  <div className="mt-4 flex space-x-3 md:mt-0">
                    <Link
                      href="/entry/[entryid]/edit"
                      as={`/entry/${entry.id}/edit`}
                    >
                      <a
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        {/* Heroicon name: pencil */}
                        <svg
                          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit</span>
                      </a>
                    </Link>
                  </div>
                </div>
                <aside className="mt-8 xl:hidden">
                  <Details
                    users={authors}
                    tags={entry.Tags}
                    dateUpdated={entry.dateUpdated}
                  />
                </aside>
                <div className="py-3 xl:pt-6 xl:pb-0">
                  <h2 className="sr-only">Description</h2>
                  <div className="prose max-w-none">
                    <hr className="xl:hidden" />
                    <Markdown className="markdown-body">
                      {entry.body.replace(/\\/g, "")}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>
            <div className={`mt-6 ${entry.code.length > 0 ? "" : "hidden"}`}>
              Code:
              <Highlight
                {...defaultProps}
                theme={theme}
                code={beautifyJS(
                  entry.code.replace(/\\n/g, "").replace(/\\/g, "")
                )}
                language="jsx"
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <Line key={i} {...getLineProps({ line, key: i })}>
                        <LineNo>{i + 1}</LineNo>
                        <LineContent>
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </LineContent>
                      </Line>
                    ))}
                  </Pre>
                )}
              </Highlight>
            </div>
            <Activity />
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
              <div className="">
                <DataTable
                  title="Activity"
                  columns={activityColumns}
                  data={activityData}
                  customStyles={activityStyles}
                  pagination
                  dense
                />
              </div>
            </div>
          </div>
          <aside className="hidden xl:block xl:pl-8">
            <Details
              users={authors}
              tags={entry.Tags}
              dateUpdated={entry.dateUpdated}
            />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default DocView

export const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`

export const Pre = styled.pre`
  text-align: left;
  font-size: 14px;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

export const Line = styled.div`
  display: table-row;
`

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`

export const LineContent = styled.span`
  display: table-cell;
`
