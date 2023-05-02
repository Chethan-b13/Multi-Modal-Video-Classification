import React, { useState } from 'react'
import Root from './Root'
import { Button } from '@mui/material'
import axios from 'axios';

const Dataset = () => {
    const [vidClass, setvidClass] = useState("Shooting");
    const [vidNum, setvidNum] = useState(1);
    const [loading, setloading] = useState(false);
    const [Header, setHeader] = useState("Create Dataset")

    const createDataset = async ()=>{
        setloading(true);
        const data = {
            'class':vidClass,
            'numberofvideos':vidNum
        }
        try {
            const res = await axios.post('http://127.0.0.1:8000/scrape',data);
            if(res.status===200){
                window.location = '/'
            }else{
                setHeader("Error! Try Again..");
            }
        } catch (error) {
            setHeader("Error! Try Again..");
            throw error
        }finally{
            setloading(false);
        }
    }

    return (
        <div className='Container'>
            <Root />
            <div className="card">
                <h1>{Header}</h1>
                <input onChange={(e)=>{setvidClass(e.target.value)}} className='inputArea' type="text" placeholder='Video Class'/>
                <input onChange={(e)=>{setvidNum(e.target.value)}} className='inputArea' type='number' placeholder='Number of Videos' min={1} />
                <Button variant="contained"
                    component="label" onClick={createDataset}>
                        Create
                </Button>
            </div>
            {loading &&
            <div className="loaderContainer">
                <div className="loader"></div>
                <div className="loader inner"></div>
            </div>
            }
        </div>
    )
}

export default Dataset