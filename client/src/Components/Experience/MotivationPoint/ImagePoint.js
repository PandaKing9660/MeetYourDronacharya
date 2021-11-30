import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
} from "@mui/material";

// asynchronous function for getting image according to the quote's tag
async function searchImage(q) {
  q = encodeURIComponent(q);
  // make a call to Bing Image Api
  const response = await fetch(
    `https://bing-image-search1.p.rapidapi.com/images/search?safeSearch=Strict&count=1&q=${q}`,
    {
      method: "GET",
      // required headers with api keys
      headers: {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": "afa990c4c7mshad324471ac88136p125e52jsne67d08a6be98",
      },
    }
  );
  const body = await response.json();
  return body.value[0].contentUrl;
}

const ImagePoint = ({ query }) => {
  // Set initial value to be displayed on landing
  const [imageKey, setImageKey] = useState("");

  useEffect(() => {
    searchImage(query).then(setImageKey);
  }, []);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        {/* Daily changing image */}
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            Incitement
          </Typography>

          {/* Show loading till image is loading after searching the requested tag. */}
          {imageKey === "" ? (
            <Stack spacing={1}>
              <Skeleton variant="image" />
              <Skeleton variant="rectangular" minWidth={200} height={118} />
            </Stack>
          ) : (
            <CardMedia
              component="img"
              height="100%"
              image={imageKey}
              alt="Nice Image"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagePoint;
