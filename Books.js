'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const Item = (function(){

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating
    };
  };

  return {
    validateName,
    create,
  };
  
}());