import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid, Button, AppBar, Toolbar, Container } from '@mui/material';
import MovieSelection from '../Review/MovieSelection';
import ReviewTitle from '../Review/ReviewTitle';
import ReviewBody from '../Review/ReviewBody';
import ReviewRating from '../Review/ReviewRating';

const Review = () => {

  //states declarations
  const [movies, setMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [submitError, setSubmitError] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedSubmission, setCompletedSubmission] = useState({});
  const [userID, setUserID] = useState(1);

  //constants and functions declarations
  const ratings = [1, 2, 3, 4, 5];

  React.useEffect(() => {
    callApiLoadMovies().then(res => {
      console.log("callApiLoadMovies returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiLoadMovies parsed: ", parsed);
      setMovies(parsed);
    })
  }, [])

  const callApiLoadMovies = async () => {
    const url = "/api/getMovies";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log("User settings: ", body);
    return body;
  }

  const callApiAddReview = async () => {
    const url = "/api/addReview";

    const movieID = movies.find(movie => movie.name == selectedMovie).id
    const review = {
      userID: userID,
      movieID: movieID,
      reviewTitle: enteredTitle,
      reviewScore: selectedRating,
      reviewContent: enteredReview
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  //event handlers
  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  }

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  }

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
  }

  const handleReviewRatingChange = (event) => {
    setSelectedRating(event.target.value);
  }

  const handleSubmitErrors = (event) => {
    event.preventDefault();
    setSubmitError({});
    setIsSubmitted(true);
    const tempErrors = {};

    if (!selectedMovie) {
      tempErrors.movieError = true;
    }
    if (!enteredTitle) {
      tempErrors.titleError = true;
    }
    if (!enteredReview) {
      tempErrors.reviewError = true;
    }
    if (!selectedRating) {
      tempErrors.ratingError = true;
    }

    setSubmitError(tempErrors);

    const submission = {
      selectedMovie,
      enteredTitle,
      enteredReview,
      selectedRating
    }

    setCompletedSubmission(submission);

    //error check; update state if no errors
    if (Object.keys(tempErrors).length == 0) {
      callApiAddReview()
      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');

    }

  }

  const pages = ['Home', 'Search', 'Review', 'MyPage'];

  return (
    <>
      <AppBar position="static" sx={{height: '100px'}}>
              <Container maxWidth="xl">
                  <Toolbar sx={{ padding: '40px'}}>
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
                  >
                      {page}
                  </Typography>
                  ))}
                  </Toolbar>
              </Container>
          </AppBar>


      {/* TITLE OF THE PAGE */}
      <Typography variant='h3' align='center'>
        Review a Movie
      </Typography>

      {/* MOVIE SELECTION */}
      <Grid>
        <MovieSelection movies={movies} selectedMovie={selectedMovie} handleMovieChange={handleMovieChange} />
        {isSubmitted && submitError.movieError && (
          <Typography variant="body2" color={"error"}>
            Select your movie
          </Typography>
        )}

        {/* REVIEW TITLE */}
        <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} />

        {isSubmitted && submitError.titleError && (
          <Typography variant="body2" color={"error"}>
            {submitError.titleError}
            Enter your review title
          </Typography>
        )}

        {/* REVIEW BODY */}
        <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} />

        {isSubmitted && submitError.reviewError && (
          <Typography variant="body2" color={"error"}>
            {submitError.reviewError}
            Enter your review
          </Typography>
        )}
        <div>

        </div>
        {/* REVEIW RATING */}
        <ReviewRating ratings={ratings} selectedRating={selectedRating} handleReviewRatingChange={handleReviewRatingChange} />
        {isSubmitted && submitError.ratingError && (
          <Typography variant="body2" color={"error"}>
            {submitError.ratingError}
            Select the rating
          </Typography>
        )}
      </Grid>

      {/* BUTTON */}
      <Button variant="contained" align='center' onClick={handleSubmitErrors}>
        Submit
      </Button>

      {isSubmitted && !Object.keys(submitError).length > 0 && (
        <Grid item xs={8}>
          <Typography variant='body1'>
            Your review has been received!
          </Typography>
          <Typography variant='body1'>
            Movie: {completedSubmission.selectedMovie}
          </Typography>
          <Typography variant='body1'>
            Title: {completedSubmission.enteredTitle}
          </Typography>
          <Typography variant='body1'>
            Review: {completedSubmission.enteredTitle}
          </Typography>
          <Typography variant='body1'>
            Rating: {completedSubmission.selectedRating}
          </Typography>
        </Grid>
      )}
    </>
  );
}

export default Review;
