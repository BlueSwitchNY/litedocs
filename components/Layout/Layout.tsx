import { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect, useContext } from "react"

import Store from "../Store"
import Menubar from "./MenuBar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

interface Props {
  children: any
}

const Layout: NextPage<Props> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Menubar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        {children}
        {/* Footer component would go here */}
      </div>
    </div>
  )
}

export default Layout
