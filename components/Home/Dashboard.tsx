import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router from "next/router"
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(utc)
dayjs.extend(relativeTime)
import styled from "styled-components"
import DataTable, { defaultThemes } from "react-data-table-component"

import Section from "../Layout/Section"

import { User, Log, Team } from "../../models/interfaces"

interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  const now = dayjs()
  const [myActivity, setMyActivity] = React.useState(new Array<Log>())
  const [teamActivity, setTeamActivity] = React.useState([])

  async function getLogs() {
    let res = await fetch(`/api/user`)
    let data = await res.json()
    const user = data.user

    let resLogs = await fetch(`/api/user/${user.issuer}/dashboard`)
    let dataLogs = await resLogs.json()
    console.log("logs:", dataLogs)
    if (dataLogs.authorized) {
      setMyActivity(dataLogs.logs)
      setTeamActivity(dataLogs.teamLogs)
    }
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  React.useEffect(() => {
    getLogs()
  }, [])

  const myActivityColumns = [
    {
      name: "Date/Time",
      sortable: true,
      cell: (row: Log) => (
        <div>{dayjs(row.createdAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    {
      name: "Document",
      sortable: true,
      cell: (row: Log) => (
        <Link href="/entry/[entryid]" as={`/entry/${row.Entry.id}`}>
          <a className="text-blue-600">{row.Entry.title}</a>
        </Link>
      ),
    },
    {
      name: "Action",
      sortable: false,
      cell: (row: Log) => <div>{row.note}</div>,
    },
    {
      name: "Team",
      sortable: false,
      cell: (row: Log) => (
        <div>{row.Entry.Team ? row.Entry.Team.name : ""}</div>
      ),
    },
  ]

  const rightColStyles = styled.div({
    textAlign: "right",
  })
  const docsColumns = [
    {
      name: "Document",
      // hide: "sm",
      sortable: true,
      cell: (row: Log) => (
        <div className="min-w-0 space-y-3 cursor-pointer">
          <div className="flex items-center space-x-3 text-sm font-medium">
            {row.Entry.title}
          </div>
          <a href="#" className="relative group flex items-center space-x-2.5">
            <img
              className={`inline-block h-6 w-6 rounded-full border-2 border-white
      ${row.User.imageUrl ? "" : "hidden"}`}
              src={row.User.imageUrl}
              alt={row.User.name ? row.User.name : row.User.email}
              title={row.User.name ? row.User.name : row.User.email}
            ></img>
            <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
              {row.User.name}
            </span>
          </a>
        </div>
      ),
    },
    {
      name: "Action",
      sortable: false,
      // hide: "lg",
      cell: (row: Log) => (
        <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3 cursor-pointer"></div>
      ),
    },
    {
      name: "Action",
      style: rightColStyles,
      // hide: "sm",
      sortable: false,
      cell: (row: Log) => (
        <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3 cursor-pointer">
          <p className="flex items-center space-x-4">
            <span className="relative text-sm text-gray-500 hover:text-gray-900 font-medium">
              {row.note}
            </span>
          </p>
          <p className="flex text-gray-500 text-sm space-x-2">
            <span>
              {dayjs.utc(row.createdAt).from(now.format("MM/DD/YYYY h:mm A"))}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {row.Entry.Category ? toTitleCase(row.Entry.Category.name) : ""}
            </span>
            <span aria-hidden="true">·</span>
            <span>{row.Entry.Team ? row.Entry.Team.name : "Personal"}</span>
          </p>
        </div>
      ),
    },
  ]

  const activityColumns = [
    {
      name: "Activity",
      sortable: false,
      // hide: "lg",
      cell: (row: Log) => (
        <div className="flex space-x-3">
          <img
            className={`inline-block h-6 w-6 rounded-full border-2 border-white
  ${row.User.imageUrl ? "" : "hidden"}`}
            src={row.User.imageUrl}
            alt={row.User.name ? row.User.name : row.User.email}
            title={row.User.name ? row.User.name : row.User.email}
          ></img>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{row.User.name}</div>
              <div className="text-sm text-gray-500">
                {dayjs
                  .utc(row.createdAt)
                  .from(now.format("MM/DD/YYYY h:mm A"))
                  .replace(" ago", "")}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {row.note} {row.Entry.title}
            </p>
          </div>
        </div>
      ),
    },
  ]

  let activityRecordCount = 0
  return (
    <main
      className="flex-1 relative overflow-y-auto focus:outline-none"
      tabIndex={-1}
    >
      {/* 3 column wrapper */}
      <div className="flex-grow w-full xl:max-w-full max-w-7xl mx-auto xl:px-8 lg:flex">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 min-w-0 bg-white xl:flex">
          {/* Projects List */}
          <div className="bg-white lg:min-w-0 lg:flex-1">
            <div className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
              <div className="flex items-center">
                <h1 className="flex-1 text-lg font-medium">Documents</h1>
                <div className="relative">
                  <button
                    id="sort-menu"
                    type="button"
                    className="hidden w-full bg-white border border-gray-300 rounded-md 
                    shadow-sm px-4 py-2 inline-flex justify-center text-sm 
                    font-medium text-gray-700 hover:bg-gray-50 
                    focus:outline-none focus:ring-2 focus:ring-offset-2"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {/* Heroicon name: sort-ascending */}
                    <svg
                      className="mr-3 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                    </svg>
                    Sort
                    {/* Heroicon name: chevron-down */}
                    <svg
                      className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* SORT DROPDOWN MENU */}
                  <div className="hidden origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="sort-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Name
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Date modified
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Date created
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <DataTable
              title="My Activity"
              columns={myActivityColumns}
              data={myActivity}
              customStyles={activityStyles}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20]}
              pagination
              dense
              responsive={true}
              overflowY={true}
            /> */}

            {/* TODO: change api to fetch all documents from all teams AND personal */}
            {teamActivity.map((teamLogObject) => {
              const team: Team = teamLogObject.team
              const logs: Array<Log> = teamLogObject.logs
              return (
                <DataTable
                  key={team.id}
                  title={`Documents`}
                  noHeader={true}
                  noTableHead={true}
                  columns={docsColumns}
                  data={logs}
                  customStyles={documentsStyles}
                  paginationPerPage={20}
                  paginationRowsPerPageOptions={[20, 50, 100]}
                  pagination
                  onRowClicked={(row) => {
                    Router.push(`/entry/${row.Entry.id}`)
                  }}
                />
              )
            })}
          </div>
        </div>
        {/* Activity feed */}
        <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:block hidden">
          <div className="pl-6 lg:w-80">
            <div className="pt-6 pb-2">
              <h2 className="text-sm font-semibold">Activity</h2>
            </div>
            <div>
              {teamActivity.map((teamLogObject) => {
                const team: Team = teamLogObject.team
                const logs: Array<Log> = teamLogObject.logs
                return (
                  <ul className="divide-y divide-gray-200">
                    {logs.map((log: Log) => {
                      activityRecordCount++
                      if (activityRecordCount <= 20) {
                        return (
                          <li className="py-4">
                            <div className="flex space-x-3">
                              <img
                                className={`inline-block h-6 w-6 rounded-full border-2 border-white
  ${log.User.imageUrl ? "" : "hidden"}`}
                                src={log.User.imageUrl}
                                alt={
                                  log.User.name ? log.User.name : log.User.email
                                }
                                title={
                                  log.User.name ? log.User.name : log.User.email
                                }
                              ></img>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-medium">
                                    {log.User.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {dayjs
                                      .utc(log.createdAt)
                                      .from(now.format("MM/DD/YYYY h:mm A"))
                                      .replace(" ago", "")}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {log.note} {log.Entry.title}
                                </p>
                              </div>
                            </div>
                          </li>
                        )
                      }
                    })}
                  </ul>
                )
              })}
              <div className="py-4 text-sm border-t border-gray-200">
                <a
                  href="#"
                  className="text-indigo-600 font-semibold hover:text-indigo-900"
                >
                  View all activity <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard

const documentsStyles = {
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
      paddingTop: "1rem",
      paddingBottom: "1rem",
      "&:not(:last-of-type)": {
        borderTopWidth: "0px",
        borderBottomWidth: "0px",
        borderStyle: "dashed",
        borderColor: "#FFFFFF",
      },
    },
  },
  rows: {
    style: {
      borderBottomWidth: "1px",
    },
  },
}

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
