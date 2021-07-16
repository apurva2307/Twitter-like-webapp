import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

const styles = {
    card: {
        display: "flex",
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: "cover"
    }
}

function Scream( { body, commentCount, likeCount, createdAt, userHandle, userImage, classes }) {
    dayjs.extend(relativeTime);
    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title="Profile image" className={classes.image}/>
            <CardContent className={classes.content}>
                <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1">{body}</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(Scream);
