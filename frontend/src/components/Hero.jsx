import React from 'react'
import SearchBar from './SearchBar'

function Hero() {
    return (
        <section className='flex justify-between items-center lg:items-start min-h-screen p-[20px] bg-[#F8F8FD]'>
            <article className='flex flex-1 justify-start items-start flex-col h-full'>
                <div className='font-bold text-[40px] lg:text-[60px] w-full flex flex-col justify-center lg:items-start items-center'>
                    <h1 className='text-[#25324B] w-full text-center lg:text-left lg:w-[350px]'>Discover more than <span className='text-[#26A4FF]'>5000+ skills</span> </h1>
                    <img src="/hero-deco.png" alt="" className='hidden lg:block lg:w-[400px]'/>
                </div>
                <p className='text-[#515B6F] text-center xl:text-left mt-[10px]'>An ideal platform for skilled individuals looking to earn more, help others, and grow their reputation — whether you're between jobs or just passionate about your craft.</p>
                <SearchBar />
            </article>
            <figure className='hidden lg:flex flex-1 h-full items-start'>
                <img src="/hero-img.png" alt="" className='h-full' />
            </figure>
        </section>
    )
}

export default Hero
