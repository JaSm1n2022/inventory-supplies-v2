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
    height: props => props.height || "40px",
    width: "100%",
    background: props => props.disabled ? "#e9ecef" : "white",
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
export default function AreaLookupAutoComplete(props) {
  const {disabled,value,searchList,onSelectHandler,fetchDataHandler,placeholder,source} = props;

const [inputValue, setInputValue] = useState("");
  const classes = useStyles(props);
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
        disabled={disabled || false}
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
            InputLabelProps={{
              style: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: '100%',
                fontSize: '10pt',
                color: 'black'
              }
            }}
            style={{border:'none'}}
          />
        )}
      />
    </div>
  );
}

