import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf : PropTypes.func.isRequired
    }

    render () {

        const {books, onChangeShelf} = this.props

        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover"
                                         style={{
                                             width: 128,
                                             height: 193,
                                             backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                         }}>
                                        <div className="book-shelf-changer">
                                            <select id="shelf"
                                                    value={book.shelf}
                                                    onChange={(event) =>
                                                        onChangeShelf(book, (event.target.value !== "none") ? event.target.value : false)}>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }


}
export default ListBooks