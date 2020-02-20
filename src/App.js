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

  getBookShelf = async id => {
    const book = await BooksAPI.get(id);
    return book.shelf;
  };

  fetchBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books }, async () => {
        let searchState = this.state.search;
        let bookStateIds = [];
        this.state.books.forEach(book => bookStateIds.push(book.id));
        const promises = [];
        searchState.forEach(async book => {
          if (bookStateIds.includes(book.id)) {
            promises.push(
              BooksAPI.get(book.id).then(singleBook => {
                let newShelf = singleBook.shelf;
                book.shelf = newShelf;
              }),
            );
          }
        });
        await Promise.all(promises);
        this.setState({ search: searchState });
      });
    });
  }

  componentDidMount() {
    this.fetchBooks();
  }

  updateBook = async (id, category) => {
    await BooksAPI.update(id, category).then(() => {
      this.fetchBooks();
    });
  };

  onCategoryChange = (id, category) => {
    this.updateBook(id, category);
  };

  searchBook = async query => {
    query = query.trim();
    if (query.length > 0) {
      BooksAPI.search(query).then(async results => {
        let newResults = await Promise.all(
          results.map(async book => ({
            ...book,
            shelf: await this.getBookShelf(book.id),
          })),
        );
        newResults.length > 0
          ? this.setState({ search: newResults })
          : this.setState({ search: [] });
      });
    } else {
      this.setState({ search: [] });
    }
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
