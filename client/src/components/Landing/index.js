import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';

const Landing = () => {
    const pages = ['Home', 'Search', 'Review', 'MyPage'];
    const moviePosters = [
        'https://m.media-amazon.com/images/I/51PBCEAEYML.__AC_SX300_SY300_QL70_ML2_.jpg',
        'https://m.media-amazon.com/images/I/51Y6faez1TL._AC_.jpg',
    ];

    return (
        <Grid container spacing={5}>
            <AppBar position="static" sx={{ height: '100px' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: '40px' }}>
                        {pages.map((page) => (
                            <Typography
                                key={page}
                                component={Link}
                                to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
                                variant="button"
                                sx={{
                                    flexGrow: 1,
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    '&:hover': {
                                        color: '#FF8C00', // Change color on hover (optional)
                                    }
                                }}
                            >
                                {page}
                            </Typography>
                        ))}
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Add your home page content below */}
            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Movie Reviews!
                </Typography>
                <Typography variant="body1">
                    This is a movie review website where you can find, review, and save your favorite movies.
                </Typography>
            </Grid>

            {/* Movie posters */}
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '30px' }}>
                {moviePosters.map((poster, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <img src={poster} alt={`Movie Poster ${index + 1}`} style={{ width: '100%', borderRadius: '8px' }} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Landing;
