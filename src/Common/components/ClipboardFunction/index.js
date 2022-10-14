import { Button,Popover, Typography } from '@material-ui/core';
import React, { useState, useEffect} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import TOAST from '../../../../modules/toastManager';


const useStyles = makeStyles({
    custom: {
   
      fontWeight: "bold"
    }
  });
export default function ClipboardFunction(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentItem, setCurrentItem] = useState(undefined);
    

    useEffect(() => {
        if (props.currentItem) {
            setCurrentItem(props.currentItem);
        }
    }, [props.currentItem]);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const id = open ? 'simple-popover' : undefined;
    const clipboardHandler = () => {
        setAnchorEl(null);
        navigator.clipboard.writeText(currentItem[props.colName]).then(function () {
            TOAST.ok(`${currentItem[props.colName]} copied to clipboard`);
        }, function (err) {
            TOAST.error(`${currentItem[props.colName]} failed to copy`);
        
        });
    }
    return (

        <React.Fragment>
            {currentItem ?
                <div id={props.id}>
                    <Typography  style={{cursor:'pointer'}} className={props.colName === 'shipmentNbr' ? classes.custom : ''} variant="h6" onClick={handleClick}>
                        {currentItem[props.colName]}
                    </Typography>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Button variant="outlined" onClick={() => clipboardHandler()}>Copy to clipboard</Button>
                    </Popover>
                </div>

                : null}
        </React.Fragment>
    )
};