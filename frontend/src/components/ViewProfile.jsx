import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { AnimationVariants } from '../lib/AnimationVariants'
import { Camera } from 'lucide-react'
import { userAuth } from '../store/userAuth.store'
import MissingField from './MissingField'
import ProfileField from './ProfileField'

function ViewProfile() {

    const { authUser } = userAuth()
    const imageInputRef = useRef(null)

    const handleImageInputRef = () => {
        imageInputRef.current?.click()
    }

    const skills = ["html", "css", "js"]

    return (

        <motion.section variants={AnimationVariants} animate={"animate"} exit={"exit"} initial={"initial"} transition={{ duraition: 0.3 }} className='flex flex-col justify-center items-center w-[calc(100%-80px)] md:w-[calc(100%-400px)] relative z-0 md:ml-[10px] lg:p-[20px]'>
            <h1 className='text-[#1F2937] font-bold text-[30px] lg:text-[40px] w-full p-[0px] mb-5 border-b-1 border-gray-300 p-3'>Profile Settings</h1>
            <figure className='relative flex items-center w-full'>
                <img className='rounded-full h-[110px] w-[110px] border-1 border-gray-400' src={authUser?.profilePic || "no-avatar.png"} alt="" />
                <figcaption className='bg-[#4640DE] rounded-full w-[50px] h-[50px] flex justify-center items-center absolute bottom-0 left-0'>
                    <Camera onClick={handleImageInputRef} size={25} color='white' className='hover:cursor-pointer' />
                    <input ref={imageInputRef} type="file" accept='image/*' hidden />
                </figcaption>
                <div className='hidden lg:flex flex-col justify-center items-start ml-[20px]'>
                    <h1 className='text-[20px] font-semibold text-[#1F2937]'>Profile Picture</h1>
                    <p className='text-gray-600'>Upload a professional profile picture</p>
                </div>
            </figure>
            <form className='mt-10 w-full overflow-hidden md:w-full'>
                <div className="flex flex-col lg:flex-row justify-evenly items-center w-[100%]">
                    <ProfileField label="Username" id="username" field={authUser?.username} missingField={"username"} />
                    <ProfileField label="Email" id="email" field={authUser?.email} missingField={"email"} />
                    <ProfileField label="Number" id="number" field={authUser?.number} missingField={"number"} />
                </div>
                <div className="flex flex-col lg:flex-row justify-evenly items-center w-[100%]">
                    <ProfileField label="Date of birth" id="dob" field={authUser.birthDate} missingField={"date of birth"} />
                    <ProfileField label="Location" id="location" field={authUser?.location} missingField={"location"} />
                    <ProfileField label="Experience" id="experience" field={authUser?.experience} missingField={"experience"} />
                </div>
                <ProfileField label="Bio" id="bio" field={authUser?.bio} missingField={"bio"} />
                <div className='w-full p-3'>
                    <label className='font-bold text-[20px] text-[#25324B]'>Skills</label>
                    {
                        authUser.skills.lenght > 0 ?
                            authUser?.skills.map((skill, index) => (
                                <ProfileField label="" id={index} field={skill} />
                            ))
                            :
                            <MissingField missingField={"skills"} />
                    }
                </div>

            </form>
        </motion.section>
    )
}

export default ViewProfile
