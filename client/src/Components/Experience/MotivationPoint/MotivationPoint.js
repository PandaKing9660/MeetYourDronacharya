import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Chip,
} from "@mui/material";
import ImagePoint from "./ImagePoint";

// async function for motivation quote
async function findQuote() {
  const response = await fetch(
    `https://quotes15.p.rapidapi.com/quotes/random/`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "afa990c4c7mshad324471ac88136p125e52jsne67d08a6be98",
      },
    }
  );
  const body = await response.json();
  return body;
}

const MotivationPoint = () => {
  // Set initial value to be displayed on landing
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    findQuote().then(setQuotes);
  }, []);

  return (
    <div>
      {!quotes ? null : quotes.length === 0 ? (
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" minWidth={200} height={118} />
          <Skeleton variant="image" />
          <Skeleton variant="rectangular" minWidth={200} height={118} />
        </Stack>
      ) : (
        <Stack spacing={1}>
          <QuoteItem quotes={quotes} />
          <ImagePoint query={quotes.tags[0]} />
        </Stack>
      )}
    </div>
  );
};

function QuoteItem({ quotes }) {
  const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, "$& ").trim();
  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, { dateStyle: "long" });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          Daily Motivation
        </Typography>

        <Typography variant="body2">{quotes.content}</Typography>
        <Typography variant="body2" align="right">
          <br />~ {quotes.originator.name}
        </Typography>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          mt={1}
        >
          {quotes.tags
            .filter((tag, index) => index < 3)
            .map((tag, index) => {
              return (
                <Chip
                  label={tag.toLowerCase()}
                  size="small"
                  color="secondary"
                  variant="outlined"
                  key={index}
                />
              );
            })}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default MotivationPoint;
