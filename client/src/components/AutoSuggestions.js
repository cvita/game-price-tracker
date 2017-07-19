import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Badge, InputGroupButton, Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';


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

class AutoSuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: false };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({ toggle: !this.state.toggle });
    }
    handleClick(gameId) {
        browserHistory.push(`/games/${gameId}`);
    }
    render() {
        const suggestions = this.props.suggestions.slice(0, 5);

        return (
            <InputGroupButton>
                <Dropdown isOpen={suggestions.length > 0} toggle={this.toggle}>
                    <DropdownMenu>
                        {suggestions.map((game, i) => {
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
