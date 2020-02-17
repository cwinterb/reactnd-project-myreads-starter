import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf.js';
import * as BooksAPI from './BooksAPI.js';

class BooksApp extends React.Component {
  state = {
    books: [],
    search: [],
  };

  fetchBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.fetchBooks();
  }

  updateBook = (id, category) => {
    console.log('state before --> ', this.state);
    BooksAPI.update(id, category).then(() => {
      this.fetchBooks();
    });
    console.log('state after -->', this.state);
  };

  onCategoryChange = (id, category) => {
    console.log('app id --> ', id);
    console.log('app category --> ', category);
    console.log('state --> ', this.state.books);
    this.updateBook(id, category);
  };

  searchBook = query => {
    BooksAPI.search(query).then(results => {
      this.setState({ search: results }, () => console.log(this.state.search));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <button
                  className="close-search"
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Close
                </button>
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={event => this.searchBook(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <BookShelf
                  category="Search Results"
                  onCategoryChange={this.onCategoryChange}
                  books={this.state.search}
                />
              </div>
            </div>
          )}
        />

        <Route
          exact
          path="/"
          render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf
                  category="Currently Reading"
                  onCategoryChange={this.onCategoryChange}
                  books={this.state.books.filter(
                    book => book.shelf === 'currentlyReading',
                  )}
                />
                <BookShelf
                  category="Want to Read"
                  onCategoryChange={this.onCategoryChange}
                  books={this.state.books.filter(
                    book => book.shelf === 'wantToRead',
                  )}
                />
                <BookShelf
                  category="Read"
                  onCategoryChange={this.onCategoryChange}
                  books={this.state.books.filter(book => book.shelf === 'read')}
                />
                <div></div>
              </div>
              <div className="open-search">
                <button
                  onClick={() => {
                    history.push('/search');
                  }}
                >
                  Add a book
                </button>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
