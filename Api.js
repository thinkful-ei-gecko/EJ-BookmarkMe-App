'use strict';

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/EJ/bookmarks';

  function getItems() {
    return fetch(`${BASE_URL}`);
  }

  function createItem(object) {
    const newItem = {
      title: object.title,
      url: object.url,
      desc: object.desc,
      rating: object.rating
    };

    return fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem)
    });

  }

  function updateItem(id, updateData){
    return fetch(
      `${BASE_URL}/${id}`, 
      {method : 'PATCH', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(updateData)
      })}
  

  function deleteItem(id, updateData){
    return fetch(
      `${BASE_URL}/${id}`, 
      {method : 'DELETE', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(updateData)
      })}


  return {
    getItems,
    BASE_URL,
    createItem,
    updateItem,
    deleteItem
  };
}());