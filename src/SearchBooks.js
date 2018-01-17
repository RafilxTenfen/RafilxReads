import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {DebounceInput} from 'react-debounce-input'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        query: '',
        books: []
    }

    componentDidMount() {
        this.setState({books: this.props.books})
    }

    changeQuery = (query) => {
        if(query === ''){
            this.setState({books: this.props.books})
        }
        this.setState({query : query})

    }

    updateQuery = (query) => {
        const match = new RegExp(escapeRegExp(query), 'i')
        if(query){
            this.setState({query : query})
            BooksAPI.search(this.state.query, 8).then((books) => {
                var isArray = require('isarray')
                if(isArray(books)){
                    var mergeJSON = require("merge-json")
                    let filteredBooks = this.props.books.filter((book) => match.test(book.title))
                    let idFilteredBooks = filteredBooks.map(book => book.id)
                    books = books.filter((books) => ((idFilteredBooks.indexOf(books.id) === -1)?(books):(false)))
                    books = mergeJSON.merge(filteredBooks, books)
                    books = books.filter((book) => match.test(book.title)).sort(sortBy('tittle'))
                    this.setState({books: books})
                }
            })
        } else {
            this.setState({
                books: this.props.books,
                query: ''
            })
        }
    }

    render () {
        const { onChangeShelf } = this.props
        const { query, books } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search"
                        >Close</Link>
                    <div className="search-books-input-wrapper">
                        <div>
                            <DebounceInput
                                minLength={2}
                                placeholder="Search by title"
                                type="text"
                                debounceTimeout={300}
                                onKeyPress={(event) => this.updateQuery(event.target.value)}
                                onChange={(event) => this.changeQuery(event.target.value)}
                                value={query}
                            />
                        </div>
                    </div>
                </div>
                <div className="search-books-results">
                    <ListBooks books={books} onChangeShelf={onChangeShelf}/>
                </div>
            </div>
        )
    }
}
export default SearchBooks
