import React, {Component} from 'react';
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class BookCase extends Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            })
        })
    }

    updateBooksShelf = (book, shelf) => {
        if(shelf){
            BooksAPI.update(book, shelf).then(
                BooksAPI.getAll().then((books) => {
                    this.setState({
                        books: books
                    })
                })
            )
        }
    }

    render() {

        return (
                <div className="list-books">
                    <Route exact path="/" render={() => (
                        <div>
                            <div className="list-books-title">
                                <h1>Rafilx Reads</h1>
                            </div>
                            <div className="list-books-content">
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <ListBooks
                                        books={this.state.books.filter((b) => b.shelf === 'currentlyReading')}
                                        onChangeShelf={this.updateBooksShelf}
                                    />
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want To Read</h2>
                                    <ListBooks
                                        books={this.state.books.filter((b) => b.shelf === 'wantToRead')}
                                        onChangeShelf={this.updateBooksShelf}
                                    />
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <ListBooks
                                        books={this.state.books.filter((b) => b.shelf === 'read')}
                                        onChangeShelf={this.updateBooksShelf}
                                    />
                                </div>
                            </div>
                            <div className="open-search">
                                <Link
                                    to="/search"
                                >Add a book</Link>
                            </div>
                        </div>
                    )}/>
                    <Route path="/search" render={() => (
                        <SearchBooks
                         books={this.state.books}
                         onChangeShelf={this.updateBooksShelf}
                        />
                    )}/>

                </div>
        )
    }

}

export default BookCase
