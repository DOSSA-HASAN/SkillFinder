import { MapPin, Search } from 'lucide-react';
import React, { useState } from 'react'

function SearchBar() {

    const [formData, setFormData] = useState({
        skill: "",
        location: ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(formData)
    }

    return (
        <form className='flex flex-col lg:flex-row justify-between items-center bg-white p-[25px] shadow-md w-full lg:w-[80%] mt-[30px] lg:absolute lg:bottom-30'>
            <div className='flex justify-center items-center w-full lg:w-[calc(100% / 3)]'>
                <Search color='gray' />
                <input type="text" name='skill' value={formData.skill} onChange={(e) => handleInputChange(e)} placeholder='Skill title or keyword' className='ml-[5px] border-b-1 border-gray-300 p-[10px] focus:outline-none text-gray-500 w-full' />
            </div>
            <div className='flex justify-center items-center w-full lg:w-[calc(100% / 3)]'>
                <MapPin color='gray' />
                <input type="text" name='location' value={formData.location} onChange={(e) => handleInputChange(e)} placeholder='City, Country' className='ml-[5px] border-b-1 border-gray-300 p-[10px] focus:outline-none text-gray-500 w-full' />
            </div>
            <button className='text-white bg-[#4640DE] p-[10px] border-none w-full mt-[15px] lg:mt-0 lg:w-[calc(100% / 3)]'>Search for skill</button>
        </form>
    )
}

export default SearchBar
