import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { Tooltip } from "@material-ui/core";

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
export default function OceanAutoComplete(props) {
  const {tooltiptext,tooltipPlacement,value,options,onSelectHandler,onChangeHandler,isError,errorMsg,disabled,placeholder,name,source} = props;
  const classes = useStyles(props);
 const body = (
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
  onInputChange={(event, newInputValue) => {
    if(!newInputValue) {
   onChangeHandler({target: {name:name,value: newInputValue}},source);
    }
  }}
    getOptionLabel={option => option.title}
  renderOption={(option, state) => {
    return (
      <React.Fragment>
        
        <Grid container wrap="wrap" spacing={2} style={{ borderTop: "1px solid grey" }}>
          <Grid item xs zeroMinWidth>
            <Typography wrap>{option.title}</Typography>
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
      disabled={disabled || false}
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
        } }} 
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            // Do code here
            ev.preventDefault();
          }
        }}
    />
  )}
/>
 )


  
  return (
    <form autoComplete="off" noValidate width="100%">
      {tooltiptext ? 
        <Tooltip placement={tooltipPlacement || 'bottom-start'} title={<label style={{ fontSize: "12px", paddingTop: "3px" }}>{props.tooltip || placeholder}</label>}>
        {body}
      </Tooltip>
      : <React.Fragment>{body}</React.Fragment> 
              }
      </form>
  );
}

