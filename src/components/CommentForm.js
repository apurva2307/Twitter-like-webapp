import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//MUI stuff
import { withStyles } from '@material-ui/styles';
import { Button, Grid, TextField } from '@material-ui/core';
//Redux
import { connect } from 'react-redux';
//others
import { submitComment } from '../redux/actions/dataActions';

const styles = {
    closeButton: {
        position: 'absolute',
        left: "90%",
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
      },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
}

function CommentForm({ classes, DATA, UI, user, screamId, submitComment }) {
    const { authenticated } = user;
    const { loading } = UI;
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setBody(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("bod", body);
        submitComment(screamId, {body: body});
        if (!errors && !loading) {
            setBody("");
        }
    }
    useEffect(() => {
        setErrors(UI.errors);
        console.log("errors>>", errors)
    }, [errors, UI.errors])
    
const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center"}}>
        <form onSubmit={handleSubmit}>
            <TextField
                name="body"
                type="text"
                label="Comment on scream"
                error={errors && errors.comment ? true : false}
                helperText={errors?.comment}
                value={body}
                onChange={handleChange}
                fullWidth
                className={classes.textField}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
            > Submit </Button>
        </form>
        <hr className={classes.visibleSeparator}/>
    </Grid>
) : (
    null
)
    return commentFormMarkup;
}
CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    DATA: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    sreamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    submitComment: PropTypes.func.isRequired
}
const mapStateToProps = ({ UI, DATA, user }) => ({
    UI,
    DATA,
    user
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
