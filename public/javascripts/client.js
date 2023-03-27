
const restaurantPanel = document.querySelector('#restaurant-panel')
const restModalBody = document.querySelector('#rest-modal-body')

restaurantPanel.addEventListener('click', (e) => {
  if(e.target.dataset.id){
    console.log(e.target.dataset.id)
    const id = e.target.dataset.id
    document.delete_check_form.action = `/restaurants/${id}?_method=DELETE`
    restModalBody.textContent = e.target.dataset.name
  }
  // const id = e.target.dataset.id
  
  // document.delete_check_form.action = `/restaurants/${id}?_method=DELETE`
})

// document.user_form.action = "register.html";
// form.action = "register.html";
// action = "/restaurants/{{this._id}}?_method=DELETE"
// addEventListener