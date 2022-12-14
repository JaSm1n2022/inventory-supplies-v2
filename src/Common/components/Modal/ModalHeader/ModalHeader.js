import React from "react";
import PropTypes from 'prop-types';
import { Typography, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./ModalHeader.module.css";
import  ArrowBackIcon from "@material-ui/icons/ArrowBack";
// A header, containing a title and cancel button, to be displayed
// at the top of a modal.

const ModalHeader = ({ title, onClose, isBack,onBack, ...props}) => {
  
  return (
    <div {...props} className={styles.modalHeader}>
      <div style={{display:'inline-flex'}}><Typography className={isBack ? styles.onBack : styles.title} variant="h4" onClick={() => isBack ? onBack() : null}>{isBack ? <ArrowBackIcon style={{fontSize:'16pt'}}/> : null} {title}</Typography></div>
      <Button onClick={onClose} className={styles.closeButton}>
        <CloseIcon />
      </Button>
    </div>
  );  
};

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onBack : PropTypes.func,
  isBack : PropTypes.bool
}

export default ModalHeader;
