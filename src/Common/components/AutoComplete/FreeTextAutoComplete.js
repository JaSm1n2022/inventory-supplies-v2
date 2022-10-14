import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles( theme => ({
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
 * Author 
 * Nargel Velasco - Tech Team
 * @param {String} value - Component target value
 * @param {Array} searchList - The dropdown items.
 * @param {function} onSelectHandler - Component event function
 * 
 * chipProps is always hidden to true
*/
export default function FreeTextAutoComplete(props) {
  const {value,name,options,onSelectHandler,isError,errorMsg,source,disabled,placeholder,onChangeHandler} = props;
  const classes = useStyles(props);
 
  return (
      <Autocomplete
        classes={classes}
        ChipProps={{hidden:true}}
        id="checkboxes-tags-demo"
        options={options || []}
        value={value}
        disabled={disabled||false}
        onChange={(e, item) => {
       
          if (item && item.value) {
          onSelectHandler(item,source); 
          }
        }}
          getOptionLabel={option => option.label}
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
            margin="dense"
            name={name}
            fullWidth
            placeholder={placeholder || 'Select'}
            label={placeholder ? placeholder : undefined}
            className={classes.textFieldInput}
            style={{border:'none !important'}}
            onChange={(e) => onChangeHandler(e)}
            InputLabelProps={{
              style: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                fontSize: '10pt',
                color: 'black'
              } }} 
          />
        )}
      />
  );
}

