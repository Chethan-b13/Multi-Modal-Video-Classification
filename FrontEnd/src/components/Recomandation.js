import { Stack, Box } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";
import React, { useContext } from "react";
import ReactPlayer from "react-player";
import VideoCard from "./VideoCard";
import { vidContext } from "./Home";
// import { useState } from "react";
const Recomandation = () => {
  const data = useLoaderData();
  const videos = data.items;
  console.log(videos);

  const { videoId } = useParams();
  console.log(videoId);

  // const [videoId1, setVideoId1] = useState(videos[0].id.videoId);
  const videoId1 = videos[0].id.videoId;
  

  return (
    <Box
      minHeight="95vh"
      sx={{
        backgroundColor: "#111",
      }}
    >
      <Stack direction="row">
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                videoId === "someid" ? videoId1 : videoId
              }`}
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
                <VideoCard videos={video}></VideoCard>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Recomandation;

export const loader = async (props) => {
  // const videoclass = useContext(vidContext);
  // console.log("Loader Fucntion: " + videoclass);
  const searchTerm = `shorts example of ${props.videoId}`;

  const options = {
    headers: {
      "X-RapidAPI-Key": "83c507a6c5mshff8ae5f4dfa54ddp18a8dejsn22e07c04efc1",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
  const response = fetch(
    `https://youtube-v31.p.rapidapi.com/search?q=${searchTerm}&part=snippet&maxResults=50`,
    options
  );
  return response;
};
