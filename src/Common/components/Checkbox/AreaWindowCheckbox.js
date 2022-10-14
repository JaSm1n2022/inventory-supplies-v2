import React, { lazy, Suspense } from 'react';
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
const labelStyle = {
    width: '137px',
    height: '24px',
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: '0.15px',
    textAlign: 'left',
    color: '#000000'
  };

export default function AreaWindowCheckbox({name,isChecked,onChange,label,size,disabled,source}) {
  const classes = useStyles();
  return (
    <FormGroup style={{paddingTop:0,paddingBottom:0}}>
     <FormControlLabel 
        control={
          <Suspense fallback="Loading...">
            
            <Checkbox
            icon={<CheckBoxOutlineBlank  />}
            checkedIcon={<CheckBoxIcon />}
            name={name}
            onChange={(e) => onChange(e,source)}
            checked={isChecked ? true : false}
          
            className={classes.tickSize}
            disabled={disabled||false}
            color="primary"
          /></Suspense>
        }
        label={<span style={labelStyle}>{label}</span>}
      />
        </FormGroup>
  );
}
