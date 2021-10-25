import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import dompurify from 'dompurify';


const MaterialCard = ({material}) => {
  const sanitizer = dompurify.sanitize;
  // const [isHeartLiked, setIsHeartLiked] = useState(false);
  // const handleHeartClick = () => {
  //       setIsHeartLiked(!isHeartLiked);
  //   };

  const user = JSON.parse (localStorage.getItem ('profile'));
  

  return (
    <Card sx={{ display:'flex',marginTop:5,padding:5,background:'#EAE6F8' }}>
        <div style={{width:'30%'}}>
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
        subheader={material.date.split ('T')[0]}
      />
       <Button variant="outlined" href="#material-download-option">
        View Material
      </Button>
      </div>
      <div>
      <CardContent>
        <Typography variant="h4" color="text.primary">
          {material.topic}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <div
                dangerouslySetInnerHTML={{
                  __html: sanitizer (material.description),
                }}
                style={{padding: '1%'}}
              />
        </Typography>
      </CardContent>

{
  material.tags.map((tag) => <Typography color="primary">#{tag}</Typography>)
}

      {/* <CardActions disableSpacing sx={{marginLeft:4}}>
        <IconButton aria-label="add to favorites"
          onClick={handleHeartClick}
                >
                    {isHeartLiked ? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteIcon style={{ color: 'red' }} />
                    )}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
      </div>
    </Card>
  );
}

export default MaterialCard;