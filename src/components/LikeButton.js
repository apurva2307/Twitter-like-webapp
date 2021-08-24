import React from 'react';
import { Link } from 'react-router-dom';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import MyButton from '../util/MyButton';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import { connect } from 'react-redux';


function LikeButton({ user, likeScream, unlikeScream, screamId}) {
    const authenticated = user.authenticated;
    const likedScream = () => {
        if(user.likes && user.likes.find(like => like.screamId === screamId)){
            return true
        } else return false;
    };
    const like_Scream = () => {
        likeScream(screamId);
    };
    const unlike_Scream = () => {
        unlikeScream(screamId);
    }
    const  likeButton = !authenticated ? (
        <Link to="/login">
            <MyButton tipTitle="Like">
                <FavoriteBorder color="primary"/>
            </MyButton>
        </Link>
    ) : (
        likedScream() ? (
            <MyButton tipTitle="Undo like" onClick={unlike_Scream}>
                <Favorite color="primary"/>
            </MyButton>
        ) : (
            <MyButton tipTitle="Like" onClick={like_Scream}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        )
    )
    return likeButton;
}

const mapStateToProps = ({ user }) => ({
    user
})

export default connect(mapStateToProps, { likeScream, unlikeScream } )(LikeButton);
