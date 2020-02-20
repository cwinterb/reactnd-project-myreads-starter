import React, { Component } from 'react';
import Book from './Book.js';
// import * as BooksAPI from './BooksAPI.js';

class BookShelf extends Component {
  state = { id: '', category: '' };
  onCategoryChange = (id, newCategory) => {
    this.setState({ id: id, category: newCategory }, () => {
      this.props.onCategoryChange(this.state.id, this.state.category);
    });
  };

  // getBookShelf = id => {
  //   // BooksAPI.get(id).then(book => this.setState({}));
  //   // BooksAPI.get(id).then(book => console.log(book));
  // };

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.category}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.length > 0 &&
                this.props.books.map(book => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      bookTitle={book.title}
                      author={book.authors}
                      shelf={book.shelf || 'none'}
                      // shelf={this.getBookShelf(book.id)}
                      imageUrl={book.imageLinks}
                      onCategoryChange={this.onCategoryChange}
                    ></Book>
                  </li>
                ))}
              {this.props.books.length < 1 && <div>No results found</div>}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelf;
