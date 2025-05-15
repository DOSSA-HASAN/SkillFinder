import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimationVariants } from '../lib/AnimationVariants'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Loading from '../components/Loading'
import { userAuth } from '../store/userAuth.store'

function Auth() {

    const { isLoggingIn, isSigningup } = userAuth()

    return (
        <motion.section variants={AnimationVariants} animate={"animate"} exit={"exit"} initial={"initial"} transition={{ duraition: 0.3 }} className='flex justify-between items-center min-h-screen h-full relative'>
            {
                (isLoggingIn || isSigningup) && <Loading />
            }
            <figure className='hidden h-full flex-1 lg:flex justify-center items-start '>
                <img src="/auth-img.png" alt="" className='h-[580px]' />
            </figure>
            {
                window.location.pathname === "/login" ?
                    <Login />
                    :
                    <Signup />
            }
        </motion.section>
    )
}

export default Auth
