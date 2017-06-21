import React from 'react';
import { Card, CardImg, CardText, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './ActivePriceAlerts.css';

function ActivePriceAlerts(props) {
    var info = props.alertInfo;
    var title = Object.keys(info)[0];
    var gameImage = info[title].gameImage;
    var dateAdded = new Date(info[title].alerts[0].dateAdded).toDateString();
    var expiration = info[title].alerts[0].expiration;

    return (
        <li className='activePriceAlertPreview'>
            <Card>
                <CardBlock>
                    <CardTitle>{title}</CardTitle>
                    <CardSubtitle>Added on {dateAdded}.</CardSubtitle>
                </CardBlock>

                <CardImg top width="100%" src={gameImage} alt="game thumbnail" />
                <CardBlock>

                    <CardText>This price alert will automatically expire on {expiration}.</CardText>
                    <Button
                        color='info'
                        outline
                        onClick={() => props.handleClick(info)}
                    >
                        Remove price alert
                    </Button>
                </CardBlock>
            </Card>
        </li>
    );
}


export default ActivePriceAlerts;