import React, { useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  Modal,
  } from '@material-ui/core';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    margin: 'auto',
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    minWidth: 300,

    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowX: 'auto'
  },
  
}));


/*** 
 * Author 
 * Nargel Velasco - Tech Team
 * @param {Object} data - header and rows data
 * @param {Function} exportHandler - handle export function
 * @param {Function} closeModal - close modal 
 * @param {Function} isOpen - open modal if true
 * 
*/

export default function QuoteReferenceModal(props) {
  const {
    confirmQuoteHandler,
    description,
    isOpen,
    handleGenerateBol
  } = props;

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  
  const [open, setOpen] = useState(false);
  const [touchCreateBol, setTouchCreateBol] = useState(false);

  const handleClose = () => {
    setOpen(false);
    confirmQuoteHandler();
  };

  const handleCreateeBol = (e) => {
    setTouchCreateBol(true);
    e.preventDefault();
    handleGenerateBol();
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="form-field">
        <h3>Booking Confirmed!</h3>
        <label htmlFor="">Here is your booking reference:</label>
        <h4>{props.quoteReference}</h4>
        <br />
        <div className="form-field">
          <Button variant="contained" color="primary" onClick={() => handleClose()}>OK</Button>
          <Button variant="outlined" color="primary" href="#outlined-buttons" style={{marginLeft:'5px'}} disabled={touchCreateBol} onClick={(e) => handleCreateeBol(e)}>Create BOL</Button>
        </div>
        <br />
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        fullWidth={true}
        maxWidth={'300px'}
        maxHeight={'200px'}
        open={isOpen ? true : false}
        onClose={handleClose}
        aria-labelledby="yn-modal"
        aria-describedby="yes-or-no"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {body}
      </Modal>
    </div>
  );
}