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

function Details() {
console.log('In Details')
    const dispatch = useDispatch();
    const details = useSelector(store => store.details);
    const genres=details.genres
    const history = useHistory();
    const handleClick=(id)=>{
        
        console.log('Go back to the list.')
history.push('/')
    }
    return (
        <main>
            <h1>Details</h1>
            <section className="detail">
                <div
                direction="row"
                justifyContent="center"
                alignItems="center"
                container spacing={4}
                item sm={3}>
                    <Paper>
                        <Card >
                            <Typography gutterBottom variant="h5" component="h3">{details.title}</Typography>
                            <img src={details.poster} alt={details.title}/>
                            <Typography gutterBottom variant="h6" component="h6">{details.description} </Typography>
                            <Typography gutterBottom variant="h6" component="h6">Genres:</Typography>
                                {genres?.map(name => {
                                    return (
                                        <Typography variant="body1" gutterBottom component="div" key={name}>{name}</Typography>
                                            )
                                        })}    
                            <Button size="large" variant="contained" onClick={handleClick}>Return to List</Button>
                        </Card>
                    </Paper>              
                </div>
            </section>
        </main>

    );
}

export default Details;