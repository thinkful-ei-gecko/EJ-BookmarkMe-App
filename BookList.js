'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars
const BookList = (function () {

    function generateItemElement(item) {

        let itemTitle = `<span class="book-title">${item.title}</span>`;

        let bookmarkImg = item.view ?
            `https://github.com/thinkful-ei-gecko/EJ-BookmarkMe-App/blob/master/Images/bookmark.png?raw=true` : `https://raw.githubusercontent.com/thinkful-ei-gecko/EJ-BookmarkMe-App/master/Images/bookmark%20(1).png`

        let show = item.view ? 'hide' : 'itemUrl';
        let showDesc = item.view ? 'hide' : 'itemDescription';

        let ifDesc = item.desc ?
            `<p class="${showDesc}">Description: ${item.desc}</p>` : `<p class="${showDesc}">Description: No Description</p>`

        let ifRating = item.rating ?
            `<p class="itemRating">Rating: ${item.rating}/5</p>` : `<p class="itemRating">Rating: No Rating</p>`

        return `<li class="book js-item-element" data-item-id="${item.id}">
        <img rel="stylesheet" src="${bookmarkImg}" class="bookmarkIcon">
        ${itemTitle}
        <div class="book-item-controls">
        ${ifRating}
        <br>
        ${ifDesc}
        <a href="${item.url}" class="${show}">Link: ${item.url}</a>
        <div class="buttons">
        <button class="book-item-delete js-item-delete">
            <span class="button-label">Delete</span>
        </button>
        <button class="book-item-view js-item-view"
            <span class="button-label">View</span>
         </button>
         </div>
        </div>
      </li>`;
    }

    function generateShoppingItemsString(booklist) {
        return booklist.map(item => generateItemElement(item)).join('');
    }

    function render() {
        // Filter item list if store prop is true by item.checked === false
        //******************************THIS IS REPLACED************************** */
        let items = [...BookStore.items];
        let filterItems = items.filter(item => {
            if (item === undefined) {
                return null;
            }
            return item;
        })


        let selectedValue = $('select').children("option:selected").val();

        if (selectedValue === undefined) {
            selectedValue = 'default'
        }

        if (selectedValue !== 'default') {
            filterItems = BookStore.filterBy(selectedValue);
        }

        if (filterItems === undefined || filterItems.length === 0) {
            return $('.js-library').html(`<h2>Add some books to your bookmark list!</h2>`);
        } else {
            const shoppingListItemsString = generateShoppingItemsString(filterItems);
            // insert that HTML into the DOM
            $('.js-library').html(shoppingListItemsString);
        }

        // render the shopping list in the DOM
        console.log('`render` ran');
    }

    function handleNewItemSubmit() {
        $('.addBookForm').on('submit', '#js-book-list-form', function (event) {
            console.log('form submitted');
            event.preventDefault();
            const newItemTitle = $('.js-book-title-entry').val();
            const newItemUrl = $('.js-book-url').val();
            const newItemDesc = $('.js-book-desc').val();
            const newItemRating = $('.js-book-rating').val();

            const newItem = {
                title: newItemTitle,
                url: newItemUrl
            }

            if (newItemDesc !== "") {
                newItem.desc = newItemDesc;
            }

            if (newItemRating !== "") {
                newItem.rating = newItemRating;
            }

            $('.js-book-title-entry').val('');
            $('.js-book-url').val('');
            $('.js-book-desc').val('');
            $('.js-book-rating').val('');

            if (!newItemTitle || !newItemUrl) {
                alert('Sorry please input an object')
                return;
            }

            console.log(newItem.desc);
            console.log(newItem.rating);


            //creating a new item and adding it to store
            api.createItem(newItem)
                .then(res => res.json())
                .then((newItem) => {
                    $('.addBookForm').html(`
                    <button class="addABook js-addBook">
                        <span>Add a Book</span>
                    </button>
                    <select class="filterBtn js-filter-option">
                        <option value="default">Default</option>
                        <option value="1">1 <span>Star</span></option>
                        <option value="2">2 <span>Stars</span></option>
                        <option value="3">3 <span>Stars</span></option>
                        <option value="4">4 <span>Stars</span></option>
                        <option value="5">5 <span>Stars</span></option>
                    </select>
                    `)
                    BookStore.addItem(newItem);
                    render();
                }).catch(err => {
                    alert('Please insert valid statements');
                });
        });
    }

    function getItemIdFromElement(item) {
        return $(item)
            .closest('.js-item-element')
            .data('item-id');
    }

    function handleItemCheckClicked() {
        $('.js-book-list').on('click', '.js-item-toggle', event => {
            const id = getItemIdFromElement(event.currentTarget);
            let tof = BookStore.findById(id);
            api.updateItem(id, {
                checked: !tof.checked
            }).then(() => {
                BookStore.findAndUpdate(id, {
                    checked: !tof.checked
                });
                render();
            }).catch(err => {
                BookStore.getError(err);
            });
        });
    }

    function handleDeleteItemClicked() {
        // like in `handleItemCheckClicked`, we use event delegation
        $('.js-library').on('click', '.js-item-delete', event => {
            // get the index of the item in store.items
            const id = getItemIdFromElement(event.currentTarget);
            // delete the item
            console.log(id);
            console.log('delete button was clicked')
            api.deleteItem(id).then(() => {
                BookStore.findAndDelete(id);
                render();
            });
        });
    }

    function handleEditBookItemSubmit() {
        $('.js-book-list').on('submit', '.js-edit-item', event => {
            event.preventDefault();
            const id = getItemIdFromElement(event.currentTarget);
            const itemName = $(event.currentTarget).find('.book-item').val();
            console.log(BookStore.findAndUpdate(id, itemName));
            store.setItemIsEditing(id, false);
            api.updateItem(id, {
                desc: itemName
            }).then(() => {
                store.findAndUpdate(id, {
                    desc: itemName
                });
                render();
            }).catch(err => {
                BookStore.getError(err);
            });
        });
    }

    function handleAddNewBook() {
        $('.addBookForm').on('click', '.js-addBook', event => {
            BookStore.AddNewBook();
            render();
        });

    }

    function handleViewClicked() {
        $('.js-library').on('click', '.js-item-view', event => {
            const id = getItemIdFromElement(event.currentTarget);
            let currentObject = BookStore.findById(id);

            BookStore.ViewClicked(currentObject);
            render();
        })
    }

    function handleFilterBy() {
        $('select').change(event => {
            let filter = $('select').children("option:selected").val();
            console.log(filter);
            render();
        })
    }

    function handleCancelClicked() {
        $('.addBookForm').on('click', '.cancel', event => {
            BookStore.CancelClicked();
            render();
        })
    }

    function bindEventListeners() {
        handleNewItemSubmit();
        handleItemCheckClicked();
        handleDeleteItemClicked();
        handleEditBookItemSubmit();
        handleAddNewBook();
        handleViewClicked();
        handleFilterBy();
        handleCancelClicked();
    }

    // This object contains the only exposed methods from this module:
    return {
        render: render,
        bindEventListeners: bindEventListeners,
        handleEditBookItemSubmit
    };
}());