import React from 'react';
import { Link } from 'react-router';
import { Badge } from 'reactstrap';

function NotFound(props) {
    return (
        <div>
            <h1>
                <Badge>Hmm, couldn't find that url</Badge>
            </h1>
            <p>Let's go back <Link to='/'>home</Link> and try again!</p>
        </div>
    );
}

export default NotFound;
