import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm'>
        <div>
            <img src={assets.logo} alt="" className='mb-5 w-32' />
            <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nihil iure. Veniam eveniet tenetur porro quia cumque magni tempore hic!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus vitae perspiciatis, quos sunt hic alias.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>

            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>Get in touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 1234567890</li>
                <li>contact@forever.com</li>
            </ul>
        </div>
        

    </div>
    <div>
            <hr />
            <p className='py-5 text-center text-sm'>Copyright 2024 @ forever.com - All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer