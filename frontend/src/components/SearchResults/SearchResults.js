import React, { Component } from 'react';
import TitleSearch from '../Home/TitleSearch';
import GamesGrid from '../helper/GamesGrid';


class SearchResults extends Component {
    componentDidMount() {
        // Enables a search result url that can be bookmarked/shared
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
                <TitleSearch {...this.props} />
                <p className='lead' style={{ margin: '1em' }}>{this.props.searchResults.length} results</p>
                <GamesGrid allGames={this.props.searchResults} />
            </div>
        );
    }
}

export default SearchResults;
