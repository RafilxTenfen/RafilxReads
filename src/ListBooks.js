import React from 'react';
import PropTypes from 'prop-types'

const ListBooks  =  (props) => {

    const {books, onChangeShelf} = props

    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover"
                                     style={{
                                         backgroundImage: `url(${(book)?(book.imageLinks.smallThumbnail):(book.imageLinks.thumbnail)})`
                                     }}>
                                    <div className="book-shelf-changer">
                                        <select id="shelf"
                                                value={book.shelf || 'none'}
                                                onChange={(event) =>
                                                    onChangeShelf(book, (event.target.value !== "none") ? event.target.value : false)}>
                                            <option value="none" disabled>Move to</option>
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
export default ListBooks

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf : PropTypes.func.isRequired
}