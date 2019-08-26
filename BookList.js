'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars
const BookList = (function () {

    function generateItemElement(item) {
        // const checkedClass = item.checked ? 'shopping-item__checked' : '';
        // const editBtnStatus = item.checked ? 'disabled' : '';

        //`<span class="shopping-item ${checkedClass}">${item.name}</span>`; this is for added feature (line 13)
        let itemTitle = `<span class="book-title">${item.title}</span>`;
        // if (item.isEditing) {
        //   itemTitle = `
        //     <form class="js-edit-item">
        //       <input class="shopping-item" type="text" value="${item.title}" />
        //     </form>
        //   `;
        // }

        //<button class="shopping-item-edit js-item-edit" ${editBtnStatus}> (line 28)

        return `<li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
        <p>${item.desc}</p>
        <p>${item.rating}</p>
        <a>${item.url}</a>
          <button class="shopping-item-edit js-item-edit"
            <span class="button-label">edit</span>
          </button>
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
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
        let filterItems = items.filter(item=>{
            if (item === undefined) {
                return null;
            }
            return item;
        })

        if (BookStore.searchTerm) {
            items = items.filter(item => item.name.includes(BookStore.searchTerm));
        }

        if (filterItems === undefined || filterItems.length === 0){
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
        $('#js-shopping-list-form').submit(function (event) {
            event.preventDefault();
            const newItemTitle = $('.js-shopping-list-entry').val();
            const newItemUrl = $('.js-book-url').val();
            const newItemDesc = $('.js-book-desc').val();
            const newItemRating = $('.js-book-rating').val();
            $('.js-shopping-list-entry').val('');
            $('.js-book-url').val('');
            $('.js-book-desc').val('');
            $('.js-book-rating').val('');

            if (newItemTitle === undefined || newItemUrl === undefined) {
                alert('Sorry please input an object')
            }

            //creating a new item and adding it to store
            api.createItem(newItemTitle, newItemUrl, newItemDesc, newItemRating)
                .then(res => res.json())
                .then((newItemTitle, newItemUrl, newItemDesc, newItemRating) => {
                    BookStore.addItem(newItemTitle, newItemUrl, newItemDesc, newItemRating);
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
        $('.js-shopping-list').on('click', '.js-item-toggle', event => {
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

    function handleEditShoppingItemSubmit() {
        $('.js-shopping-list').on('submit', '.js-edit-item', event => {
            store.clearError();
            event.preventDefault();
            const id = getItemIdFromElement(event.currentTarget);
            const itemName = $(event.currentTarget).find('.shopping-item').val();
            console.log(BookStore.findAndUpdate(id, itemName));
            store.setItemIsEditing(id, false);
            api.updateItem(id, {
                name: itemName
            }).then(() => {
                store.findAndUpdate(id, {
                    name: itemName
                });
                render();
            }).catch(err => {
                BookStore.getError(err);
            });
        });
    }

    function handleToggleFilterClick() {
        $('.js-filter-checked').click(() => {
            BookStore.toggleCheckedFilter();
            render();
        });
    }

    function handleShoppingListSearch() {
        $('.js-shopping-list-search-entry').on('keyup', event => {
            const val = $(event.currentTarget).val();
            BookStore.setSearchTerm(val);
            render();
        });
    }

    function handleItemStartEditing() {
        $('.js-shopping-list').on('click', '.js-item-edit', event => {
            const id = getItemIdFromElement(event.target);
            BookStore.setItemIsEditing(id, true);
            render();
        });
    }

    function bindEventListeners() {
        handleNewItemSubmit();
        handleItemCheckClicked();
        handleDeleteItemClicked();
        handleEditShoppingItemSubmit();
        handleToggleFilterClick();
        handleShoppingListSearch();
        handleItemStartEditing();
    }

    // This object contains the only exposed methods from this module:
    return {
        render: render,
        bindEventListeners: bindEventListeners,
        handleEditShoppingItemSubmit
    };
}());