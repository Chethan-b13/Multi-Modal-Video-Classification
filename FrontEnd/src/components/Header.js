import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Paper } from "@mui/material";
import DuoIcon from "@mui/icons-material/Duo";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: "#111",
        position: "sticky",
        top: "0",
        height: "86px",
      }}
    >
      <AppBar
        sx={{
          backgroundColor: "#111",
        }}
      >
        <Link to="/">
          <Toolbar>
            <IconButton
              size="large"
              sx={{
                color: "rgb(250, 35, 35)",
              }}
            >
              <DuoIcon fontSize="inherit"></DuoIcon>
            </IconButton>

            <Typography variant="h5" color="#fff">
              Video <span className={classes.span}>C</span>lassifier
            </Typography>
              <button className="navButton"><Link to={'/createdataset'} style={{color:'white'}} >Create Dataset</Link></button>
              <button className="navButton"><Link to={'/compress'} style={{color:'white'}} >Compress a Video</Link></button>
          </Toolbar>
        </Link>
      </AppBar>
    </Paper>
  );
};

export default Header;
