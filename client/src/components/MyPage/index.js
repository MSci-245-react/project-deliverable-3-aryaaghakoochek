// import React from 'react';
// import Typography from "@mui/material/Typography";
// import Grid from '@mui/material/Grid';
// import AppBar from '@mui/material/AppBar';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
// import { Link } from 'react-router-dom';
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
// import './index.css';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';

// const MyPage = () => {
//   const pages = ['Home', 'Search', 'Review', 'MyPage'];
//   const videoLinks = [
//     "https://www.youtube.com/embed/RLoKtb4c4W0",
//     "https://www.youtube.com/embed/tlize92ffnY",
//     "https://www.youtube.com/embed/imm6OR605UI"
//   ];

//   const [selectedMovie, setSelectedMovie] = React.useState('');

//   const handleWatchLater = async () => {
//     if (selectedMovie) {
//       try {
//         const response = await fetch('/api/addToWatchLater', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ movieID: selectedMovie }),
//         });
//         const data = await response.json();
//         if (data.success) {
//           alert(`Added to Watch Later: ${selectedMovie}`);
//           setSelectedMovie('');
//           refreshWatchLaterList();
//         } else {
//           alert('Failed to add to Watch Later. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error adding to Watch Later:', error);
//         alert('Failed to add to Watch Later. Please try again.');
//       }
//     }
//   };

//   const [watchLaterList, setWatchLaterList] = React.useState([]);

//   const refreshWatchLaterList = async () => {
//     try {
//       const response = await fetch('/api/getWatchLaterList', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       if (data.success) {
//         setWatchLaterList(data.watchLaterList);
//       } else {
//         console.error('Failed to fetch watch later list:', data.error);
//       }
//     } catch (error) {
//       console.error('Error fetching watch later list:', error);
//     }
//   };

//   React.useEffect(() => {
//     refreshWatchLaterList();
//   }, []);

//   const [movies, setMovies] = React.useState([]);

//   const fetchMovies = async () => {
//     try {
//       const response = await fetch('/api/getMovies', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       if (data && data.express) {
//         setMovies(JSON.parse(data.express));
//       } else {
//         console.error('Failed to fetch movies:', data.error);
//       }
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     }
//   };

//   React.useEffect(() => {
//     fetchMovies();
//   }, []);

//   const renderCarouselItems = () => {
//     return videoLinks.map((link, index) => (
//       <div key={index} className="carousel-item">
//         <iframe
//           title={`video-${index}`}
//           width="100%"
//           height="360"
//           src={link}
//           frameBorder="0"
//           allowFullScreen
//         ></iframe>
//       </div>
//     ));
//   };

//   return (
//     <Grid container spacing={5}>
//       <AppBar position="static" sx={{ height: '100px' }}>
//         <Container maxWidth="xl">
//           <Toolbar sx={{ padding: '40px' }}>
//             {pages.map((page) => (
//               <Typography
//                 component={Link}
//                 to={page === 'Home' ? `/` : `/${page.toLowerCase()}`}
//                 variant="button text"
//                 sx={{
//                   flexGrow: 1,
//                   textAlign: 'center',
//                   textDecoration: 'none',
//                   fontWeight: 'bold',
//                   color: 'white'
//                 }}
//                 key={page}
//               >
//                 {page}
//               </Typography>
//             ))}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Throwback Thursday Movies
//         </Typography>
//         <AliceCarousel
//           autoPlay
//           autoPlayInterval={3000}
//           buttonsDisabled={true}
//           dotsDisabled={true}
//         >
//           {renderCarouselItems()}
//         </AliceCarousel>
//       </Grid>

//       <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Add to Watch Later
//         </Typography>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Choose a movie</InputLabel>
//           <Select
//             value={selectedMovie}
//             label="Choose a movie"
//             onChange={(e) => setSelectedMovie}
//           >
//             {movies?.map(movie => (
//               <MenuItem key={movie.id} value={movie.id}>{movie.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <button onClick={handleWatchLater}>Add to Watch Later</button>
//       </Grid>

//       <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Watch Later List
//         </Typography>
//         {watchLaterList.length > 0 ? (
//           <ul>
//             {watchLaterList.map((movie) => (
//               <li key={movie.id}>{movie.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <Typography variant="body1">No movies in the Watch Later list.</Typography>
//         )}
//       </Grid>
//     </Grid>
//   );
// };

// export default MyPage;

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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const MyPage = () => {
  const pages = ['Home', 'Search', 'Review', 'MyPage'];
  const videoLinks = [
    "https://www.youtube.com/embed/RLoKtb4c4W0",
    "https://www.youtube.com/embed/tlize92ffnY",
    "https://www.youtube.com/embed/imm6OR605UI"
  ];

  // Watch Later List Logic
  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [watchLaterList, setWatchLaterList] = React.useState([]);
  const userID = 123; // Replace with the actual userID or retrieve it from your app's state or authentication process.

  const handleWatchLater = async () => {
    if (selectedMovie) {
      try {
        const response = await fetch('/api/addToWatchLater', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ movieID: selectedMovie, userID: userID }), // Include the userID in the request body
        });
        const data = await response.json();
        if (data.success) {
          alert(`Added to Watch Later: ${selectedMovie}`);
          setSelectedMovie('');
          refreshWatchLaterList();
        } else {
          alert('Failed to add to Watch Later. Please try again.');
        }
      } catch (error) {
        console.error('Error adding to Watch Later:', error);
        alert('Failed to add to Watch Later. Please try again.');
      }
    }
  };

  const refreshWatchLaterList = async () => {
    try {
      const response = await fetch('/api/getWatchLaterList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }), // Include the userID in the request body
      });
      const data = await response.json();
      if (data.success) {
        setWatchLaterList(data.watchLaterList);
      } else {
        console.error('Failed to fetch watch later list:', data.error);
      }
    } catch (error) {
      console.error('Error fetching watch later list:', error);
    }
  };

  React.useEffect(() => {
    refreshWatchLaterList();
  }, []);

  // Fetch Movies Logic
  const [movies, setMovies] = React.useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/getMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data && data.express) {
        setMovies(JSON.parse(data.express));
      } else {
        console.error('Failed to fetch movies:', data.error);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

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

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add to Watch Later
        </Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Choose a movie</InputLabel>
          <Select
            value={selectedMovie}
            label="Choose a movie"
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            {movies?.map(movie => (
              <MenuItem key={movie.id} value={movie.id}>{movie.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <button onClick={handleWatchLater}>Add to Watch Later</button>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Watch Later List
        </Typography>
        {watchLaterList.length > 0 ? (
          <ul>
            {watchLaterList.map((movie) => (
              <li key={movie.id}>{movie.name}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body1">No movies in the Watch Later list.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default MyPage;
