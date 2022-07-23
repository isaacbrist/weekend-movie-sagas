import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import './MovieList.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';

function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleClick=(id)=>{
        console.log('You clicked this movie!', id)
        dispatch({type: 'FETCH_DETAILS', payload: id})
        history.push('/details')
    }
    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                <Grid container spacing={5}>
                {movies.map(movie => {
                    return (
                        <Grid item sm={3}>
                            <Paper >
                                
                                <Card key={movie.id} onClick={() => handleClick(movie.id)}>
                                    <CardActionArea>
                                    <Typography gutterBottom variant="h5" component="h3">{movie.title}</Typography>
                                    <img src={movie.poster} alt={movie.title}/>
                                    </CardActionArea>
                                </Card>
                            </Paper>
                        </Grid>
                    );
                })}
                </Grid>

            </section>
        </main>

    );
}

export default MovieList;