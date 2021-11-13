import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import dompurify from "dompurify";

const MaterialCard = ({ material }) => {
  const sanitizer = dompurify.sanitize;

  
  // For showing cards displaying studying material
  return (
    <Card
      sx={{ display: "flex", marginTop: 5, padding: 5, background: "#EAE6F8" }}
    >
      <div style={{ width: "30%" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              alt={`${material.userName}`}
              src={`${material.userImage}`}
            />
          }
          title={material.userName}
          subheader={material.date.split("T")[0]}
        />
        <div style={{display: "inline-block"}}>
          <Button variant="outlined" href={material.link} target="_blank" rel="noopener noreferrer" style={{margin: "2% 10%"}}>
            View Material
          </Button>
          <Button variant="outlined" style={{margin: "2% 10%"}}>
            Chat
          </Button>
        </div>
      </div>
      <div>
        <CardContent>
          <Typography variant="h4" color="text.primary">
            {material.topic}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizer(material.description),
              }}
              style={{ padding: "1%" }}
            />
          </Typography>
          <Typography variant="h7" color="text.primary">
            {material.location}
          </Typography>
        </CardContent>

        {material.tags.map((tag) => (
          <Typography color="primary">#{tag}</Typography>
        ))}
      </div>
    </Card>
  );
};

export default MaterialCard;
