import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      width: '100%',
      height: '40px'
    },
  },
  inputRoot: {
    width: '100%',
    height: '40px'

  },
  noBorder: {
    border: "none",
    width: '100%',
    height: '40px'

  }
}));

/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Function} onChange - Component onChange function
 * @param {String} variant - outlined/filled/standard
 * @param {String} type - number/text/search and default is text
 * @param {String} name - target component name
 * @param {String} value - target component value
 * @param {Boolean} isError - flag to indicate if component is in error state
 * @param {Boolean} errorMsg - Error message
 * @param {Boolean} readonly - Flag to indicate if component is in readonly state
 * @param {String} placeholder - Placeholder text
 * @param {String} border - set border
 * @param {Object} source - item object
 * @param {Object} background - set background color
 * 
*/

export default function InvoiceTextField(
  { id, source, onChange, variant, label, isError, type, value, errorMsg, readonly, name, placeholder, border, background, disabled, size, height }) {
  const classes = useStyles();
  let colorBkg = background || '';
  colorBkg = disabled ? '#e9ecef' : colorBkg;
  let topLabel = label ? label : placeholder;

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        error={isError || false}
        id={id||'txt-fld'}
        disabled={disabled || false}
        type={type || "text"}
        defaultValue={value}
        helperText={isError ? <label hmtlFor="" style={{ fontSize: '10pt' }}>{errorMsg}</label> : ''}
        classes={classes.inputRoot} id={name} readOnly={readonly || false}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            // Do code here
            ev.preventDefault();
          }
        }}
        onChange={(e) => onChange(e, source)}
        name={name}
        value={value}
        readonly={readonly || false}
        margin="dense"
        variant={variant || 'outlined'} InputProps={{
          style: {
            fontSize: size || 14,
            height: height || 40,
            marginLeft: '0',
            marginRight: '0',

            background: colorBkg

          },

          classes: { notchedOutline: border && border === 'none' ? classes.noBorder : '' }
        }} />
    </form>
  );
}