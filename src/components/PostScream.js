import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

//MUI stuff
import { withStyles } from '@material-ui/styles';
import { Dialog, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { clearErrors, postScream } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
//components
import MyButton from '../util/MyButton';

const styles = {
    closeButton: {
        position: 'absolute',
        top: "3%",
        left: "90%",
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    submitButton: {
        position: 'relative',
        float: "right",
        marginTop: 3,
    },
    progressSpinner: {
        position: 'absolute'
    }
}

function PostScream({ classes, UI, postScream, clearErrors }) {
    const [open, setOpen] = React.useState(false);
    const [body, setBody] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const loading = UI.loading;
    
    const handleOpen = () => {
        setOpen(true);
        // console.log(open)
    }
    const handleClose = () => {
        setOpen(false);
        setErrors({});
        clearErrors();
    }    
    const handleChange = (e) => {
        setBody(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        postScream({body: body});
         if (errors) {
            setOpen(true);
        }
    }
    useEffect(() => {
        setErrors(UI.postScreamErrors);
        if (!errors && !loading) {
            setBody("");
            setOpen(false);
        }
        if (errors){
            setOpen(true);
        }
    }, [UI.postScreamErrors, loading, errors]);

    

    return (
        <Fragment>
            <MyButton tipTitle="Post a Scream!" onClick={handleOpen}>
                <AddIcon/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton tipTitle="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>Post a new Scream!</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField 
                        name="body" 
                        type="text" 
                        label="SCREAM!" 
                        multiline 
                        rows="3" 
                        placeholder="write your scream" 
                        error={errors && errors.body ? true : false}
                        helperText={errors && errors.body}
                        className={classes.textField}
                        onChange={(e)=>handleChange(e)}
                        fullWidth />
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            Submit
                            {loading && <CircularProgress size={30} className={classes.progressSpinner}/> }
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}
PostScream.propTypes = {
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired
}
const mapStateToProps = ({ UI }) => ({
    UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));
