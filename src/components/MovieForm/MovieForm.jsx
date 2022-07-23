import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';



 function MovieForm() {
 
    // const dispatch = useDispatch();
    const history = useHistory()
    const genres = useSelector(store => store.genres);
    const name =genres.name
    const [value, setValue] = React.useState('Controlled');

//useEffect
 

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const handleCancel=()=>{
        console.log('Go back to the list.')
        history.push('/')}
  return (
    
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
       <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        /> 
    </div> 
    <div>
       <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        /> 
    </div>   
    <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
        /> 
        <Stack spacing={3} sx={{ width: 500 }}></Stack>    
        <Autocomplete
        multiple
        id="tags-outlined"
        options={genres}
        getOptionLabel={(option) => option}
        defaultValue={[genres[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Genres"
            placeholder="Genres"
          />
        )}
      /> 
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button>Cancel</Button>
      <Button>Save</Button>
      </ButtonGroup>
         </Box>
  );
}

export default MovieForm