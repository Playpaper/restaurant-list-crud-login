// Validation when submit form ( new / edit )
const submitButton = document.querySelector('#btn-submit')
const form = document.querySelector('#form')

submitButton.addEventListener('click', function onSubmitButtonClicked(e) {
  form.classList.add('was-validated')
})

// const submitButton = document.querySelector('#submit-button')
// submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
//   form.classList.add('was-validated')
// })