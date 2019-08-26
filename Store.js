'use strict';
/* global Item */
// eslint-disable-next-line no-unused-vars
const BookStore = (function () {
  const addItem = function (title, url, desc, rating) {
    this.items.push(title, url, desc, rating);
  };

  const findById = function (id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id)
  };

  // const setSearchTerm = function (term) {
  //   this.searchTerm = term;
  // };

  // const findAndUpdate = function(id, newData) {
  //   let target = this.findById(id);
  //   console.log(target)
  //   let newItem = Object.assign(target, newData);
  //   console.log(newData);
  //   return newItem;
  // };

  return {
    items: [],
    // hideCheckedItems: false,
    // searchTerm: '',

    addItem,
    findById,
    findAndDelete
    // findAndUpdate,
    // setSearchTerm
  };

}());