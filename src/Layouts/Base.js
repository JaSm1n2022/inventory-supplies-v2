import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications';


import * as actions from '../store/actions';
import { Grid } from '@material-ui/core';
export const CustomToastContainer = props => (
    // eslint-disable-next-line
    <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
  );

const Base = (props) => {
  console.log('props.children',props.isSignedIn);
        
        return (
            <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
              {props.isSignedIn ? 
        <React.Fragment>
        <Grid container  spacing={24} style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
    
        <Header
              />
    </Grid>    
        <main>
        <Grid container  spacing={24} style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10 }}>
        
            {props.children}
            </Grid>
        
        </main>
        </React.Fragment>
        : 
          
        <main>
            {props.children}
        </main>
}
        </ToastProvider>
        )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
  });
  
  const mapDispatchToProps = dispatch => ({
    });

export default connect(mapStateToProps, mapDispatchToProps)(Base);









