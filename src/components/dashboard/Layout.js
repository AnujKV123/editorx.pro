import React from 'react'
import Nav from './Nav'
// import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from '../ui/toaster'
const Layout = ({children}) => {

  return (
    <>
      <Nav />
      {children?children:<Outlet />}
      <Toaster />
      {/* <Footer /> */}
    </>
  )
}

export default Layout