import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './index.css';

const MyPage = () => {
  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  // Sample links to YouTube videos
  const videoLinks = [
    "https://www.youtube.com/embed/RLoKtb4c4W0",
    "https://www.youtube.com/embed/tlize92ffnY",
    "https://www.youtube.com/embed/imm6OR605UI"
  ];
  
  const renderCarouselItems = () => {
    return videoLinks.map((link, index) => (
      <div key={index} className="carousel-item">
        <iframe
          title={`video-${index}`}
          width="100%"
          height="360"
          src={link}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    ));
  };

  return (
    <Grid container spacing={5}>
      <AppBar position="static" sx={{ height: '100px' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ padding: '40px' }}>
            {pages.map((page) => (
              <Typography
                component={Link}
                to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                variant="button text"
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: 'white'
                }}
                key={page}
              >
                {page}
              </Typography>
            ))}
          </Toolbar>
        </Container>
      </AppBar>

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Throwback Thursday Movies
        </Typography>
        <AliceCarousel
          autoPlay
          autoPlayInterval={3000}
          buttonsDisabled={true}
          dotsDisabled={true}
        >
          {renderCarouselItems()}
        </AliceCarousel>
      </Grid>
    </Grid>
  );
};

export default MyPage;
