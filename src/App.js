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
    BooksAPI.getAll().then(async books => {
      this.setState({ books });
      let search = this.state.search;
      let bookStateIds = [];
      books.forEach(book => bookStateIds.push(book.id));
      console.log(bookStateIds);
      const promises = [];
      search.forEach(book => {
        if (bookStateIds.includes(book.id)) {
          promises.push(
            BooksAPI.get(book.id).then(singleBook => {
              book.shelf = singleBook.shelf;
            }),
          );
        }
      });
      await Promise.all(promises);
      this.setState({ search: search });
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

  searchBook = query => {
    query = query.trim();
    if (query.length === 0) {
      this.setState({ search: [] });
    } else {
      let collection = this.state.books;
      let collectionIds = [];
      collection.forEach(book => {
        collectionIds.push(book.id);
      });
      const promises = [];
      BooksAPI.search(query).then(results => {
        if (results.length > 0) {
          results.forEach(async result => {
            if (collectionIds.includes(result.id)) {
              promises.push(
                BooksAPI.get(result.id).then(book => {
                  result.shelf = book.shelf;
                }),
              );
            }
            await Promise.all(promises);
            this.setState({ search: results });
          });
        }
      });
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
