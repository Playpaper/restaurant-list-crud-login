
const restaurantPanel = document.querySelector('#restaurant-panel')
const restModalBody = document.querySelector('#rest-modal-body')

// delete check model
restaurantPanel.addEventListener('click', (e) => {
  if(e.target.dataset.id){
    console.log(e.target.dataset.id)
    const id = e.target.dataset.id
    document.delete_check_form.action = `/restaurants/${id}?_method=DELETE`
    restModalBody.textContent = e.target.dataset.name
  }
})

// show category and rating option selected
function selectedOption() {
  const selectedCategory = document.querySelector('#search-category')
  const selectedRating = document.querySelector('#search-rating')
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)

  const category = urlParams.get('category')
  const rating = urlParams.get('rating')
  
  selectedCategory.value = category ? category : 'All'
  selectedRating.value = rating ? rating : 'All'
}

selectedOption()