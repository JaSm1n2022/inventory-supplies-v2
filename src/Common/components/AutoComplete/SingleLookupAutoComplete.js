import React, { useState, lazy, Suspense } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {TextField,Grid} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    margin:"0",
    height:props => props.height || '40px',
    width:"100%",
    background:"white",
    "&&& input": {
      fontSize: "10pt",
      border: 'none',
      paddingTop: 2
    }
},
textFieldInput: {
  marginTop: theme.spacing(0)
}
}));

/*** 
 * Author Nargel Velasco - Tech Team
 * @param {Array} searchList - The dropdown items. 
 * @param {function} onSelectHandler - Component event function
 * @param {function} fetchDataHandler - Function to lookup value
 * chipProps is always hidden to true
*/
export default function SingleLookupAutoComplete({value,isError,name,errorMsg,onSelectHandler,options,disabled,fetchDataHandler,placeholder,...props}) {

  const classes = useStyles();
  const autofillInputHandler = ({ target }) => {
	  if(target.value && target.value.length > 2) {
    fetchDataHandler(options,name,target.value);
		}
	};
  return (
    <form autoComplete="off" noValidate width="100%">
      <Autocomplete
        classes={classes}
        ChipProps={{hidden:true}}
        id="simple-autocomplete"
        options={options || []}
        value={value}
        disabled={disabled||false}
        onChange={(e, item) => {
       
          if (item && item.title) {
          onSelectHandler(item,name); 
          }
        }}
          getOptionLabel={option => option.title}
     
        renderOption={(option, state) => {
          return (
            <React.Fragment>
            <Grid container wrap="wrap" spacing={2} style={{ borderTop: "1px solid grey" }}>
              <Grid item xs zeroMinWidth>
                <Typography wrap>{option.value}</Typography>
              </Grid>
              <Grid item >
            {/*
                <AddCircleOutlined style={{ fontSize: '16pt' }} />
            */}
                </Grid>
            
            </Grid>
          </React.Fragment>
          );
        }}
        renderInput={params => (
          <TextField
            {...params}
            error={isError||false}
            helperText={isError ? errorMsg : ''}
            variant="outlined"
            fullWidth
            placeholder={placeholder || 'Select'}
            onChange={(e) => autofillInputHandler(e,name)}
            label={placeholder ? placeholder : undefined}
            className={classes.textFieldInput}
            style={{border:'none !important'}}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                // Do code here
                ev.preventDefault();
              }
            }}
            InputLabelProps={{
              style: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
              } }} 
          />
        )}
       
      />
    </form>
  );
}

