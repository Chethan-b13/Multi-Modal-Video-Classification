import React, { createContext } from "react";
import ReactPlayer from "react-player";
import { Box, Button, Stack, Typography } from "@mui/material";
import classes from "./Header.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink , Link} from "react-router-dom";
import { useState } from "react";
import welcome_video from "../assets/welcome-video_p3wXtgtf.mp4";
import axios from 'axios'
import Root from "./Root";


export const vidContext = createContext(null);

const Home = () => {
  const [enteredUrl, setEntredUrl] = useState(welcome_video);
  const [filename, setfilename] = useState(null);
  const [predictionClass, setpredictionClass] = useState('Upload Video to predict!')
  const [loading, setloading] = useState(false);

  const predict = async (e) => {
    setloading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/predict/${filename}`)
      setpredictionClass(response.data);
    } catch (error) {
      setpredictionClass("Error! Try Again..");
      throw error;
    }finally{
      setloading(false);
    }
  }

  const uploadButtonHandler = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setfilename(file.name)
    setEntredUrl(url);
  };

  

  return (
    <>  
        <Root />
        <Box display="flex" flexDirection="row">
          <Box
            sx={{
              backgroundColor: "#1f1d1d",
              height: "91vh",
              width: "75vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <ReactPlayer
              url={enteredUrl}
              width="60vw"
              height="60vh"
              controls
            ></ReactPlayer>
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
                onClick={predict}
                >Predict
              </Button>
              <Button variant="contained"
                component="label"><Link to={'/compress'} style={{color:'white'}} >Compress a Video</Link></Button>
            </div>
          </Box>
          <Stack
            direction="column"
            bgcolor="#1f1d1d"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "25vw",
              height: "91vh",
            }}
          >
            <Typography variant="h5" color="#fff">
              Classified <span className={classes.span}>C</span>lass :
            </Typography>
            <Typography variant="h5" color=" rgb(250, 35, 35)">
              {predictionClass}
            </Typography>
            <Box
              sx={{
                mt: "25px",
              }}
            >
              <vidContext.Provider value={predictionClass}>
                <NavLink to={`recommed/${predictionClass}`}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                  >
                    Get Recomendations
                  </Button>
                </NavLink>
              </vidContext.Provider>
            </Box>
          </Stack>

          {loading &&
            <div className="loaderContainer">
                <div className="loader"></div>
                <div className="loader inner"></div>
            </div>
          }

        </Box>
    </>
  );
};

export default Home;
