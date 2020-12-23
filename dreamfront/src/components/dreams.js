import React, {useState, useEffect} from 'react';
import {getDreams, getDreamDiaries, getDreamsByOwner} from './apiCore';
import Layout from './Layout.js';
import {Link, Redirect} from 'react-router-dom';

const Dream = (props) => {
    //const oname = this.props.oname;
    //console.log(oname);
    console.log(props);
    const [dreamsByOwner, setDreamsByOwner] = useState([]);
    const loadDreamsByOwner = (name) => {
        getDreamsByOwner(name)
        .then(data => {
            if (data.error) {
                //setError(data.error);
                console.log("error detected");
            } else {
               setDreamsByOwner(data);
            }
        })
    }

    useEffect(() => {
        loadDreamsByOwner("jawad");
    }, []);

    return(

      <Layout
          className='container-fluid'>
          <div className='row'>
          {dreamsByOwner.map((dream, i) => {
              return(
                  <div
                      key={i}
                      className='col-4 mb-3'>
                      <h1>{dream.owner}</h1>
                      {JSON.stringify(dream)}
                  </div>
              )
          })}
          </div>
        </Layout>
    );
};

export default Dream;
