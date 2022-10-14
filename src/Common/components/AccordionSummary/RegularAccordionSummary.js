import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(24),
    color: theme.palette.text.secondary,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: 'black',
    backgroundColor: 'white',
    border: '1px solid black'

  },
  delete: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: 'white',
    backgroundColor: 'red',
  },
}));

export default function RegularAccordionSummary(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(props.item ? false : true);
  
  useEffect(() => {
    console.log('[accordion props]',props);
		setIsDeleted(false);
	}, [props.item]);
  const deleteHandler = (e) => {
    //setIsDeleted(true);
    setIsDeleted(true);  
    console.log('[rops.stoIffId]',props.stopOffId);
    if (props.stopOffId) {
      props.onDeleteHandler(props.stopOffId);
    }
  }
  const stopOffAccordionHandler = () => {
   console.log('is Deleted]',isDeleted);
    if(!isDeleted) {
      setTimeout(() => {
        props.setStopOffAccordionDefaultHandler(props.item)
      }, 250);
        
    }

  }
  return (
    <React.Fragment>
      {props.isDelete ?
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fontSize: 28 }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          onClick={() => stopOffAccordionHandler()}>
          <Avatar className={classes.delete} onClick={(e) => deleteHandler(e)}>{props.counter}</Avatar>
          <Typography className={classes.heading}>&nbsp;{props.title}</Typography>
          <Typography className={classes.secondaryHeading}>{props.value}</Typography>
        </AccordionSummary>
        :
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fontSize: 28 }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          onClick={() => props.setAccordionDefaultHandler(props.mode)}>

          <Avatar className={classes.small} >{props.counter}</Avatar>

          <Typography className={classes.heading}>&nbsp;{props.title}</Typography>

          <Typography className={classes.secondaryHeading}>{props.value}</Typography>
        </AccordionSummary>
      }
    </React.Fragment>

  );
}
