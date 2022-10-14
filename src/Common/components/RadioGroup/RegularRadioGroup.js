import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControlLabel  } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    // control radiogroup classes if needed
    label: {
        fontSize: props => props.fontSize || '0.65em'
    },
    padding : '0px'
}));
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {String} name - component name
 * @param {function} onChange - How to handle onChange event 
 * @param {String} value - expected value
 * @param {Array} options - value options
 * 
 * 
*/
export default function RegularRadioGroup(props) {
    const {name,value,onChange,options,size} = props;
    const classes = useStyles();
    const radioStyle = {
        paddingLeft : '0px',
        
        fontSize: size || '10pt',
       
    };
    const radioColor = 'primary';

    return (
        <div>
        		<RadioGroup aria-label={name} name={name} row onChange={(e) => onChange(e)}>
                {options && options.length > 0 && options.map((c, i) => {
                        return (
                            <FormControlLabel  key={`radio-${i}`} style={{fontSize:size || '10pt',paddingLeft:'0px'}} classes={classes} value={c.value} control={<Radio color={radioColor}  
                           size="large"
                            checked={value && value.toLowerCase() === c.value.toLowerCase() ? true : undefined}/>} label={c.description} />
        		        )
                    })}
      			</RadioGroup>
        </div>
    )
}