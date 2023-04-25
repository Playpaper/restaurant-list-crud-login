// Validation when submit form ( new / edit )
const submitButton = document.querySelector('#btn-submit')
const form = document.querySelector('form')

form.addEventListener('submit', function onSubmitButtonClicked(e) {
  if(!form.checkValidity()) {
    e.stopPropagation()
    e.preventDefault()
  }
  form.classList.add('was-validated')
})



// const submitButton = document.querySelector('#submit-button')
// submitButton.addEventListener('click', function onSubmitButtonClicked(event) {
//   form.classList.add('was-validated')
// })