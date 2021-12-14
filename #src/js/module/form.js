const mainForm = document.forms.main;


mainForm.addEventListener('submit', formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  let error = formValidate(mainForm);

  const formData = new FormData(mainForm);
  const values = Object.fromEntries(formData.entries());

  console.log('v5', values);
  
  if (error === 0) {
    mainForm.reset();
    uiSlider1.noUiSlider.reset();
    uiSlider2.noUiSlider.reset();    
  }
  
}

function formValidate(mainForm) {
  let error = 0;
  let formReq = document.querySelectorAll('._req');  

  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index];
    
    formRemoveError(input);
    if (input.value === '') {
      formAddError(input);
      error++;
    }

    // if (input.classList.contains('._email')) {
    //   if (email_test(input)) {
    //     formAddError(input);
    //     error++;
    //   } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
    //     formAddError(input);
    //     error++;
    //   } else {
    //     if (input.value === '') {
    //       formAddError(input);
    //       error++;
    //     }
    //   }
    // }
    
  }
  return error;
}
function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
}
function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
}
// function email_test(input) {
// 	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
// }