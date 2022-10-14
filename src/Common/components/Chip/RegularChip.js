import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    // control radiogroup classes if needed
}));
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Array} selected - current selected items
 * @param {function} onDelete - Component onDelete function
 * @param {Boolean} exclude - Flag to alter chip color 
 * 
 * 
*/
export default function MaterialUiChip({selected,onDelete,exclude,source}) {
    
    const classes = useStyles();


    return (
        
            <ul className="chips">
                {selected && selected.length > 0
                    ? selected.map((state) => {
                        return (
                            <li key={state.id}>
                                <Chip
                                    label={state.value}
                                    onDelete={() => onDelete(state,source)}
                                    color={exclude ? "secondary" : "primary"}
                                    size="small"
                                />
                            </li>
                        );
                    })
                    : null}
            </ul>

       
    )
}