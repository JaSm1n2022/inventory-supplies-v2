import React, { lazy, Suspense, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Select from '@material-ui/core/Select';
import { Grid, InputLabel } from '@material-ui/core';
import RegularDatePicker from '../Date/RegularDatePicker';

const CircleIcon = lazy(() => import(/* webpackChunkName: 'iconLens' */ "@material-ui/icons/Lens"));

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        width: '100%'

    },
    quantityRoot: {
        border: '0',
        margin: 0,
        width: '100%'

    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    root: {
        height: '40px',
        width: '100%',
        fontSize: '10pt',
        borderBottom: '0px solid white',
        background: 'white'

    },
    rootRule: {
        height: '34px',
        width: '100%',
        fontSize: '10pt',
        borderBottom: '0px solid white',
        background: 'white',
        color: 'black'

    },

}));
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {String} variant - variant value (outlined,filled,standard)
 * @param {Boolean} isError - flag to indicate that component field is in error state
 * @param {String} errorMsg - Error message if isError is true
 * @param {String} name - target component name
 * @param {String} value - target component value
 * @param {String} root - set className 
 * @param {Object} source - item object
 * @param {Array} options - Items dropdown
 * * @param {Function} onChange - Component onChange function
 * 
 * 
*/
export default function DateTypeSelect({ disabled, placeholder, label, variant, onChange, name, isError, root, value, source, options, errorMsg }) {
    const classes = useStyles();
    
    const [to, setTo] = useState('');
    const [from,setFrom] = useState('');
    const dateInputHandler = (value, name) => {
      switch (name) {
        case "to":
          setTo(value);
          return;
        case "from":
          setFrom(value);
          return;
        default:
          return;
      }
    }
    return (
        <div>
            <FormControl variant={variant || "outlined"} className={classes.quantityRoot} error={isError}>
                {label &&
                    <InputLabel id="demo-simple-select-outlined-label">{<h4>{label}</h4>}</InputLabel>
                }
                <Select
                    inputProps={{ style: { fontSize: '10pt' } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: '10pt' } }} // font size of input label
                    labelId="simple-select-filled-label"
                    id={name}
                    placeholder={placeholder}
                    label={label}
                    disableCloseOnSelect
                    name={name}
                    margin="dense"
                    disabled={disabled || false}
                    className={root && root === 'minmax' ? classes.rootRule : classes.root}
                    value={value || 'Select'}
                    source={source}
                    onChange={(event) => onChange(event, source)}
                >
                    <MenuItem disabled value={'Select'}>Select</MenuItem>

                    {options && options.length > 0 && options.map((c, i) => {
                        return (
                            <MenuItem key={`dts-${i}`} value={c.value}><label htmlFor="" style={{ fontSize: '10pt' }}>{c.description || c.name}</label>
                            </MenuItem>
                        )
                    })}
                    
                    <Grid spacing={1} container xs={12} direction="row" style={{maxWidth:'300px',alignItems:'center'}}>
                        <Grid xs={5} item>
                            <RegularDatePicker name={'from'} value={to} onChange={dateInputHandler}/>
                        </Grid>
                        <Grid xs={1} item style={{alignItems:'center'}}>
                            to
                        </Grid>
                        <Grid xs={5} item>
                            <RegularDatePicker name={'to'}  value={to} onChange={dateInputHandler}/>
                        </Grid>
                    </Grid>

                </Select>
                {isError && <FormHelperText style={{ color: 'red' }}>{errorMsg}</FormHelperText>}

            </FormControl>
        </div>
    )
}