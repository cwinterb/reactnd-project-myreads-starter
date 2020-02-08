import React, { Component } from 'react';
import Book from './Book.js';

class BookShelf extends Component {
  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map(book => (
                <li>
                  <Book
                    bookTitle={book.title}
                    author={book.author}
                    imageUrl={book.imageUrl}
                    imageHeight={book.imageHeight}
                  ></Book>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
