import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, IconButton, Typography, Tooltip } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import dayjs from 'dayjs';
import { uploadImage, logoutUser } from '../redux/actions/userActions';
import { KeyboardReturn } from '@material-ui/icons';
import EditDetails from './EditDetails';
import MyButton from '../util/MyButton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
              cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
    }
}

function Profile({ classes, user, logoutUser, uploadImage }) {
    const { credentials, authenticated, loading } = user;
    const { handle, createdAt, bio, location, imageUrl, website } = credentials;

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        uploadImage(formData);
    }
    const handleEditPicture = (e) => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    }

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper} elevation={3}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
                    <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
                    <MyButton tipTitle="Edit profile picture" btnClassName="button" onClick={handleEditPicture} placement="top">
                        <EditIcon color="primary"/>
                    </MyButton>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        {handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                        <LocationOn color="primary"/> <span>{location}</span>
                        <hr/>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">{" "}{website}</a>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{" "}<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
                <Tooltip title="Logout" placement="top">
                    <IconButton onClick={() => logoutUser()}>
                        <KeyboardReturn color="primary"/>
                    </IconButton>
                </Tooltip>
                <EditDetails/>
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">No profile found, please login again.</Typography>
            <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to="/login"> Login </Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup"> Signup </Button>
            </div>
        </Paper>
    )) : (<ProfileSkeleton/>)

    return profileMarkup
}
Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}
const mapStateToProps = ({ user }) => ({
    user
})
export default connect(mapStateToProps, { logoutUser, uploadImage })(withStyles(styles)(Profile));
