import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: props => props.label && props.statusList.find(c => c.status.toUpperCase() === props.label.toUpperCase()) ? props.statusList.find(c => c.status.toUpperCase() === props.label.toUpperCase()).background :  "rgba(33, 150, 243, 0.08)",
        "& .MuiAvatar-root": {
          margin: "4px 0px"
        },
        "& .MuiChip-label": {
          wordWrap: "break-word",
          whiteSpace: "normal",
          textOverflow: "clip",
          textAlign: "left",
          fontSize: "13px",
          flexGrow: 0,
          fontFamily: "Roboto",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "1.38",
          letterSpacing: "0.16px",
          color: props => props.label && props.statusList.find(c => c.status.toUpperCase() === props.label.toUpperCase()) ? props.statusList.find(c => c.status.toUpperCase() === props.label.toUpperCase()).color :  "#2196f3"
        },
        "& .MuiChip-deleteIcon": {
          margin: "8px 0px"
        }
      }
});
/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Array} selected - current selected items
 * @param {function} onDelete - Component onDelete function
 * @param {Boolean} exclude - Flag to alter chip color 
 * 
 * 
*/
export default function StatusChip(props) {
    
    const classes = useStyles(props);


    return (
        
                                <Chip
                                    label={props.label ? props.label.toUpperCase() : ''}
                                    className={classes.root}
                                    
                                />
       
       
    )
}