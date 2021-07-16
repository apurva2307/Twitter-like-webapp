import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';



const styles = {
    form: {
        textAlign: "center",
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

function Login({ classes, loginUser, user, UI }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {email, password};
        loginUser(userData, history);
    };
    useEffect(() => {
        setErrors(UI.errors);
        console.log("errors>>", errors)
    }, [errors, UI.errors])

    const loading = UI.loading;
    console.log(UI)

  
    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm> 
                <Typography variant="h3" className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={(e) => handleSubmit(e)}>
                    <TextField  fullWidth id="email" name="email" type="email" label="Email" className={classes.textField} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {errors && errors.email && (
                        <Typography variant="body2" className={classes.customError}>{errors.email}</Typography>
                    )}
                    <TextField  fullWidth id="password" name="password" type="password" label="Password" className={classes.textField} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {errors && errors.password && (
                        <Typography variant="body2" className={classes.customError}>{errors.password}</Typography>
                    )}
                    {errors && errors.general && (
                        <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                    )}
                    {loading && <Typography variant="body2" className={`dots-3 ${classes.loading}`}></Typography> }
                    <Button type="submit" variant="contained" color="primary" className={classes.btn}>Login</Button>
                    <br />
                    <br />
                    <small> dont have an account ? sign up <Link to="/signup">here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired

}
const mapStateToProps = ({ user, UI }) => ({
    user,
    UI
})
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));