import React, { Component } from 'react';

class Book extends Component {
  state = {
    category: '',
    bookTitle: '',
  };

  handleChange = event => {
    this.setState({
      category: event.target.value,
      bookTitle: this.props.bookTitle,
    });
    this.props.onCategoryChange(this.props.bookTitle, event.target.value);
    console.log('Book title ->', this.state.bookTitle);
    console.log('Book category ->', this.state.category);
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
                <option value="move" disabled>
                  Move to...
                </option>
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
