import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import NoResult from '../../../../assets/images/noresulticon.png';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderColor: 'gray',
    height:50
  },
  media: {           // this is the`className` passed to `CardMedia` later
    height: props => props.height || 100,     // as an example I am modifying width and height
    width: '50%',
    align: 'center'
 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SimpleCard(props) {
  const {eventHandler,description, btnLabel,color} = props;
  const classes = useStyles(props);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} >
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
       <span><label style={{fontSize:'12pt',color:color}}>{description}</label></span>
        </Typography>
      </CardContent>
      {/*
      <CardActions disableSpacing>
        <IconButton aria-label="search again">
          <FavoriteIcon />
        </IconButton>
      </CardActions>  
      */}
      </Card>
  );
}