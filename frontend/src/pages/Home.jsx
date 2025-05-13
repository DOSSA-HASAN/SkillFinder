import React from 'react'
import Hero from '../components/Hero'
import { motion } from 'framer-motion'
import { AnimationVariants } from '../lib/AnimationVariants'

function Home() {
    return (
        <motion.section className='relative min-h-screen flex justify-center items-center' variants={AnimationVariants} animate={"animate"} initial={"initial"} exit={"exit"} transition={{ duration: 0.4 }}>
            <Hero />
        </motion.section>
    )
}

export default Home
