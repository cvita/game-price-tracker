import React, { Component } from 'react';
import { push } from 'react-router-redux';
import store from '../../redux/store';

import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';
import AutoSuggestions from './AutoSuggestions';
import './TitleSearch.css';


class TitleSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { userInput: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        this.props.generateAutoSuggestions(value, 5); // Number is max results
        this.setState({ userInput: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { userInput } = this.state;
        if (typeof userInput === 'string' && userInput !== '') {
            this.props.searchByTitle(userInput);
            store.dispatch(push(`/search/${userInput}`));
        }
    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <InputGroup>
                    <Input
                        className='titleSearchInput'
                        onChange={this.handleChange}
                        value={this.state.userInput}
                        type='text'
                        autoComplete='off'
                        placeholder='Enter game title'
                    />
                    <InputGroupButton>
                        <Button
                            onClick={this.handleSubmit}
                            disabled={this.state.userInput === ''}
                            color='primary'
                            type='submit'
                        >
                            <i className="fa fa-search" aria-hidden="true" /> Search
                        </Button>
                    </InputGroupButton>
                </InputGroup>

                <AutoSuggestions autoSuggestions={this.props.autoSuggestions} />
            </form>
        );
    }
}


export default TitleSearch;
