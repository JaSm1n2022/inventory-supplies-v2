import { Button } from '@material-ui/core';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import EditIcon from "@material-ui/icons/Edit"
export default function EditFunction(props) {
   
    const openEditModalHandler = () => {
        props.createSupplyFormHandler(props.data);
    }
    
    return (
        <React.Fragment>
            {props.data ?
                <div>
                <Button
            onClick={() => openEditModalHandler()}
            variant="contained"
            style={{
              border: 'solid 1px #2196f3',
              color: 'white',
              background: '#2196f3',
              fontFamily: "Roboto",
              fontSize: "12px",
              fontWeight: 500,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: 1.71,
              letterSpacing: "0.4px",
              textAlign: "left",
              cursor: 'pointer'
            }}
            component="span"
            startIcon={<EditIcon />}
          >
            EDIT
          </Button>
                </div>
                : null
            }
        </React.Fragment>
    )
};