import React from 'react';
import LazyLoad from 'react-lazyload';
import { CSSTransitionGroup } from 'react-transition-group';


const LazyFadeIn = props => (
  <LazyLoad height={props.height || 400} offset={props.offset || 150} once={true}>
    <CSSTransitionGroup
      transitionName='fadeInOnLoad'
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>

      {props.children}

    </CSSTransitionGroup>
  </LazyLoad>
);


export default LazyFadeIn;
