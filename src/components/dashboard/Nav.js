import React, { useState } from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import { Link } from 'react-router-dom'
import UserInfo from '../User/UserInfo'
import Editorx from '../common/images/text-editor.png'
import { useSelector } from 'react-redux'

const Nav = () => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const [showUser, setShowUser] = useState(false)
    const toggleUser = () => setShowUser(!showUser)
  return (
    <div>
        {/* <!-- component -->
            <!-- follow me on twitter @asad_codes --> */}

            <nav className="flex flex-wrap place-items-center">
            {isAuthenticated && <UserInfo showUser={showUser} toggleUser={toggleUser} />}
            <section className="relative mx-auto">
                {/* <!-- navbar --> */}
                <nav className="flex justify-between bg-gray-900 text-white w-screen">
                <div className="px-5 xl:px-12 xl:pr-5 py-4 flex w-full items-center">
                    <Link className="text-2xl flex flex-row justify-center items-center font-bold" to="/document">
                    <img className="h-14" src={Editorx} alt="logo"/>
                    <span className=''>editorX</span>
                    </Link>
                    {/* <!-- Nav Links --> */}
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><Link className="hover:text-gray-200" to="/document">Home</Link></li>
                    <li><Link className="hover:text-gray-200" to={"/docs"}>Docs</Link></li>
                    <li><Link className="hover:text-gray-200" to={"/pricing"}>Pricing</Link></li>
                    <li><Link className="hover:text-gray-200" target='_blank' to={"https://docs.google.com/forms/d/e/1FAIpQLSe-bALv3_KrCvZzQCVMX6tG8UmUGuPDc9GeYz8A-0mVnWxCbQ/viewform"}>Contact Us</Link></li>
                    </ul>
                    {/* <!-- Header Icons -->stroke-linejoin */}
                    <div className="hidden xl:flex items-center space-x-5 items-center">
                    {/* <a className="hover:text-gray-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </a> */}
                    <Link onClick={(e) => e.preventDefault()} className="flex items-center hover:text-gray-200" >
                        <ModeToggle />
                    </Link>
                    {/* <!-- Sign In / Register         --> */}
                    
                    
                    </div>
                </div>
                <div className="navbar-burger self-center xl:hidden mr-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                {isAuthenticated && <div onClick={toggleUser} className="flex items-center mr-7 hover:text-gray-200 cursor-pointer" >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>}
                {!isAuthenticated && <div className="flex mr-7 items-center hover:text-gray-200 cursor-pointer" >
                    <ul><Link className="hover:text-gray-200" to="/register">SignUp</Link></ul>
                </div>}
                </nav>
                
            </section>
            </nav>
    </div>
  )
}

export default Nav