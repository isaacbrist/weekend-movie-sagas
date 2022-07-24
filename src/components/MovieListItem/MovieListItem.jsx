import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@mui/material/IconButton';
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Typography from '@mui/material/Typography';
import Paper from '@material-ui/core/Paper';


function MovieListItem({movie}){
    const history = useHistory()
    const dispatch = useDispatch();
//     <Paper >
                                
//     <Card key={movie.id} >
//         <CardActionArea>
//         <Typography gutterBottom variant="h5" component="h3">{movie.title}</Typography>
//         <img src={movie.poster} alt={movie.title}/>
//         </CardActionArea>
//     </Card>
// </Paper>
const handleClick=(id)=>{
    console.log('You clicked this movie!', id)
    dispatch({type: 'FETCH_DETAILS', payload: id})
    history.push('/details')
}
    return(
        <div>
            <Paper
             direction="row"
             justifycontent="center"
             alignitems="center"
             onClick={() => handleClick(movie.id)}>
                    {/* <CardHeader
                    action={
                        <IconButton>
                            <DeleteOutlined/>
                        </IconButton>
                    }/> */}
                    <Card>
                    <CardActionArea>
                    <Typography 
                    gutterBottom variant="h5" 
                    component="h3">{movie.title}</Typography>
                    <CardContent>
                    <CardMedia
                      component="img"
                      image={movie.poster} 
                      alt={movie.title}
                    />
                    </CardContent>
                    </CardActionArea>
                    </Card>
            </Paper>
        </div>
    )
}

export default MovieListItem    