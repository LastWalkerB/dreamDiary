import React from 'react';
//import Menu from './Menu';
//import '../styles.css';


const Layout = (
    { title = '', description = '', children, className }) => {
    return (
        <div>

            <div className='jumbotron'>
                <h2>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <div className={className}>{children}
            </div>
        </div>
    );
};

export default Layout;
