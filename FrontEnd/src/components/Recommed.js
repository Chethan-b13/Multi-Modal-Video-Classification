import { Stack, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useContext, useEffect,useState } from "react";
import ReactPlayer from "react-player";
import VideoCard from "./VideoCard";
import { vidContext } from "./Home";
import axios from "axios";
import Root from "./Root";
// import { useState } from "react";
const Recommed = () => {
  const [videos, setvideos] = useState(null);
  console.log(videos);

  const { videoId } = useParams();
  console.log(videoId);

  // const [videoId1, setVideoId1] = useState(videos[0].id.videoId);
  // const videoId1 = videos[0]?.id.videoId;
  const videoclass = useContext(vidContext);

  const [videoLink, setvideoLink] = useState('');

  const getYoutubeVideos =  async ()=>{
    console.log("Effect Fucntion: " + videoId);
    const searchTerm = `shorts example of ${videoId}`;

    const options = {
      headers: {
        "X-RapidAPI-Key": "83c507a6c5mshff8ae5f4dfa54ddp18a8dejsn22e07c04efc1",
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };
    const response = await axios.get(`https://youtube-v31.p.rapidapi.com/search?q=${searchTerm}&part=snippet&maxResults=50`,options)
    setvideos(response.data.items);
    setvideoLink(response.data.items[0].id.videoId);
  }
  
  useEffect( () => {
    getYoutubeVideos()
  }, [videoclass])
  

  return (
    <>
    <Root />
    <Box
      minHeight="95vh"
      sx={{
        backgroundColor: "#111",
      }}
    >
      {videos ?
      
      <Stack direction="row">
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoLink}`}
              controls
              height="70vh"
              width="100%"
              playing
            />
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {videos.map((video, index) => {
            return (
              <Box key={index}>
                <VideoCard videos={video} setvideoLink={setvideoLink}></VideoCard>
              </Box>
            );
          })}
        </Box>
      </Stack>
      :
        <div className="loaderContainer">
            <div className="loader"></div>
            <div className="loader inner"></div>
        </div>
      }
    </Box>
    </>
  );
};

export default Recommed;

// export const loader = async () => {
//   const videoclass = useContext(vidContext);
//   console.log("Loader Fucntion: " + videoclass);
//   const searchTerm = `shorts example of ${videoclass}`;

//   const options = {
//     headers: {
//       "X-RapidAPI-Key": "83c507a6c5mshff8ae5f4dfa54ddp18a8dejsn22e07c04efc1",
//       "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
//     },
//   };
//   const response = fetch(
//     `https://youtube-v31.p.rapidapi.com/search?q=${searchTerm}&part=snippet&maxResults=50`,
//     options
//   );
//   return response;
// };
