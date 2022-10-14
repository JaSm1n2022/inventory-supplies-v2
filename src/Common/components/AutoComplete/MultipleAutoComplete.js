import React, { lazy, Suspense } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const AddCircleOutlined = lazy(() => import(/* webpackChunkName: 'iconAddCircleOutlined' */ "@material-ui/icons/AddCircleOutlined"));
const RemoveCircleOutline = lazy(() => import(/* webpackChunkName: 'iconRemoveCircleOutline' */ "@material-ui/icons/RemoveCircleOutline"));

const useStyles = makeStyles(theme => ({
  inputRoot: {
    margin: "0",
    height: '40px',
    background:'white',
    "&&& input": {
      fontSize: "10pt",
      border: '0px solid #d6d8db'
    }
  }
}))
/*** 
 * Author Nargel Velasco - Tech Team
 * @param {Array} searchList - The dropdown items. Items must have value and selected attributes.
 * @param {function} onSelectHandler - Component event function
 * 
 * chipProps is always hidden to true
*/
export default function MultipleAutoComplete({ disabled,searchList, source,onSelectHandler,placeholder }) {
  const classes = useStyles();
  return (
    <div className="custom-select-field multiselect-box">
      <Autocomplete
        multiple
        disabled={disabled}
        classes={classes}
        ChipProps={{ hidden: true }}
        id="auto-select"
        options={searchList || []}
        disableCloseOnSelect
        onChange={() => {
            onSelectHandler(searchList,source);
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
            placeholder={placeholder || 'Select'}
            {...params}
            variant="outlined"
            disabled={disabled}
            margin="dense"
            style={{ border: 'none' }}
          />
        )}
      />
    </div>
  );
}

