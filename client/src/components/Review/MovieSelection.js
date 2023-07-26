import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

const MovieSelection = ({ movies, selectedMovie, handleMovieChange }) => {
  return (
    <>
      <Typography variant="subtitle1">
        Select Movie
      </Typography>

      <Box sx={{ maxWidth: 250 }}>
        <FormControl fullWidth>
          <InputLabel id="movie-select">Select your movie</InputLabel>
          <Select
            value={selectedMovie}
            label="Movies"
            placeholder="Select a Movie"
            onChange={handleMovieChange}
          >
            {movies?.map((movie) => (
              <MenuItem key={movie.id} value={movie.name}>
                {movie.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default MovieSelection;
