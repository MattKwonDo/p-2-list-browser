'use strict'

const api = require('./api.js') // has ajax codes that connect to the backend
const ui = require('./ui.js') // has the code for displaying the front end after connecting to the backend
// const getFormFields = require(`../../../lib/get-form-fields`) // has the code that gets the form data

// read
// if you do this as a fat arrow function, you can't read 'this'
const onGetItems = (event) => {
  event.preventDefault()
  api.getItems()
    .then(ui.getItemsSuccess)
    .catch(ui.getItemsFailure)
}
// const reGetItems = () => {
//   api.getItems()
//     .then(ui.getItemsSuccess)
//     .catch(ui.getItemsFailure)
// }

// create
// if you do this as a fat arrow function, you can't read 'this'
const onCreateItem = function (event) {
  event.preventDefault()
  const nameValue = document.getElementById('new-item-input').value
  // console.log('field input :' + nameValue)
  const ajaxSend = {
    'new_item': {
      'name': nameValue // this should be from the form
    }
  }
  api.createItem(ajaxSend)
    .then(ui.createItemsSuccess)
    .catch(ui.createItemsFailure)
// refresh the page with all data
    // .done(reGetItems())
}

// update
// if you do this as a fat arrow function, you can't read 'this'
const onUpdateItem = function (event) {
  event.preventDefault()
  // console.log('event: ')
  // console.log(event)
  const id = event.target.id
  // console.log('id: ' + id)
  const item = 'input-' + event.target.id
  // console.log('item: ' + item)
  // console.log(this.id)
  // console.log(this)
  // console.log(document)
  const nameValue = document.getElementById(item).value // this needs to be the id of the input field
  // console.log('field input :' + nameValue)
  const ajaxSend = {
    'new_item': {
      'name': nameValue // this should be from the form
    }
  }
  api.updateItem(id, ajaxSend)
    .then(ui.updateItemsSuccess)
    .catch(ui.updateItemsFailure)
}

// delete
// if you do this as a fat arrow function, you can't read 'this'
const onDeleteItems = () => {
  event.preventDefault()
  const id = event.target.id
  api.deleteItems(id)
    .then(ui.deleteItemsSuccess(id))
    .catch(ui.deleteItemsFailure)
}

// hide change pw text
const onClearText = () => {
  // clear sign-up errors and text
  $('.errors-change-password').text('')
  // $('#change-password').find('input:password, input:password, select, textarea').val('')
  $('#change-password').trigger('reset')
}

const addHandlers = () => {
// create
  $('#create-item').on('submit', onCreateItem)
  // $('#create-item').delay(1000).fadeIn(onGetItems())
// read
  $('#getItemsButton').on('click', onGetItems)
// update
  $('.content').on('submit', '.update-item', onUpdateItem)
// delete
  // $('#clearItemsButton').on('click', onClearItems)
  $('.content').on('click', '.remove-item', onDeleteItems)
// hide change pw text $('.errors-change-password').text('Woohoo! Password changed successfully!')
  $('#show-screen').on('click', onClearText)
}

module.exports = {
  addHandlers
}
