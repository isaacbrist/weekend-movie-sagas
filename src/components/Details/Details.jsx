import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';
import { flexbox } from '@mui/system';

function Details() {
console.log('In Details')
    const dispatch = useDispatch();
    const details = useSelector(store => store.details);
    const genres=details.genres
    const history = useHistory();
    const handleClick=()=>{
        
        console.log('Go back to the list.')
history.push('/')
    }
    return (
        <main>
            <h1>Details</h1>
            <section className="detail">
                <Box
                sx={{
                backgroundColor: 'primary.main',
                
                '& > :not(style)': 
                {
                m: "1",
                display: "inline",
                alignContent: "center",
                justifyContent: "center",
                },
                   }}
                    >
                    <Card >
                        <Paper >
                            <Typography gutterBottom variant="h5" component="h3">{details.title}</Typography>
                            <img src={details.poster} alt={details.title}/>
                            <Typography gutterBottom variant="body2" component="body2">{details.description} </Typography>
                            <Typography gutterBottom component="div">Genres:</Typography>
                                {genres?.map(name => {
                                    return (
                                        <Typography variant="body1" gutterBottom component="div" key={name}>{name}</Typography>
                                            )
                                        })}    
                            <Button size="large" variant="contained" onClick={handleClick}>Return to List</Button>
                        </Paper>
                    </Card>              
                </Box>
            </section>
        </main>

    );
}

export default Details;