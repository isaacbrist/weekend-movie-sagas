import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import './MovieList.css'
import Grid from '@material-ui/core/Grid';
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
                        <Grid item key={movie.id} xs={2}>
                           <MovieListItem movie={movie}
                            />
                        </Grid>
                    )
                )}
                </Grid>

            </section>
        </main>

    );
}

export default MovieList;