import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';


export default function RecipeReviewCard() {
  const [isHeartLiked, setIsHeartLiked] = useState(false);
  const handleHeartClick = () => {
        setIsHeartLiked(!isHeartLiked);
    };
  return (
    <Card sx={{ display:'flex',marginTop:5,padding:3,background:'#EAE6F8' }}>
        <div style={{width:'30%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
       <Button variant="outlined" href="#outlined-buttons">
        View Material
      </Button>
      </div>
      <div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{marginLeft:4}}>
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
      </CardActions>
      </div>
    </Card>
  );
}