import React, { Component } from 'react';
import Book from './Book.js';

class BookShelf extends Component {
  state = { id: '', category: '' };
  onCategoryChange = (id, newCategory) => {
    this.setState({ id: id, category: newCategory }, () => {
      console.log('BookShelf id ->', this.state.id);
      console.log('BookShelf category ->', this.state.category);
      this.props.onCategoryChange(this.state.id, this.state.category);
    });
  };

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
