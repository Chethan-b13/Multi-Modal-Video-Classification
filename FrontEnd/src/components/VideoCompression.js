import React, { useState } from 'react'
import { Button } from "@mui/material";
import Root from './Root'
import axios from 'axios'

const VideoCompression = () => {

    const [filename, setfilename] = useState(null);  
    const [loading, setloading] = useState(false);
    const [Header, setHeader] = useState("Upload a video to compress")

    const uploadButtonHandler = (event) => {
        const file = event.target.files[0];
        setfilename(file.name);
      };

    const compress = async (e) => {
        setloading(true);
        try {
            console.log(filename);
            const response = await axios.get(`http://127.0.0.1:8000/compress/${filename}`)
            if(response.status===200){
                window.location = '/'
            }else{
                setHeader("Error! Try Again..");
            }
        } catch (error) {
          setHeader("Error! Try Again..");
          throw error;
        }finally{
          setloading(false);
        }
      }
  return (
    <div className='Container'>
        <Root />
        <div className="card">
            <h1>{Header}</h1>
            <p>{filename && filename }</p>
            <div className="buttons">
                <Button
                    variant="contained"
                    component="label"
                    xs={{}}
                    onChange={uploadButtonHandler}
                >
                    Upload
                    <input hidden accept="video/*" multiple type="file" />
                </Button>
                <Button variant="contained"
                component="label"
                xs={{}}
                onClick={compress}
                >Compress
              </Button>
            </div>
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

export default VideoCompression