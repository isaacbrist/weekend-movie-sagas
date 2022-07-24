import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import './MovieList.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@mui/material/CardContent';
import MovieListItem from '../MovieListItem/MovieListItem';

function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

 
    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                <Grid container spacing={5}>
                {movies.map(movie => (
                        <Grid item key={movie.id} sm={3}>
                           <MovieListItem movie={movie}/>
                        </Grid>
                    )
                )}
                </Grid>

            </section>
        </main>

    );
}

export default MovieList;