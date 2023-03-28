function filterRestaurants(restaurants, keyword, category, rating) {

  let filteredData = restaurants.filter(item => item.name.toLowerCase().includes(keyword.trim().toLowerCase()))
  
  // filter name_en
  filteredData = filteredData.length ? filteredData : restaurants.filter(item => item.name_en.toLowerCase().includes(keyword.trim().toLowerCase()))

  console.log('filteredData', filteredData)
  // filter category
  filteredData = (category === 'All') ? filteredData : filteredData.filter(item => item.category === category)

  //filter rating
  filteredData = (rating == 'All') ? filteredData : filteredData.filter(item => item.rating >= Number(rating) )

  return filteredData
}





// function filterRestaurants(restaurantData, keyword, category, rating) {
//   let filterData = restaurantData.filter((data) => {
//     return data.name.toLowerCase().includes(keyword.trim().toLowerCase());
//   });

//   filterData =
//     category === "All"
//       ? filterData
//       : filterData.filter((data) => data.category === category);

//   filterData =
//     rating === "0"
//       ? filterData
//       : filterData.filter((data) => data.rating >= Number(rating));

//   return filterData;
// }

module.exports = filterRestaurants;