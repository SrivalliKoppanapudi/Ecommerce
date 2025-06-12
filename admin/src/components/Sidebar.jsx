import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div>

        <div className='min-h-screen border-r-2'>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2' to="/add">
            <img className='w-5 h-5' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add items</p>

            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2' to="/list">
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>List items</p>

            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2' to="/orders">
            <img className='w-5 h-5' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>

            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar