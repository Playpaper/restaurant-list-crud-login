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
