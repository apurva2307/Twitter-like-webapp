import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../util/MyButton';
import HomeIcon from '@material-ui/icons/Home';
//components
import PostScream from './PostScream';
import Notifications from './Notifications';

function Navbar({ authenticated }) {
    return (
        <AppBar>
            <Toolbar className="nav-container">
            { authenticated ? (
                <Fragment>
                    <PostScream />
                    <Link to="/">
                        <MyButton tipTitle="Home">
                            <HomeIcon/>
                        </MyButton>
                    </Link>
                    <Notifications/>
                </Fragment>
            ) : (
                <Fragment>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </Fragment>
            )
            }    
            </Toolbar>
        </AppBar>
    )
}
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
}) 

export default connect(mapStateToProps)(Navbar);
