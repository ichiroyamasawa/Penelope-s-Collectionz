import React from 'react';
import './styles.css';

//local import
import Directory from './../../Directory';

const Homepage = props =>
{
    return(
        <section className="homepage">
            <Directory/>
        </section>
    )
}

export default Homepage;