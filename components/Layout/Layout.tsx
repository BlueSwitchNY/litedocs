import { NextPage } from "next"
import Head from "next/head"
import React, { useState, useEffect, useContext } from "react"

import Store from "../Store"
import MenuBar from "./MenuBar"
import SideBar from "./Sidebar"
import Footer from "./Footer"

interface Props {
  children: any
}

const Layout: NextPage<Props> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)
  return (
    <>
      <div className="antialiased text-gray-900">
        <div className="h-screen flex overflow-hidden">
          <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

          <div className="flex-1 flex-col relative z-0 overflow-y-auto">
            <MenuBar />
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
