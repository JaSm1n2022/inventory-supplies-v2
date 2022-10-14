import React, { useState, lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Tooltip, InputAdornment } from '@material-ui/core';

const VisibilityOffIcon = lazy(() => import(/* webpackChunkName: 'iconVisibilityOff' */ "@material-ui/icons/VisibilityOff"));
const VisibilityIcon = lazy(() => import(/* webpackChunkName: 'iconVisibility' */ "@material-ui/icons/Visibility"));

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
  margin: {
    margin: theme.spacing(1),
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
export default function SecretTextField(
  {source,onChange,variant,isError,value,errorMsg,readonly,name,placeholder,border,background,disabled,size,height}){
  const classes = useStyles();
  let colorBkg = background || '';
  colorBkg = disabled ? '#e9ecef' : colorBkg;
  const [isVisibility, setIsVisibility] = useState(false);
  
  return (
    <form className={classes.root} noValidate autoComplete="off">

<TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label=""
        margin="dense"
        type={isVisibility ? 'text' : 'password'}
        InputProps={{
          style: {
            fontSize: size || 14,
            height: height || 40,
            marginLeft: '0',
            marginRight: '0',
        
            background: colorBkg
            
          },
          
          classes:{notchedOutline: border && border === 'none' ? classes.noBorder : ''},
          endAdornment: (
            <InputAdornment position="end">
            {isVisibility ?   <Tooltip title={<h6 style={{ color: "lightblue" }}>Click to hide</h6>}><Suspense fallback="Loading..."><VisibilityIcon onClick={() => setIsVisibility(!isVisibility)}/></Suspense></Tooltip>: <Tooltip title={<h6 style={{ color: "lightblue" }}>Click to show</h6>}><Suspense fallback="Loading..."><VisibilityOffIcon onClick={() => setIsVisibility(!isVisibility)}/></Suspense></Tooltip>}
            </InputAdornment>
          ),
        }}
        error={isError||false}
        disabled={disabled || false}
        id="outlined-error-helper-text"
        label={isError ? 'Error' : ''}
        defaultValue={value}
        helperText={isError ? <label hmtlFor="" style={{fontSize:'10pt'}}>{errorMsg}</label> : ''}
      classes={classes.inputRoot} id={name} readonly={readonly|| false} 
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          // Do code here
          ev.preventDefault();
        }
      }}
      onChange={(e) => onChange(e,source)} 
      name={name} 
      value={value} 
      placeholder={placeholder} 
      variant={variant || 'outlined'} 
      
      />

    </form>
  );
}