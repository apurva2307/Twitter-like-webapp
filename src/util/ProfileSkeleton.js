import React from 'react';
import noImg from '../noImg.png';
import { withStyles } from '@material-ui/styles';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Paper from '@material-ui/core/Paper';

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
    handle: {
        height: 20,
        backgroundColor: "#00bcd4",
        width: 60,
        margin: "0 auto 7px auto"
    },
    fullLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "50%",
        marginBottom: 10
    }
}

function ProfileSkeleton({classes}) {
   
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={noImg} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className={classes.handle}/>
                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <hr/>
                    <LocationOn color="primary"/> <span>Location</span>
                    <hr/>
                    <LinkIcon color="primary" /> https://website.com
                    <hr/>
                    <CalendarToday color="primary"/> Joined Date
                </div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(ProfileSkeleton);
