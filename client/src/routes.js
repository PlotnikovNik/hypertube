import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import SignIn from "./components/Form/signIn";
import SignUp from "./components/Form/signUp";
import ForgottenPasswd from "./components/Form/forgottenPasswd";
import ResetPasswd from "./components/Form/resetPasswd";
import Layout from "./templates/layout";

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Router>
                    <div>
                        <Switch >
                            <Route exact path="/" component={ SignIn } />
                            <Route path="/signUp" component={ SignUp } />
                            <Route path="/forgottenPasswd" component={ ForgottenPasswd } />
                            <Route path="/resetPasswd" component={ ResetPasswd } />
                        </Switch>
                    </div>
                </Router>
            </Layout>
        );
    }
}

export default Routes;
