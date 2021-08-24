import React from 'react';
import noImg from '../noImg.png';
import { withStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
        display: "flex",
        marginBottom: 20,
    },
    cover: {
        minWidth: 200,
        objectFit: "cover"
    },
    cardContent: {
        padding: 25,
        flexDirection: "column",
        width: "100%"
    },
    handle: {
        width: 60,
        height: 17,
        backgroundColor: "#00bcd4",
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: "rgba(0,0,0,0.3)",
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: "90%",
        backgroundColor: "rgba(0,0,0,0.5)",
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: "50%",
        backgroundColor: "rgba(0,0,0,0.5)",
        marginBottom: 10
    },
}

function ScreamSkeleton({classes}) {
    const content = Array.from({ length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={noImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
            </CardContent>
        </Card>
    ))
    return (
        <>
           {content} 
        </>
    )
}

export default withStyles(styles)(ScreamSkeleton);
