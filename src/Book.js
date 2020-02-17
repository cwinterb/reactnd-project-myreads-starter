import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI.js';

class Book extends Component {
  getBook = id => {
    BooksAPI.get(id).then(book => {
      console.log(book);
      return book;
    });
  };

  state = {
    category: '',
    id: '',
  };

  handleChange = event => {
    this.setState(
      {
        category: event.target.value,
        id: this.props.id,
      },
      () => {
        console.log(this.state.category);
        console.log('Book id ->', this.state.id);
        console.log('Book category ->', this.state.category);
        this.props.onCategoryChange(this.state.id, this.state.category);
      },
    );
  };

  render() {
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: this.props.imageHeight,
                backgroundImage: `url(${this.props.imageUrl})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select onChange={this.handleChange}>
                <option value="move">Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.bookTitle}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </div>
    );
  }
}

export default Book;
