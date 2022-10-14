import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Layout from "./Layouts/Base";

import Login from "./Layouts/auth/Login";
import * as actions from './store/actions';
import StockRoom from './Layouts/Pages/StockRoom';
import Distribution from './Layouts/Pages/Distribution';
import Invoice from './Layouts/Pages/Invoice';
import Vendor from './Layouts/Settings/Vendor';
import Product from './Layouts/Settings/Product';
import Location from './Layouts/Settings/Location';
import Client from './Layouts/Settings/Client';
import Worker from './Layouts/Settings/Worker';
import Dashboard from './Layouts/Dashboard';
import { supabaseClient } from "./config/SupabaseClient";


const App = (props) => {
	const session = supabaseClient.auth.session()
	const [signedIn, setSignedIn] = useState(true);



	useEffect(() => {
		//	props.onTryAutoSignup();
		supabaseClient.auth.onAuthStateChange((event, session) => {
			console.log('[application]',event, session)
			if (event === 'SIGNED_OUT') {
				setSignedIn(false)
			}else {
				setSignedIn(true);
			}
		})
	}, [session]);

	console.log('[signed/session]',signedIn,session);

	return (
		<Router basename="/">

			<Layout isSignedIn={signedIn && session}>
					{!signedIn || !session ? 
					<Switch>
						<Route exact path="/" component={withRouter(Login)} />
					</Switch>
					:
					<Switch>
						<Route exact path="/stockroom" component={withRouter(StockRoom)} />
						<Route exact path="/distribution" component={withRouter(Distribution)} />
						<Route exact path="/invoice" component={withRouter(Invoice)} />
						<Route exact path="/vendor" component={withRouter(Vendor)} />
						<Route exact path="/location" component={withRouter(Location)} />
						<Route exact path="/client" component={withRouter(Client)} />
						<Route exact path="/worker" component={withRouter(Worker)} />
						<Route exact path="/product" component={withRouter(Product)} />
						<Route exact path="/dashboard" component={withRouter(Dashboard)} />
						<Route exact path="/login" component={withRouter(Login)} />
						<Route exact path="/" component={withRouter(Invoice)} />
						
					</Switch>
}
				
			</Layout>

		</Router>
	);
}




const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		isInboxOpen: false
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));