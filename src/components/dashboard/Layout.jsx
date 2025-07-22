import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '../ui/toaster'
const Layout = ({children}) => {

  return (
    <>
      {children?children:<Outlet />}
      <Toaster />
    </>
  )
}

export default Layout