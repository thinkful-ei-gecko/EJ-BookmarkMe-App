'use strict';
/* global Item */
// eslint-disable-next-line no-unused-vars
const BookStore = (function () {

  const addItem = function (object) {
    if (object.url === undefined){
      alert('Please insert valid inputs')
      return null;
    }
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
        <input type="number" name="book-rating" class="js-book-rating" placeholder="1-5">
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
    <button class="cancel"><img class="cancelImg" alt="cancel" src="./Images/circle-cropped.png"</button>
</form>`);
  }

  const CancelClicked = function() {
    $('.addBookForm').html(`<button class="addABook js-addBook">
    <span>Add a Book</span>
</button>
<select class="filterBtn js-filter-option">
    <option value="default">Default</option>
    <option value="1">1 <span>Star</span></option>
    <option value="2">2 <span>Stars</span></option>
    <option value="3">3 <span>Stars</span></option>
    <option value="4">4 <span>Stars</span></option>
    <option value="5">5 <span>Stars</span></option>
</select>`)
  }

  const ViewClicked = function (id) {
    console.log('view being clicked')
    console.log(!id.view);
    id.view = !id.view;
  }

  const filterBy = function (number) {
    let newArray = BookStore.items.filter(item => {
      return item.rating == number
    })
    return newArray
  }

  return {
    items: [],
    // hideCheckedItems: false,
    // searchTerm: '',

    addItem,
    findById,
    findAndDelete,
    AddNewBook,
    ViewClicked,
    filterBy,
    CancelClicked
    // findAndUpdate,
    // setSearchTerm
  };

}());