import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: props => props.width || 100
  },
}));

export default function RegularSkeleton(props) {
  const {width} = props;
  const classes = useStyles();
  return (
    <div style={{width: width || 100}} align="center">
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );
}