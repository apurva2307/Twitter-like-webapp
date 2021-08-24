import React from 'react';
import { Link } from 'react-router-dom';

//MUI Stuff
import { withStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
//Components
import DeleteScream from './DeleteScream';
import MyButton from '../util/MyButton';
import ScreamDialog from './ScreamDialog';
//Other plugins
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './LikeButton';



const styles = {
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 20,
        objectFit: "cover",

    }
}

function Scream( { scream, body, commentCount, likeCount, createdAt, userHandle, userImage, classes, DATA, user, openDialog }) {
    dayjs.extend(relativeTime);
    const authenticated = user.authenticated;
    const { handle } = user.credentials;
    
    const delete_Scream = authenticated && userHandle === handle ? <DeleteScream screamId={scream.screamId}/> : null;
    
    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title="Profile image" className={classes.image}/>
            <CardContent className={classes.content}>
                <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body} {delete_Scream} </Typography>
                    <LikeButton screamId={scream.screamId}/>
                <span>{likeCount} likes</span>
                <MyButton tipTitle="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog scream_Id={scream.screamId} openDialog={openDialog}/>
            </CardContent>
        </Card>
    )
}
const mapStateToProps = ({ DATA, user }) => ({
    DATA,
    user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream));
