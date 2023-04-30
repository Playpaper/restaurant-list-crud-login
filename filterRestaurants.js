function filterRestaurants(restaurants, keyword, category, rating) {

  let filteredData = restaurants.filter(item => item.name.toLowerCase().includes(keyword.trim().toLowerCase()))
  
  // filter name_en
  filteredData = filteredData.length ? filteredData : restaurants.filter(item => item.name_en.toLowerCase().includes(keyword.trim().toLowerCase()))

  // filter category
  filteredData = (category === '所有分類') ? filteredData : filteredData.filter(item => item.category === category)

  //filter rating
  filteredData = (rating == '0') ? filteredData : filteredData.filter(item => item.rating >= Number(rating) )

  return filteredData
}

module.exports = filterRestaurants;