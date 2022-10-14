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
}))
/*** 
 * Author Nargel Velasco - Tech Team
 * @param {Array} searchList - The dropdown items. Items must have value and selected attributes.
 * @param {function} onSelectHandler - Component event function
 * 
 * chipProps is always hidden to true
*/
export default function AreaMultipleAutoComplete(props) {
  const { searchList, source, onSelectHandler, placeholder, label,disabled } = props;
  const classes = useStyles(props);
  return (
    <div className="custom-select-field multiselect-box">
    <Autocomplete
      multiple
      classes={classes}
      ChipProps={{ hidden: true }}
      id="auto-select"
      options={searchList || []}
      label={label || ''}
      disabled={disabled||false}
      disableCloseOnSelect
      onChange={() => {
        onSelectHandler(searchList, source);
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
          disabled={disabled||false}
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
          style={{ border: 'none' }}
        />
      )}
  
  />
  </div>

  );
}

