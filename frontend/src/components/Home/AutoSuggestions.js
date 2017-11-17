import React, { PureComponent } from 'react';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import { InputGroupButton, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import ListOfPlatforms from '../helper/ListOfPlatforms';
import './AutoSuggestions.css';


const Suggestion = props => {
    const { title, image } = props;
    const { platforms } = props.details;
    return (
        <div className='suggestion'>
            <ListOfPlatforms platforms={platforms} />
            <small>{title}</small>
            <img className='suggestionImage' src={image} alt={title} />
        </div>
    );
};

class AutoSuggestions extends PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { dropdownOpen: false };
    }
    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }
    handleClick(gameId) {
        store.dispatch(push(`/games/${gameId}`));
    }
    render() {
        const autoSuggestions = this.props.autoSuggestions ? this.props.autoSuggestions : [];
        return (
            <InputGroupButton>
                <Dropdown isOpen={autoSuggestions.length > 0} toggle={this.toggle}>
                    <DropdownToggle className='autoSuggestionsDropdownToggle' />
                    <DropdownMenu>
                        {autoSuggestions.map((game, i) => {
                            return (
                                <div key={game.cid + '-' + i}>
                                    <DropdownItem onClick={() => this.handleClick(game._id)}>
                                        <Suggestion {...game} />
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
