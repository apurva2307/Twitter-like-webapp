import Grid from '@material-ui/core/Grid';
// import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import Scream from '../components/Scream';
import ScreamSkeleton from '../util/ScreamSkeleton';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { getScreams } from '../redux/actions/dataActions';

const Home = ({ DATA, getScreams, user }) => {
    const { commentCount } = DATA.scream;
    
    useEffect(() => {
        getScreams();
    },[commentCount]);

    const { screams, loading } = DATA;

    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                { screams && screams.map((scream) => {
                    return <Scream key={scream.screamId} {...scream} scream={scream}/>
                    })
                }
                { loading && <ScreamSkeleton/> }
            </Grid>
            <Grid item sm={4} xs={12} >
                <Profile/>
            </Grid>
        </Grid>
    )
}
const mapStateToProps = ({ DATA, user }) => ({
    DATA,
    user
})

export default connect(mapStateToProps, { getScreams })(Home);
