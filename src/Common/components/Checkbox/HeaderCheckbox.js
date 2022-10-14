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
export default function HeaderCheckbox({name,isChecked,onChange,label,size,disabled,source}) {
  const classes = useStyles();
  return (
    <FormGroup row>
     <FormControlLabel 
        control={
          <Suspense fallback="Loading...">
            
            <Checkbox
            icon={<CheckBoxOutlineBlank  />}
            checkedIcon={<CheckBoxIcon />}
            name={name}
            onChange={(e) => onChange(e,source)}
            checked={isChecked ? true : false}
           
            style={{paddingBottom:0,paddingTop:0}}
            className={classes.tickSize}
            disabled={disabled||false}
            color="primary"
          /></Suspense>
        }
      />
        </FormGroup>
  );
}
