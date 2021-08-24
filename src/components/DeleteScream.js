import React, {Fragment} from 'react';
//MUI Stuff
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';
//Components
import MyButton from '../util/MyButton';

const styles = {
    deleteButton: {
        position: "absolute",
        left: '90%',
        top: '10%',
    }
}

function DeleteScream({ classes, deleteScream, screamId }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const delete_scream = () => {
        deleteScream(screamId);
        setOpen(false);
    }
    return (
        <Fragment>
            <MyButton tipTitle="Delete Scream" onClick={handleOpen} btnClassName={classes.deleteButton}>
                <DeleteOutline color="secondary"/>
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Are you sure, you want to delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={delete_scream} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = ({ DATA, user }) => ({
    DATA,
    user
})

export default connect(mapStateToProps, { deleteScream } )(withStyles(styles)(DeleteScream));
