import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { green, purple } from '@material-ui/core/colors';
import * as actions from '../../store/actions/index';
import { Button, Container, CssBaseline, Divider, Grid, Paper, Typography } from '@material-ui/core';
import Hospice from '../../assets/images/logo/logo.png';
import RegularTextField from '../../Common/components/TextField/RegularTextField';
import { supabaseClient } from "../../config/SupabaseClient";
import TOAST from '../../modules/toastManager';
const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 24,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const ColorButton = withStyles((theme) => ({
    root: {
        fontSize: 16,
        width: 200,
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);
const ColorButtonLink = withStyles((theme) => ({
    root: {
        fontSize: 16,
        width: 200,
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const theme = createTheme({
    palette: {
        primary: green,
    },
});

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithGithub = async () => {
    await supabaseClient.auth.signIn({
      provider: 'github'
    })
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signIn({ email });
      
      if (error) throw error;
     TOAST.ok('Please check your email');
    } catch (error) {
        console.log('[error login]',error.toString());
     TOAST.error('Failed to sign in',error.toString());
    } finally {
      const user = supabaseClient.auth.user();
      setLoading(false);
      if (user) {
        console.log('user->>>', user)
      }
    }
  };
const inputHandler = ({target}) => {
    console.log('target',target.value);
    setEmail(target.value);
}
    return (
        <React.Fragment>
            <Grid container spacing={24} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid
                    justify="space-between" // Add it here :)
                    container
                    spacing={24}
                >
                    <Grid>
                        <div style={{ display: 'inline', gap: 10 }}>
                            <img src={Hospice} alt="" style={{ height: '50px', paddingRight: "25px" }} />
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
                            <div style={{display:'none'}}>
                                <ColorButton variant="contained" color="primary" className={classes.margin}>
                                    REGISTER HERE
                                </ColorButton>

                            </div>

                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider variant="fullWidth" style={{
                        height: '.02em',
                        border: 'solid 1px rgba(0, 0, 0, 0.12)'
                    }} orientation="horizontal" flexItem />
                </Grid>
                < br />
                <Paper  elevation={0} direction="column" justifyContent="center" style={{ width: '100%', height: 500 }}>
                    <div align="center">
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <Typography variant="h4">Sign in to Divine Compassion Hospice Inventory System</Typography>
                                <Typography variant="body">via Magic Link email</Typography>
                            </Grid>
                            <Grid item xs={4} style={{paddingTop:8,paddingBottom:8,paddingLeft:4,paddingRight:4}}>
                            <Paper elevation={1} direction="row" justifyContent="center" style={{marginTop:12,paddingTop:12,paddingBottom:8,paddingLeft:4,paddingRight:4}}>
                            <div style={{paddingBottom:10}}>
                            <RegularTextField name={'email'} value={email} placeholder={'Email'} onChange={inputHandler}/>
                            </div>
                            <div style={{display:'none'}}>
                            <RegularTextField placeholder={'Password'}/>
                            </div>
                            <div style={{display:'inline',gap:10}}>
                            <ColorButton variant="contained" color="primary" className={classes.margin} onClick={() => handleLogin()}>
                                    SEND MAGIC LINK
                                </ColorButton>
                               {/*
                                <ColorButtonLink variant="outlined" color="secondary" className={classes.margin}>
                                    RESET PASSWORD
                                </ColorButtonLink>
                               */}
                              </div>  
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>

            </Grid>
        </React.Fragment>
    );


}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);