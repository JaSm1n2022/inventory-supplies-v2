import React, { lazy, Suspense, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';

import {
  Modal,
} from '@material-ui/core';
import SingleWithClearAutoComplete from '../AutoComplete/SingleWithClearAutoComplete';
import { DEFAULT_SELECTED_ITEM } from '../../../../utils/constants';
import Helper from '../../../../utils/helper';
import { Tooltip } from '@material-ui/core';

const CheckCircleOutlined = lazy(() => import(/* webpackChunkName: 'iconAddCircleOutlined' */ "@material-ui/icons/CheckCircleOutlineOutlined"));
const BlockIcon = lazy(() => import(/* webpackChunkName: 'iconAddCircleOutlined' */ "@material-ui/icons/BlockOutlined"));


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

export default function MultipleCarriersModal(props) {
  const {
    closeModalHandler,
    submitHandler,
    shipments,
    carrierInfo,
    eligibleShipmentCnt,
    eligibleShipments,
    autoMultipleCarriersCompleteInputHander,
    onMultipleCarriersChangeInputHandler,
  carrierList,
    isOpen
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [carrierSelected,setCarrierSelected] = useState(DEFAULT_SELECTED_ITEM);
  const [modalStyle] = useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
    closeModalHandler();
  };
  const autoCompleteInputHander = (item, source) => {
    console.log('[item]', item)
    if (item.category === 'carrier') {
      setCarrierSelected(item);
    }
  }
  const handleSubmit = () => {
   setOpen(false);
   submitHandler({
     carrier : carrierSelected,
     eligibleShipments : eligibleShipments
   })
  }
  console.log('[shipments]', shipments);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3>Assign Multiple Shipments</h3>
      <h5>Eligible Shipment(s) : {eligibleShipmentCnt}</h5>
      <div style={{ display: 'inline-flex' }}>
        <div style={{ width: '200px' }}>
          <SingleWithClearAutoComplete
            value={carrierSelected || DEFAULT_SELECTED_ITEM}
            name="carrier"
            label={'Select Carrier'}
            placeholder={'Select Carrier'}
            onSelectHandler={autoCompleteInputHander}
            options={carrierList} />
        </div>
        &nbsp;
        <div style={{ width: '200px' }}>
          <Button size="medium" variant="contained" color="primary" onClick={() => handleSubmit()}>
            {carrierInfo && carrierInfo.name && carrierInfo.name !== '-' ? 'Reassign' : 'Assign'}
          </Button>
          &nbsp;
          <Button size="medium" variant="contained" color="default" onClick={() => handleClose()}>
            Cancel
          </Button>
        </div>
      </div>

      <TableContainer style={{ maxWidth: '400px', maxHeight: '300px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Shipment #</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Is Allowed</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map(shipment => (
              <TableRow key={`nfinit-${shipment.id}`}>
                <TableCell>{shipment.shipmentNbr}</TableCell>
                <TableCell>{shipment.carrierName}</TableCell>
                <TableCell>
                  <Grid container wrap="wrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                    </Grid>
                    <Grid item >
                      {shipment.isAllowed ? 
                      <Suspense fallback="Loading..."><CheckCircleOutlined style={{ fontSize: '16pt', color: 'green' }} /></Suspense>
                    :   
                    

                    <Suspense fallback="Loading...">
                      <Tooltip title={<h4 style={{ color: "lightblue" }}>Shipment has been Picked up or Delivered.</h4>} arrow>
                      <BlockIcon style={{ fontSize: '16pt', color: 'red' }} /></Tooltip></Suspense>
                    }
                    </Grid>

                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
 
    </div >
  );

  return (
    <div>
      <Modal
        fullWidth={true}
        maxWidth={'500px'}
        maxHeight={'400px'}
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