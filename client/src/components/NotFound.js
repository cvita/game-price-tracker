import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
    return (
        <div>
            <h2>Not Found</h2>
            <p>
                Maybe you should just go <Link to='/'>home</Link>
            </p>
        </div>
    );
}

export default NotFound;
