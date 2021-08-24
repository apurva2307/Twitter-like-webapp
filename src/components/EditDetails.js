import React, { Fragment, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { editUserDetails } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Tooltip, IconButton, Dialog, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



const styles = {
    button: {
        position: 'relative',
        float: "right"
      },
    textField: {
        margin: '10px auto 10px auto'
    },
    form: {
        textAlign: 'center'
    }
}

function EditDetails({ classes, user, editUserDetails }) {
    const { credentials } = user;
    const [state, setState] = React.useState({bio:"", website:"", location:"", open: false});

    const mapUserDetailsToState = (credentials) => {
        setState({
            ...state,
            bio: credentials.bio ? credentials.bio : "", 
            website: credentials.website ? credentials.website : "", 
            location: credentials.location ? credentials.location : ""
        })
    };

    useEffect(() => {
        mapUserDetailsToState(credentials);
    },[]);

    const handleOpen = () => {
        setState({ ...state, open: true });
        console.log(state.open)
    }
   
    const handleClose = () => {
        setState({...state, open: false })
    }
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        const userDetais = {
            bio: state.bio,
            website: state.website,
            location: state.location
        };
        editUserDetails(userDetais);
        handleClose();
    }
    return (
        <Fragment>
            <Tooltip title="Edit profile picture" placement="top">
                <IconButton onClick={()=> handleOpen()} className={classes.button}>
                    <EditIcon color="primary"/>
                </IconButton>
            </Tooltip>
                <Dialog open={state.open} onClose={()=> handleClose()} fullwidth maxWidth="sm" >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short bio about yourself"
                                className={classes.textField}
                                value={state.bio}
                                onChange={(e)=> handleChange(e)}
                                fullWidth
                            />
                              <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Your personal/professional website"
                                className={classes.textField}
                                value={state.website}
                                onChange={(e)=> handleChange(e)}
                                fullWidth
                            /> 
                              <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Where you live"
                                className={classes.textField}
                                value={state.location}
                                onChange={(e)=> handleChange(e)}
                                fullWidth
                            />                         
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleSubmit()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        </Fragment>
    )
}
EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired
}
const mapStateToProps = ({ user }) => ({
    user
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
