import React, { lazy, Suspense } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const CheckBoxOutlineBlank = lazy(() => import(/* webpackChunkName: 'iconCheckBoxOutlineBlank' */ "@material-ui/icons/CheckBoxOutlineBlank"));
const CheckBoxIcon = lazy(() => import(/* webpackChunkName: 'iconCheckBox' */ "@material-ui/icons/CheckBox"));

const useStyles = makeStyles((theme) => ({
  
  tickSize: {
      transform: "scale(1.5)",
  },
}));
export default function CheckboxInArray({name,isChecked,onChange,label,item}) {
    const classes = useStyles();
  return (
    <FormGroup row>
     <FormControlLabel 
        control={
          <Suspense fallback="Loading..."><Checkbox
            icon={<CheckBoxOutlineBlank  />}
            checkedIcon={<CheckBoxIcon />}
            name={name}
            onChange={(e) => onChange(e,item)}
            checked={isChecked}
            style={{paddingBottom:0,paddingTop:0}}
            className={classes.tickSize}
            color="primary"
          /></Suspense>
        }
        label={<Typography style={{fontSize: '8pt',fontWeight:'500'}}>{label}</Typography>}
      />
        </FormGroup>
  );
}
