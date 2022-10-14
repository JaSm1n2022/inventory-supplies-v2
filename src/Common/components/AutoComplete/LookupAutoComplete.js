import React, { useState, lazy, Suspense } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { DebounceInput } from 'react-debounce-input';
import Typography from '@material-ui/core/Typography';
import {TextField,Grid} from '@material-ui/core';

const AddCircleOutlined = lazy(() => import(/* webpackChunkName: 'iconAddCircleOutlined' */ "@material-ui/icons/AddCircleOutlined"));
const RemoveCircleOutline = lazy(() => import(/* webpackChunkName: 'iconRemoveCircleOutline' */ "@material-ui/icons/RemoveCircleOutline"));

const useStyles = makeStyles(theme => ({
  inputRoot: {
    margin: "0",
    height: '40px',
    "&&& input": {
      fontSize: "10pt",
      border: '0px solid #d6d8db'
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
export default function LookupAutoComplete({value,searchList,onSelectHandler,fetchDataHandler,placeholder,source}) {

const [inputValue, setInputValue] = useState("");
  const classes = useStyles();
  const autofillInputHandler = ({ target }) => {
	  if(target.value && target.value.length > 2) {
    fetchDataHandler(target.value,source);
		}
	};
  return (
    <div className="custom-select-field multiselect-box">
      <Autocomplete
        multiple
        classes={classes}
        value={value}
        ChipProps={{ hidden: true }}
        id="checkboxes-tags-demo"
        options={searchList || []}
        inputValue={inputValue}
        disableCloseOnSelect
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(e, item) => {
          if (item && item.length > 0) {
       
            onSelectHandler(searchList,source);
          }
        }}
        getOptionLabel={option => option.value}
        renderOption={(option, state) => {
          return (
            <React.Fragment>
              <Grid container wrap="wrap" spacing={2} style={{ borderTop: "1px solid grey" }} onClick={() => option.selected = !option.selected}>
                <Grid item xs zeroMinWidth>
                  <Typography wrap>{option.value}</Typography>
                </Grid>
                <Grid item >
                  {!option.selected ?
                    <Suspense fallback="Loading..."><AddCircleOutlined style={{ fontSize: '16pt' }} /></Suspense>
                    :
                    <Suspense fallback="Loading..."><RemoveCircleOutline style={{ fontSize: '16pt' }} /></Suspense>
                  }
                </Grid>

              </Grid>

            </React.Fragment>
          );
        }}

        renderInput={params => (
          <TextField
          placeholder={placeholder}
            {...params}
            type="search"
          onChange={(e) => autofillInputHandler(e)}
            variant="outlined"
            margin="dense"
            style={{border:'none'}}
          />
        )}
      />
    </div>
  );
}

