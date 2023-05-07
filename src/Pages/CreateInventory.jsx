import React from 'react'
import { TextField, InputLabel, Select, MenuItem, FormControl, Button } from "@mui/material";
import './CreateInventory.css';

const CreateInventory = () => {
    return (
        <>

            <form className='createForm'>
                <h1>Create Inventory</h1>

                <input type='file' name='product_picture'/>
                <TextField id="outlined-basic" className='top' type="text" placeholder="Title" value="" name="title" required label="Title" variant="outlined" />
                <TextField id="outlined-basic" className='top' type="number" placeholder="Quantity" value="" name="quantity" required label="Quantity" variant="outlined" />
                <TextField id="outlined-basic" className='top' type="number" placeholder="Market Price" value="" name="market_price" required label="Market Price" variant="outlined" />
                <TextField id="outlined-basic" className='top' type="number" placeholder="Cost Price" value="" name="cost_price" required label="Cost Price" variant="outlined" />
                {/* <TextField id="outlined-basic" type="select" placeholder="Inventory Type" value="" name="inventory_type" required  label="Inventory Type" variant="outlined" /> */}
                <FormControl fullWidth className='top'>
                    <InputLabel id="demo-simple-select-label">Inventory Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Inventory Type"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <Button className='createBtn bottom' variant='outlined'>Create</Button>

            </form>

        </>
    )
}

export default CreateInventory;