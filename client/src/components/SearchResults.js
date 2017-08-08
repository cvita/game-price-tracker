import React, { Component } from 'react';
import SubmitGameForm from './SubmitGameForm';
import GamesGrid from './GamesGrid';
import './SearchResults.css';


class SearchResults extends Component {
    componentDidMount() {
        setTimeout(() => {
            if (this.props.searchResults.length === 0) {
                const url = window.location.toString();
                const searchTerm = decodeURIComponent(url.slice(url.indexOf('search/') + 7));
                if (searchTerm !== '') {
                    this.props.searchByTitle(searchTerm);
                }
            }
        }, 250);
    }
    render() {
        return (
            <div>
                <SubmitGameForm {...this.props} />

                <p className='lead searchResultsTitle'>{this.props.searchResults.length} results</p>
                <GamesGrid allGames={this.props.searchResults} />
            </div>
        );
    }
}

export default SearchResults;
