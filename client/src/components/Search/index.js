import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Search = () => {
  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  const [movieTitle, setMovieTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');

  const handleSearch = () => {
    const searchData = {
      movieTitle: movieTitle,
      actorName: actorName,
      directorName: directorName,
    };

    // Make the API request to the Node.js server
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
        <TextField
          label="Movie Title"
          variant="outlined"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
        <TextField
          label="Actor's Name"
          variant="outlined"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
        <TextField
          label="Director's Name"
          variant="outlined"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
