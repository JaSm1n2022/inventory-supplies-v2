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
export default function DateTypeAutoComplete(props) {
  const {value,options,name,onSelectHandler,onClearHandler,isError,errorMsg,source,disabled,placeholder} = props;
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

        onInputChange={(event, newInputValue,reason) => {
          console.log('[reason]',reason);
            if (reason === 'clear') {
              onClearHandler(name);
            } 
          }}
          getOptionLabel={option => option.label}
        renderOption={(option, state) => {
          return (
          
              <MenuItem key={`dtAuto-${option.id}`} disabled={option.dateRange} value={option.value}><label htmlFor="" style={{fontSize:'10pt',fontWeight:'bold'}}>{option.label}</label>
              </MenuItem>
          );
        }}

        renderInput={params => (
          <TextField
            {...params}
            error={isError||false}
            helperText={isError ? errorMsg : ''}
            variant="outlined"
            margin="dense"
            fullWidth
            placeholder={placeholder || 'Select'}
            label={placeholder ? placeholder : undefined}
            className={classes.textFieldInput}
            style={{border:'none !important'}}
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
