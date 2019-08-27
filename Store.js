'use strict';
/* global Item */
// eslint-disable-next-line no-unused-vars
const BookStore = (function () {

  const addItem = function (object) {
    object.view = true;
    this.items.push(object);
  };

  const findById = function (id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function (id) {
    console.log(id);
    console.log(BookStore.items);
    this.items = this.items.filter(item => item.id !== id)
  };

  const AddNewBook = function () {
    console.log('add a new book clicked');
    $('.addBookForm').html(`
    <form id="js-book-list-form">
    <div class="row1">
      <label for="book-title-entry" class="bookTitleEntry">Book Title</label>
        <input type="text" name="book-title-entry" class="js-book-title-entry"
        placeholder="The Memoirs of Sherlock Holmes" required>
      <label for="book-rating" class="bookRatingEntry">Rating</label>
        <input type="text" name="book-rating" class="js-book-rating" placeholder="4">
    </div>
    <div class="row2">
      <label for="book-desc" class="bookDescEntry">Description</label>
        <input type="text" name="book-desc" class="js-book-desc" placeholder="Story has a predicting ending.">
    </div>
    <div class="row3">
    <label for="book-url" class="bookUrlEntry">Url</label>
        <input type="text" name="book-url" class="js-book-url"
        placeholder="https://openlibrary.org/works/OL262598W/The_Memoirs_of_Sherlock_Holmes" required>
      <button class="submitBtn" type="submit">Add item</button>
    </div>
</form>`);
  }

  const ViewClicked = function (id) {
    console.log('view being clicked')
    console.log(!id.view);
    id.view = !id.view;
  }

  return {
    items: [],
    // hideCheckedItems: false,
    // searchTerm: '',

    addItem,
    findById,
    findAndDelete,
    AddNewBook,
    ViewClicked
    // findAndUpdate,
    // setSearchTerm
  };

}());