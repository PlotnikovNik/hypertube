import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./Form/SignIn/components/SignIn";
import SignUp from "./Form/SignUp/components/SignUp";
import Layout from "./General/templates/components/Layout";
import Catalog from "./Stream/Catalog/components/catalog";

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: true
		}
	}

    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/" render={() => (
								this.state.isLogged ? (<Redirect to="/catalog"><Catalog /></Redirect>) : <SignIn />)} />
                            <Route path="/signUp" component={SignUp} />
                            <Route path="/catalog" component={Catalog} />
                        </Switch>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
