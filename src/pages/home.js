import Grid from '@material-ui/core/Grid';
// import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Scream from '../components/Scream';

const Home = () => {
    const [screams, setScreams] = useState(null);
    const fetchScreams = async() => {
        try {
          const response = await fetch("/screams");
          const screams = await response.json();
          setScreams(screams);
        } catch (error) {
          console.log(error)
        }
      };
    useEffect(() => {
        fetchScreams();
    },[])
    
    console.log(screams)
    
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                { screams && screams.map((scream) => {
                    return <Scream key={scream.screamId} {...scream}/>
                    })
                }
                { !screams && <div><br></br><div className="dots-3"></div></div>
                }
            </Grid>
            <Grid item sm={4} xs={12} >
                <p>profie</p>
            </Grid>
        </Grid>
    )
}

export default Home;
