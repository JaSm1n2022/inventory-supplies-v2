import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import TOAST from '../modules/toastManager';
import { ACTION_STATUSES } from '../utils/constants';
import StorageUtil from '../utils/storageUtil';
import { Link } from "react-router-dom";
import { Button, Divider, Grid, Menu, MenuItem, Typography } from '@material-ui/core';

import SettingsIcon from '@material-ui/icons/Settings';
import Hospice from '../assets/images/logo/logo.png';
import { logout } from '../store/actions';
let shipmentReference = '';

function Header({
  history
}) {
  const { addToast } = useToasts();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isVendor,setIsVendor] = React.useState(false);

  //    inboxCnt = Object.keys(messageState.data).length;


  useEffect(() => {
    TOAST.setToastManager(addToast);


  }, []);
	const redirectLink = (link) => {
    history.push(`/${link}`);
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const vendorSettingHandler = () => {
    setAnchorEl(null);
  redirectLink('vendor');

  }
  const facilitySettingHandler = () => {
    setAnchorEl(null);
  redirectLink('location');

  }
  const clientSettingHandler = () => {
    setAnchorEl(null);
  redirectLink('client');

  }
  const workerSettingHandler = () => {
    setAnchorEl(null);
  redirectLink('worker');

  }
  const productSettingHandler = () => {
    setAnchorEl(null);
  redirectLink('product');

  }
  return (
    <React.Fragment>

      <Grid container spacing={24} justify="space-between" >
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={24}
        >
          <Grid>
            <div style={{display:'inline',gap:10}}>
              <img src={Hospice} alt=""  style={{ height: '100px',width:'500px' }} />
            <Typography variant="h5"><strong>INVENTORY SYSTEM</strong></Typography>
         </div>
          </Grid>
          <Grid>
            <div style={{
              display: 'flex',
              align: 'right',
              gap: '10px',
              paddingBottom: 10
            }}>
              <Button variant="contained" color="primary" onClick={() => redirectLink('supplyorder')}>Supply Order Transaction</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('stockroom')}>Stock Room Inventory</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('distribution')}>Supplies Delivery Record</Button>
              <Button variant="contained" color="primary"  onClick={() => redirectLink('invoice')}>Invoice Statement</Button>
              <Button variant="contained" color="primary" onClick={() => redirectLink('dashboard')}>Dashboard</Button>
              <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              aria-controls="simple-menu" aria-haspopup="true" 
              component="span"
              startIcon={<SettingsIcon />}
            >
             
  Settings
</Button>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={clientSettingHandler}>Clients</MenuItem>
  <MenuItem onClick={facilitySettingHandler}>Location</MenuItem>
  <MenuItem onClick={workerSettingHandler}>Workers</MenuItem>
  <MenuItem onClick={vendorSettingHandler}>Vendors</MenuItem>
  <MenuItem onClick={productSettingHandler}>Products</MenuItem>
  
</Menu>
              
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth" style={{
            height: '.02em',
            border: 'solid 1px rgba(0, 0, 0, 0.12)'
          }} orientation="horizontal" flexItem />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


export default withRouter(Header);
