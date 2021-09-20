import React from 'react';
import Contacts from './contact/contact';
const Home = ()=>{
    return(
        <React.Fragment>
            <div className="bg-gray-100">
                <section>
                    <Contacts/>
                </section>
            </div>
        </React.Fragment>
    )
}

export default Home;