import React from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import { Typography, Paper } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import dayjs from 'dayjs';
import MuiLink from '@material-ui/core/Link';


const styles = {
    paper: {
        padding: 20,
        marginLeft: 20,
    },
    profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
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
    },
    
}


function StaticProfile({ profile, classes }) {
    const { handle, createdAt, imageUrl, bio, location, website } = profile;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
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
                        <>
                        <LocationOn color="primary"/> <span>{location}</span>
                        <hr/>
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">{" "}{website}</a>
                            <hr/>
                        </>
                    )}
                    <CalendarToday color="primary" />{" "}<span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(StaticProfile);
