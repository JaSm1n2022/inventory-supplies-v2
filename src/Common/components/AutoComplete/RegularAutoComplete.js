import React, { useState, lazy } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {TextField,Grid} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  inputRoot: {
    margin: "0",
    height: '40px',
    background:'white',
    "&&& input": {
      fontSize: "10pt",
      border: 'none',
      paddingTop: 2,
      fontWeight:500
    }
  }
}));

/*** 
 * Author Nargel Velasco - Tech Team
 * @param {Array} searchList - The dropdown items. 
 * @param {function} onSelectHandler - Component event function
 * @param {function} fetchDataHandler - Function to lookup value
 * chipProps is always hidden to true
*/
export default function RegularSingleAutoComplete(props) {
  const {value,options,onSelectHandler,isError,errorMsg,source,placeholder} = props;
  
const [inputValue, setInputValue] = useState("");
  const classes = useStyles();
 
  return (
    <div className="">
      <Autocomplete
        classes={classes}
        value={value}
        ChipProps={{ hidden: true }}
        id="checkboxes-tags-demo"
        options={options || []}
      
        onChange={(e, item) => {
          if (item && item.value) {
            onSelectHandler(item,source); 
            }
        }}
        getOptionLabel={option => option.value}
        renderOption={(option, state) => {
          return (
            <React.Fragment>
              <Grid container wrap="wrap" spacing={2} style={{ borderTop: "1px solid grey" }}>
                <Grid item xs zeroMinWidth>
                  <Typography wrap>{option.label}</Typography>
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
          placeholder={placeholder}
          error={isError || false}
          helperText={isError ? <label hmtlFor="" style={{ fontSize: '10pt' }}>{errorMsg}</label> : ''}
          {...params}
          
          InputLabelProps={{
            style: {
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
              fontSize: '10pt',
              color: 'black'
            } }} 
            variant="outlined"
          
            style={{border:'none'}}
          />
        )}
      />
    </div>
  );
}