import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({query: ''})
    }

    render () {
        const { books, onChangeShelf } = this.props
        const { query } = this.state

        let showingBooks

        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = books.filter((book) => match.test(book.title))
        } else {
            showingBooks = books
        }
        showingBooks.sort(sortBy('title'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search"
                        >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {showingBooks.length !== books.length && (
                        <div className='showing-books'>
                            <span>Now showing {showingBooks.length} of {books.length} total</span>
                            <button type='text' onClick={this.clearQuery}>Show all</button>
                        </div>
                    )}
                    <ListBooks books={showingBooks} onChangeShelf={onChangeShelf}/>
                </div>
            </div>
        )
    }
}
export default SearchBooks