import React, { PureComponent } from 'react';
import AutoSuggestions from './AutoSuggestions';
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';
import './SubmitGameForm.css';


class SubmitGameForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { gameInput: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        this.props.generateAutoSuggestions(value, 5);
        this.setState({ gameInput: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { gameInput } = this.state;
        if (typeof gameInput === 'string' && gameInput !== '') {
            this.props.searchByTitle(gameInput);
         //   browserHistory.push(`/search/${gameInput}`);
        }
    }
    render() {

        return (
            <form onSubmit={this.props.handleSubmit}>
                <InputGroup>
                    <Input id='gameInput' onChange={this.handleChange} value={this.state.gameInput} type='text' autoComplete='off' placeholder='Enter title, or select from below' />
                    <InputGroupButton>
                        <Button id='gameInputButton' type='submit' onClick={this.handleSubmit} disabled={this.state.gameInput === ''}>Search</Button>
                    </InputGroupButton>
                </InputGroup>
                <AutoSuggestions autoSuggestions={this.props.autoSuggestions} />
            </form>
        );
    }
}


export default SubmitGameForm;
