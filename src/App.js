import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf.js';
import * as BooksAPI from './BooksAPI.js';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <button
                  className="close-search"
                  onClick={() => this.setState({ showSearchPage: false })}
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
          render={() => (
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
                <button>Add a book</button>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
