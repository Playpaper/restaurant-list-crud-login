
const restaurantPanel = document.querySelector('#restaurant-panel')
const restModalBody = document.querySelector('#rest-modal-body')
// sort
const selectSort = document.querySelector('#select-sort')

// delete check model
restaurantPanel.addEventListener('click', (e) => {
  if(e.target.dataset.id){
    const id = e.target.dataset.id
    document.delete_check_form.action = `/restaurants/${id}?_method=DELETE`
    restModalBody.textContent = e.target.dataset.name
  }
})

selectSort.addEventListener('change', function detectSortChange(e) {
  const searchKeyword = document.querySelector('#search-keyword')
  const selectedCategory = document.querySelector('#search-category')
  const selectedRating = document.querySelector('#search-rating')
  const kind = selectSort.options[selectSort.selectedIndex].dataset.kind
  const sort = selectSort.value
  const keyword = searchKeyword.value
  const category = selectedCategory.value 
  const rating = selectedRating.value
  
  // window.location.href = `/?kind=${kind}&sort=${sort}`
  window.location.href = `/search?keyword=${keyword}&category=${category}&rating=${rating}&kind=${kind}&sort=${sort}`
})

// show category and rating option selected
// function selectedOption() {
//   const selectedCategory = document.querySelector('#search-category')
//   const selectedRating = document.querySelector('#search-rating')

  // const queryString = window.location.search
  // const urlParams = new URLSearchParams(queryString)
  // const category = urlParams.get('category')
  // const rating = urlParams.get('rating')
  
  // selectedCategory.value = category ? category : '所有分類'
  // selectedRating.value = rating ? rating : '所有分數'
// }

// selectedOption()