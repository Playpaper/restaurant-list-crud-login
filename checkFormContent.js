// define generatePassword function
function checkFormContent(form) {

  if(form.name === '') {
    return '請輸入 : 餐廳中文名稱'
  }

  if (form.name_en === '') {
    return '請輸入 : 餐廳英文名稱'
  }

  if (form.category === 'All') {
    return '請選擇 : 餐廳種類'
  }
  
  if (form.phone === '') {
    return '請輸入 : 餐廳電話'
  }

  if (form.rating === '') {
    return '請輸入 : 餐廳評分'
  }

  if (!parseFloat(form.rating, 10)) {
    return '餐廳評分須為數字'
  }

  if (form.location === '') {
    return '請輸入 : 餐廳地址'
  }

  if (form.google_map === '') {
    return '請輸入 : 餐廳google map'
  }

  if (form.image === '') {
    return '請輸入 : 餐廳照片網址'
  }

  if (form.description === '') {
    return '請輸入 : 餐廳敘述'
  }

  return 'OK'
}

module.exports = checkFormContent