import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <Link to='/dashboard' className='none'><p>Home</p></Link>
                <Link to="/inventory" className='none'><p>Inventory</p></Link>
                <Link to="/users" className='none'><p>Users</p></Link>
                <Link to="/reviews" className='none'><p>Reviews</p></Link>
                <Link to="/queries" className='none'><p>Queries</p></Link>
            </div>
        </>

    )
}
