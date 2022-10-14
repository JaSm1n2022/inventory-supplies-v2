import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { TextareaAutosize } from '@material-ui/core';
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

export default function RegularTextArea(
  { placeholder,rows,onChange,value,name,source,disabled }) {
  const classes = useStyles();
 

  return (
    
<TextareaAutosize
      aria-label="empty textarea"
      placeholder={placeholder || undefined}
      minRows={rows || 3}
      value={value}
      name={name}
      disabled={disabled||false}
      style={{width:'100%'}}
      className="form-control"
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          // Do code here
          ev.preventDefault();
        }
      }}
      onChange={(e) => onChange(e, source)}
    />
  
  );
}