import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@material-ui/core/Typography';



 function MovieForm() {
 
    const dispatch = useDispatch();
    const history = useHistory()
    const movieGenres = useSelector(store => store.genres);
    const[title, setTitle]=useState('')
    const[poster, setPoster]=useState('')
    const[description, setDescription]=useState('')
    const[genres, setGenres]=useState([])
//useEffect
useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
}, []);
const addMovie = (event) => {
    console.log('Here is the new movie', title, poster, description, genres);
    event.preventDefault();
    dispatch({
      type: 'ADD_NEW_MOVIE',
      payload: {
      title,
      poster,
      description,
      genres}
    });
    handleSubmitButton()
  }

  const handleSubmitButton=()=>{
    console.log('Saved the movie! Going back to the list!')
    history.push('/')
    }

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const handleCancel=()=>{
        console.log('Go back to the list.')
        history.push('/')}
  return (
    
    <Box
      component="form"
      onSubmit={addMovie}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
    <Typography gutterBottom variant="h6">Add a New Movie:</Typography>
       <TextField
          required
          id="filled-required"
          label="Movie Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          variant="filled"
        /> 
    </div> 
    <div>
       <TextField
          required
          id="filled-required"
          label="Movie Poster url"
          value={poster}
          onChange={(event) => setPoster(event.target.value)}
          placeholder="url"
          variant="filled"
        /> 
    </div>   
    <TextField
          required
          id="filled-textarea"
          label="Movie Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          multiline
          variant="filled"
        /> 
        <Stack spacing={3} sx={{ width: 500 }}></Stack>    
        <Autocomplete
        multiple
        required
        id="tags-outlined"
        options={movieGenres}
        getOptionLabel={(movieGenres) => movieGenres.name}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Genres"
            value={genres}
            onChange={(event) => setGenres(event.target.value)}
            placeholder="Genres"
          />
        )}
      /> 
        <ButtonGroup 
        variant="contained"
        size="large"
         aria-label="outlined primary button group">
      <Button 
          onClick={handleCancel}>Cancel</Button>
      <Button 
          type='submit'>Save</Button>
      </ButtonGroup>
         </Box>
  );
}

export default MovieForm