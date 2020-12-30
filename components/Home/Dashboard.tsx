import React from "react"
import { NextPage } from "next"
import Link from "next/link"
import Router from "next/router"
import { MagicContext, LoggedInContext, LoadingContext } from "../Store"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
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

  React.useEffect(() => {
    getLogs()
  }, [])

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

  const activityData = myActivity
  const activityColumns = [
    {
      name: "Date/Time",
      sortable: true,
      cell: (row: Log) => (
        <div>{dayjs(row.createdAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    {
      name: "Documentation",
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

  const teamActivityColumns = [
    {
      name: "Date/Time",
      sortable: true,
      cell: (row: Log) => (
        <div>{dayjs(row.createdAt).format("MM/DD/YYYY h:mm A")}</div>
      ),
    },
    {
      name: "Documentation",
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
      name: "Author",
      sortable: false,
      cell: (row: Log) => <div>{row.User.name}</div>,
    },
  ]
  return (
    <Section extend="mb-10">
      {/* <div className="flex flex-wrap -m-2">
        <h2 className="uppercase tracking-wider text-sm font-semibold">
          My Activity
        </h2>
        <div className="h-12 m-2 w-full rounded-md sm:rounded-lg flex">
          <div>
            <ul className="divide-y divide-gray-200">
              {myActivity
                ? myActivity.map((log: Log) => (
                    <li className="py-4">
                      <div className="flex space-x-3">
                        <img
                          className="h-6 w-6 rounded-full"
                          src={log.User.imageUrl}
                          alt={log.User.name}
                        ></img>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              {log.User.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {dayjs(log.createdAt).format("MM/DD/YYYY")}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {log.note}{" "}
                            <Link
                              href="/entry/[entryid]"
                              as={`/entry/${log.Entry.id}`}
                            >
                              <a>{log.Entry.title}</a>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div> */}

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div className="">
          <DataTable
            title="My Activity"
            columns={activityColumns}
            data={activityData}
            customStyles={activityStyles}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 20]}
            pagination
            dense
            responsive={true}
            overflowY={true}
          />
        </div>
      </div>
      {teamActivity.map((teamLogObject) => {
        const team: Team = teamLogObject.team
        const logs: Array<Log> = teamLogObject.logs
        return (
          <div
            key={team.id}
            className="mt-6 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"
          >
            <div className="">
              <DataTable
                title={`${team.name} Activity`}
                columns={teamActivityColumns}
                data={logs}
                customStyles={activityStyles}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 20]}
                pagination
                dense
                responsive={true}
                overflowY={true}
              />
            </div>
          </div>
        )
      })}
    </Section>
  )
}

export default Dashboard
