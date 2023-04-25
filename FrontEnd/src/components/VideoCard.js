import React from "react";
import { Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
const VideoCard = ({
  videos: {
    snippet: {
      thumbnails: {
        high: { url: thumbnaliImage },
      },
    },
  },
  setvideoLink,
  videos: {
    id: { videoId },
  },
}) => {
  const setYtVideo = (id)=>{
    setvideoLink(id);
  }

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      {/* <Link
        to={videoId ? `/recomandations/${videoId}` : `/recomandations/someid`}
      >
        <CardMedia
          image={thumbnaliImage}
          alt="thumbnail image"
          sx={{
            height: 180,
            width: { xs: "100%", sm: "358px" },
          }}
        ></CardMedia>
      </Link> */}

        <a
            onClick={()=>{setYtVideo(videoId)}}
          >
        <CardMedia
          image={thumbnaliImage}
          alt="thumbnail image"
          sx={{
            height: 180,
            width: { xs: "100%", sm: "358px" },
          }}
        ></CardMedia>
      </a>

      <CardContent
        sx={{ backgroundColor: "#1e1e1e", height: "10px" }}
      ></CardContent>
    </Card>
  );
};

export default VideoCard;
