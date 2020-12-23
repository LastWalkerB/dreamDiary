import React, {useState, useEffect} from 'react';
import {getDreams, getDreamDiaries} from './apiCore';
import Layout from './Layout.js';
import Dream from './dreams.js';
import {Link, Redirect} from 'react-router-dom';
const Home = () => {

    const [dreamsByOwner, setDreamsByOwner] = useState([]);
    const loadDreamsByOwner = () => {
        getDreams()
        .then(data => {
            if (data.error) {
                //setError(data.error);
                console.log("error detected");
            } else {
               setDreamsByOwner(data);
            }
        })
    }

    const handleClick = (e) =>{
      e.preventDefault();
      console.log("The link was clicked");
    //  <Dream oname = {dream.owner}/>
    }
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    useEffect(() => {
        loadDreamsByOwner();
    }, []);



    return(
      <div>
        {dreamsByOwner.map((dream, i) => {
          return(
            <div>
            {JSON.stringify(dream)}
            </div>
          )
        }
      )
      }
      <div>
        <form onSubmit = {handleSubmit}>
        <input type = "text" name ="oname"/>
        <button type="submit">Submit</button>
      </form>
      </div>
      </div>
    );
};

export default Home;
