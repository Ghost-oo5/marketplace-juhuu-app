$(document).ready(function () {
  $("#contact").validate({
    rules: {
      vorname: "required",
      nachname: "required",
      subject: "required",
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
        minlength: 5,
      },
    },
    messages: {
      vorname: "Please enter your Vorname",
      nachname: "Please enter your Nachname",
      subject: "Please enter your Firma",
      email: "Please enter a valid email address",
      message: "Please enter a message",
    },

    submitHandler: function (form) {
      function sendMail() {
        // Verify reCAPTCHA
        var recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
          document.querySelector(".error-message").textContent = "Please verify that you are human.";
          return;
        }
    
        var params = {
          vorname: document.getElementById("vorname").value,
          nachname: document.getElementById("nachname").value,
          email: document.getElementById("email").value,
          firma: document.getElementById("firma").value,
          message: document.getElementById("message").value,
        };
    
        const serviceID = "test_service_id";
        const templateID = "template_icbiouh";
    
        emailjs.send(serviceID, templateID, params)
          .then(res => {
            // Clear form fields
            document.getElementById("vorname").value = "";
            document.getElementById("nachname").value = "";
            document.getElementById("email").value = "";
            document.getElementById("firma").value = "";
            document.getElementById("message").value = "";
    
            // Reset reCAPTCHA
            grecaptcha.reset();
    
            // Show success popup
            document.querySelector(".success-popup").style.display = "block";
    
            // Clear error message
            document.querySelector(".error-message").textContent = "";
          })
          .catch(err => {
            console.log(err);
            document.querySelector(".error-message").textContent = "An error occurred. Please try again.";
          });
      }
      sendMail();
    }



  });
});




  

