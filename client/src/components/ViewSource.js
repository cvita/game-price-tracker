import React from 'react';
import {Col, Row} from 'reactstrap';

function ViewSource(props) {
    return (
        <div>
            <Row>
                <Col md='12'>
                    <p className='text-center'>
                        View source on <a
                            href='https://github.com/VitaC123/game-price-tracker'
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            GitHub
                </a>
                    </p>
                </Col>
            </Row>
        </div>
    );
}

export default ViewSource;