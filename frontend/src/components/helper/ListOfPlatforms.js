import React from 'react';
import { Badge } from 'reactstrap';

const ListOfPlatforms = props => (
  <div>
    {props.platforms.map(system => <span key={system}><Badge pill>{system}</Badge> </span>)}
  </div>
);


export default ListOfPlatforms;
