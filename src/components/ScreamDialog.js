import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//MUI stuff
import { withStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux
import { getScream, clearErrors } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
//components
import MyButton from '../util/MyButton';
import CommentForm from './CommentForm';
// others
import dayjs from 'dayjs';
import LikeButton from './LikeButton';
import Comments from './Comments';

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
    dialogContent: {
        padding: 20
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

function ScreamDialog({ scream_Id, UI, DATA, getScream, classes, clearErrors, openDialog }) {
    const [open, setOpen] = useState(false);
    const [oldPath, setOldPath] = useState("");
    const { scream } = DATA;
    const { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments } = scream;
    const { loading } = UI;

    const handleOpen = () => {
        setOpen(true);
        getScream(scream_Id);
    }
    const handleClose = () => {
        setOpen(false);
        clearErrors();
        window.history.pushState(null, null, oldPath);
    }
    
    useEffect (() => {
        if(openDialog) {
            handleOpen();
        }
    },[])

    useEffect(() => {
        if (open) {
            let oldPath = window.location.pathname;
            const newPath = `/users/${userHandle}/scream/${screamId}`;
            if(oldPath === newPath) {
                oldPath = `/users/${userHandle}`;
            }
            window.history.pushState(null, null, newPath);
            setOldPath(oldPath);
        }
    },[scream])

    
const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
        <CircularProgress size={100}/>
    </div> 
    
) : (
    <Grid container spacing={16}>
        <Grid item sm={5}>
            <img src={userImage} alt="profile" className={classes.profileImage}/>
        </Grid>
        <Grid item sm={7}>
            <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}>
                @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator}/>
            <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
            </Typography>
            <hr className={classes.invisibleSeparator}/>
            <Typography variant="body1">{body}</Typography>
            <LikeButton screamId={screamId}/>
            <span>{likeCount} likes</span>
            <MyButton tipTitle="comments">
                <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
    </Grid>
)

    return (
        <Fragment>
            <MyButton onClick={handleOpen} tipTitle="Expand scream" tipClassName={classes.expandButton} >
                <UnfoldMore color="primary" />
            </MyButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <MyButton tipTitle="Close" onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

ScreamDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    DATA: PropTypes.object.isRequired,
    scream: PropTypes.object,
    scream_Id: PropTypes.string.isRequired,
    userHandle: PropTypes.string,
    getScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}
const mapStateToProps = ({ UI, DATA }) => ({
    UI,
    DATA
})

export default connect(mapStateToProps, { getScream, clearErrors })(withStyles(styles)(ScreamDialog));

