// Stock Notify functions



window.notifyButtons = () => {
  console.log('Notification Initiated');
  document.querySelectorAll('.--inline-notify-stock-button').forEach((button)=>{
    button.addEventListener('click', ()=>{
      handleNotifyFormSubmit(button)
    })
  })
}

function handleNotifyFormSubmit(button) {
      // let notfify_form_wrapper = document.querySelector('.--notfify-form-wrapper');
      let notfify_form_wrapper = button.closest('.--notfify-form-wrapper');


if (!notfify_form_wrapper) return; 
  
  let company_id = notfify_form_wrapper.dataset.companyId;
  let variant_id = notfify_form_wrapper.dataset.variantId;
  let errorEl = notfify_form_wrapper.querySelector(".error-msg")
  console.log("Company ID:", company_id);
      
      let email = notfify_form_wrapper.querySelector('#notification-email').value
      let isValid = validateEmail(email)
      console.log("Company ID:", company_id); 
      console.log("Email:", email); 
      console.log("Email Vailidity:", isValid); 


      if(!company_id || company_id == null || company_id === '' || company_id.length < 1) {
        return
      }
      if(isValid) {
        errorEl.innerHTML = ""
        callApi(email,company_id,variant_id,notfify_form_wrapper)
      } else {
        errorEl.innerHTML = "Please Enter a Valid Email"
      }
    }
   function validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
   function  callApi(email,company_id,variant_id,notfify_form_wrapper) {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          revision: '2024-05-15',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            type: 'back-in-stock-subscription',
            attributes: {
              channels: ['EMAIL'],
              profile: {data: {type: 'profile', attributes: {email: email}}}
            },
            relationships: {
              variant: {
                data: {
                  type: 'catalog-variant',
                  id: '$shopify:::$default:::'+variant_id
                }
              }
            }
          }
        })
      };

      fetch(`https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${company_id}`, options)
      .then(response => {
        console.log("klaviyo response", response)
      })
      .catch(err => {
        console.error("klaviyo error: ", err)
      })
      .finally(() => {
        notfify_form_wrapper.querySelector('#notification-email').classList.add('hidden');
        notfify_form_wrapper.querySelector('button.--inline-notify-stock-button').classList.add('hidden');
        notfify_form_wrapper.querySelector('.--notify_me_disclaimer_message').classList.add('hidden');
        notfify_form_wrapper.querySelector(".success-msg").classList.add('grey-box');
        notfify_form_wrapper.querySelector(".success-msg").innerHTML = "Thank you! We will email you if this item becomes available."
         // this.successEl.innerHTML = this.dataset.successMsg
        // this.successEl.innerHTML = "{{ section.settings.success_message }}";
        // this.formgroup.classList.add('hidden');
      })



    }
   
    document.addEventListener('DOMContentLoaded', () => {
  if (typeof notifyButtons === 'function') {
    notifyButtons();
  }
});