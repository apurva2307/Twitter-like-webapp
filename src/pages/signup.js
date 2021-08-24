import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';


const styles = {
    form: {
        textAlign: "center",
        marginLeft: 10,
        marginRight: 10,
    },
    pageTitle: {
        margin: "20px auto",
    },
    textField: {
        margin: "10px auto",
    },
    btn: {
        marginTop: 20,
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10,
    },
    loading: {
        margin: "20px auto 10px auto",
    }
}

function Signup({ classes, signupUser, UI, user }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUserData = {email, password, confirmPassword, handle};
        signupUser(newUserData, history);
    };
    useEffect(() => {
        setErrors(UI.errors);
        console.log("errors>>", errors)
    }, [errors, UI.errors])

    const loading = UI.loading;
  
    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm> 
                <Typography variant="h3" className={classes.pageTitle}>Sign Up</Typography>
                <form noValidate onSubmit={(e) => handleSubmit(e)}>
                    <TextField helperText={errors && errors.email} error={errors && errors.email ? true : false } fullWidth id="email" name="email" type="email" label="Email" className={classes.textField} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField helperText={errors && errors.password} error={errors && errors.password ? true : false } fullWidth id="password" name="password" type="password" label="Password" className={classes.textField} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <TextField helperText={errors && errors.confirmPassword} error={errors && errors.confirmPassword ? true : false } fullWidth id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <TextField helperText={errors && errors.handle} error={errors && errors.handle ? true : false } fullWidth id="handle" name="handle" type="text" label="Handle" className={classes.textField} value={handle} onChange={(e) => setHandle(e.target.value)}/>
                    {errors && errors.general && (
                        <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                    )}
                    {loading && <Typography variant="body2" className={`dots-3 ${classes.loading}`}></Typography> }
                    <Button type="submit" variant="contained" color="primary" className={classes.btn}>Signup</Button>
                    <br />
                    <br />
                    <small> Already have an account ? sign in <Link to="/login">here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}
Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}
const mapStateToProps = ({ user, UI }) => ({
    user,
    UI
})
const mapActionsToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));