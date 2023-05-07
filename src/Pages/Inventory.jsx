import React from 'react'
import { Sidebar } from '../Components/Sidebar/Sidebar'
import './Inventory.css'

const Inventory = () => {
    return (
        <>
            <main className='inventory_main'>
                <div>
                    <Sidebar />
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Product ID</td>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Type</td>
                            <td>Market Price</td>
                            <td>Cost Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>

                </table>

            </main>
        </>

    )
}

export default Inventory