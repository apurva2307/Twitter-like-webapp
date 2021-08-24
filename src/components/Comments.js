import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import dayjs from 'dayjs';

const styles = {
    commentImage: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    commentData: {
        marginLeft: 20,
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
      },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
}

function Comments({ comments, classes }) {
    return (
        <Grid container>
            {
                comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key ={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            { index !== comments.length -1 && <hr className={classes.visibleSeparator}/> }
                        </Fragment>
                    )
                })
            }
        </Grid>
    )
}

export default withStyles(styles)(Comments);
