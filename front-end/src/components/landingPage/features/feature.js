import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "animate.css";

export default function Feature(props) {
  return (
    <Card sx={{ maxWidth: 300, minHeight:400 }} className="animate__animated animate__flipInX">
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.image}
          alt="feature"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.heading}
          </Typography>
          <Typography variant="body2" color="black">
            {props.children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
