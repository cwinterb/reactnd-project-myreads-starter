import React, { Component } from 'react';
import Book from './Book.js';

class BookShelf extends Component {
  state = { bookTitle: '', category: '' };
  onCategoryChange = (bookTitle, newCategory) => {
    this.setState({ bookTitle: bookTitle, category: newCategory }, () => {
      console.log('BookShelf book ->', this.state.bookTitle);
      console.log('BookShelf category ->', this.state.category);
      this.props.onCategoryChange(this.state.bookTitle, this.state.category);
    });
  };

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.map(book => (
                <li key={book.id}>
                  <Book
                    bookTitle={book.title}
                    author={book.author}
                    imageUrl={book.imageUrl}
                    imageHeight={book.imageHeight}
                    onCategoryChange={this.onCategoryChange}
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
