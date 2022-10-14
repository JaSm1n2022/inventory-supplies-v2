import React, { useState, lazy } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {TextField,Grid} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  inputRoot: {
    margin: "0",
    height: '40px',
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
export default function CommodityAutoComplete({value,searchList,onSelectHandler,fetchDataHandler,placeholder,isError,errorMsg,source}) {

const [inputValue, setInputValue] = useState("");
  const classes = useStyles();
  const autofillInputHandler = ({ target }) => {
    fetchDataHandler(target.value,source);
		
  };
  return (
    <div className="">
      <Autocomplete
        classes={classes}
        value={value}
        ChipProps={{ hidden: true }}
        id="checkboxes-tags-demo"
        options={searchList || []}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
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
            type="text"
          onChange={(e) => autofillInputHandler(e)}
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

