import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//MUI Stuff
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
//Components
import Scream from '../components/Scream';
import StaticProfile from '../components/StaticProfile';
//Other plugins
import axios from 'axios';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const styles = {
    loading: {
        margin: "20px auto 10px auto",
    }
}

function User({ classes, DATA, getUserData }) {
    const { handle, screamId } = useParams();
    const [profile, setProfile] = useState({});
    const [screamIdParam, setScreamIdParam] = useState(null);
    useEffect(() => {
        getUserData(handle);
        if(screamId) {
            setScreamIdParam(screamId);
        }
        axios.get(`/user/${handle}`)
            .then(res => {
                console.log("pro", res.data.user)
                const userData = res.data.user
                setProfile(userData);
            })
            .catch(err => console.log(err));
        
    }, []);
    console.log("profi", profile)

    const { screams, loading } = DATA;
    const screamMarkup = loading ? (
        <ScreamSkeleton/>
    ) : screams === null ? (
        <p>No screams from this user</p>
    ) : !screamIdParam ? (
        screams.map(scream => <Scream key={scream.screamId} {...scream} scream={scream}/>)
    ) : (
        screams.map(scream => {
            if(scream.screamId !== screamIdParam){
                return <Scream key={scream.screamId} {...scream} scream={scream}/>
            } else return <Scream key={scream.screamId} {...scream} scream={scream} openDialog/>
        })
    )

    return (
        <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {screamMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                { profile ? <StaticProfile profile={profile} /> : <ProfileSkeleton/>}
            </Grid>
        </Grid>
    )
}
const mapStateToProps = ({ DATA, user }) => ({
    DATA,
    user
})

export default connect(mapStateToProps, { getUserData } )(withStyles(styles)(User));

