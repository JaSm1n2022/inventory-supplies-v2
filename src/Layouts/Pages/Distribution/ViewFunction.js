import { Button } from '@material-ui/core';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import EditIcon from "@material-ui/icons/Edit"
export default function ViewFunction(props) {
   
    const openEditModalHandler = () => {
        props.createFormHandler(props.data,'view');
    }
    
    return (
        <React.Fragment>
            {props.data ?
                <div>
                <Button
                variant="contained"
                color="primary"
            onClick={() => openEditModalHandler()}
            component="span"
          >
            View Items
          </Button>
                </div>
                : null
            }
        </React.Fragment>
    )
};