import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimationVariants } from '../lib/AnimationVariants'
import { userAuth } from '../store/userAuth.store'
import { Cog, Menu, Pen, Receipt, User, UserPen, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { componentStore } from '../store/componentStore'

function ProfileSidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const { authUser } = userAuth()
    const { selectedComponent, setSelectedComponent } = componentStore()

    return (
        <motion.section variants={AnimationVariants} animate={"animate"} exit={"exit"} initial={"initial"} transition={{ duraition: 0.3 }} className={`flex-shrink-0 sticky backdrop-blur-lg z-[100] top-0 left-0 flex justify-between items-center min-h-screen h-full shadow-[10px_5px_15px_rgba(0,0,0,0.1)] rounded-tr-md rounded-br-md flex justify-start items-center flex-col transition-all duration-[300ms] ${isMenuOpen ? 'fixed top-0 left-0 w-full sm:w-[300px] h-full lg:w-[300px]  lg:sticky' : 'w-[50px] mr-3'}`}>
            <div className='p-[10px] absolute top-0 right-0'>
                <Menu color='gray' className={!isMenuOpen ? "visible" : "hidden"} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                <X color='gray' className={isMenuOpen ? "visible" : "hidden"} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
            {
                isMenuOpen &&
                <>
                    <figure className='flex justify-center items-center flex-col border-b-1 border-gray-300 w-[90%] p-[25px]'>
                        <div className='w-[100px] h-[100px] relative'>
                            <Link to={'/profile'}>
                                <img className='h-full w-full rounded-full border-1 border-gray-400' src={authUser?.profilePic || "no-avatar.png"} alt="" />
                            </Link>
                        </div>
                        <p className='text-gray-500 text-[16px] mt-[7px]'>Hello</p>
                        <h1 className='text-[20px] font-bold'>{authUser?.username}</h1>
                    </figure>
                    <main className='w-full flex flex-col justify-between items-center h-[300px] mt-[20px]'>
                        <div onClick={() => setSelectedComponent("view-profile-page")} className={`hover:cursor-pointer transition-all transition-ease-in-out duration-[100ms]  flex justify-evenly items-center text-gray-500 rounded-md p-[15px] w-[80%] border-[1px] border-gray-200 ${selectedComponent === "view-profile-page" && 'bg-[#3771FF] text-white'}`}>
                            <User />
                            <p>View Profile</p>
                        </div>
                        <div onClick={() => setSelectedComponent("edit-profile-page")} className={`hover:cursor-pointer transition-all transition-ease-in-out duration-[100ms]  flex justify-evenly items-center text-gray-500 rounded-md p-[15px] w-[80%] border-[1px] border-gray-200 ${selectedComponent === "edit-profile-page" && 'bg-[#3771FF] text-white'}`}>
                            <UserPen />
                            <p>Edit Profile</p>
                        </div>
                        <div onClick={() => setSelectedComponent("account-settings")} className={`hover:cursor-pointer transition-all transition-ease-in-out duration-[100ms]  flex justify-evenly items-center text-gray-500 rounded-md p-[15px] w-[80%] border-[1px] border-gray-200 ${selectedComponent === "account-settings" && 'bg-[#3771FF] text-white'}`}>
                            <Cog />
                            <p>Account Settings</p>
                        </div>
                        <div onClick={() => setSelectedComponent("view-donations-page")} className={`hover:cursor-pointer transition-all transition-ease-in-out duration-[100ms]  flex justify-evenly items-center text-gray-500 rounded-md p-[15px] w-[80%] border-[1px] border-gray-200 ${selectedComponent === "view-donations-page" && 'bg-[#3771FF] text-white'}`}>
                            <Receipt />
                            <p>View Donation History</p>
                        </div>
                    </main>
                </>
            }
        </motion.section>
    )
}

export default ProfileSidebar
