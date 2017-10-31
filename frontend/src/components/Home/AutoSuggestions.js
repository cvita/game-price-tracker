import React, { PureComponent } from 'react';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import { Badge, InputGroupButton, Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import './AutoSuggestions.css';


function SuggestedResult(props) {
    const { title, image } = props;
    const { platforms } = props.details;

    return (
        <div className='suggestion'>
            {platforms.map((system, i) => <span key={system}><Badge pill>{system}</Badge>{' '}</span>)}
            <small>{title}</small>
            <img className='suggestionImage' src={image} alt={title + ' cover'} />
        </div>
    );
}

class AutoSuggestions extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { toggle: false };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ toggle: !this.state.toggle });
    }
    handleClick(gameId) {
        store.dispatch(push(`/games/${gameId}`));
    }
    render() {
        const { autoSuggestions } = this.props;

        return (
            <InputGroupButton >
                <Dropdown isOpen={autoSuggestions.length > 0} toggle={this.toggle}>
                    <DropdownMenu>
                        {autoSuggestions.map((game, i) => {
                            return (
                                <div key={game.cid + '-' + i}>
                                    <DropdownItem onClick={() => this.handleClick(game._id)}>
                                        <SuggestedResult {...game} />
                                    </DropdownItem>
                                    <DropdownItem divider />
                                </div>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </InputGroupButton>
        );
    }
}


export default AutoSuggestions;
