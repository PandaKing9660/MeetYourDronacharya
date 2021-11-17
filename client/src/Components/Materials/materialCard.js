import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import Button from '@mui/material/Button';
import dompurify from 'dompurify';
import {Grid} from '@mui/material';
import {textAlign} from '@mui/system';
import {Link} from 'react-router-dom';

const MaterialCard = ({material}) => {
  const sanitizer = dompurify.sanitize;

  // For showing cards displaying studying material
  return (
    <Card
      sx={{
        display: 'flex',
        marginTop: '2%',
        padding: '1.5%',
        background: '#EAE6F8',
      }}
    >
      <Grid container>
        <Grid item sm={4} md={3}>
          <Link to={`/dashboard/${material.by}`}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{bgcolor: red[500]}}
                  aria-label="recipe"
                  alt={`${material.userName}`}
                  src={`${material.userImage}`}
                />
              }
              title={material.userName}
              subheader={material.date.split ('T')[0]}
            />
          </Link>
          <div style={{display: 'inline-block'}}>
            <Button
              variant="outlined"
              href={material.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{margin: '2% 5%'}}
            >
              View Material
            </Button>
            <Button variant="outlined" style={{margin: '2% 5%'}}>
              Chat
            </Button>
          </div>
        </Grid>
        <Grid item sm={8} md={9}>
          <CardContent>
            <Typography variant="h4" color="text.primary">
              {material.topic}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizer (material.description),
                }}
                style={{padding: '1%', textAlign: 'justify'}}
              />
            </Typography>
            <Typography variant="h7" color="text.primary">
              {material.location}
            </Typography>
          </CardContent>
          <div style={{padding: '0.5%'}}>
            {material.tags.map (tag => (
              <Typography display="inline" color="primary">#{tag} </Typography>
            ))}
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MaterialCard;
