'use strict';
/* global shoppingList, store, Item */
// eslint-disable-next-line no-unused-vars
$(document).ready(function () {
  BookList.bindEventListeners();
  BookList.render();

  api.getItems()
    .then(res => res.json())
    .then((items) => {
      items.forEach((item) => BookStore.addItem(item));
      BookList.render();
    });

  if (BookStore.items.length !== 0) {
    if (id === undefined) {
      return null;
    } else {
      api.getItems()
        .then(res => res.json())
        .then(() => {
          BookList.handleEditBookItemSubmit()
            .then(res => res.json())
            .then(() => console.log('updated!'))
            .catch(error => console.log(error + ' No books in the bookmarks list yet'))
        });
    }
  }
});