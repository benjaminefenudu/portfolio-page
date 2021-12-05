// Enable submit button when enquiry text area is focused on
const enableSubmitButton = (event) => {
  event.preventDefault();
  document.getElementById("submit_button").disabled = false;
};

// Disabling form submissions if there are invalid fields
const bootstrapFormValidation = function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
        event.preventDefault();

        // Show modal if form is valid
        if (form.checkValidity()) {
          const myModal = new bootstrap.Modal(
            document.getElementById("exampleModal"),
            {
              keyboard: true,
            }
          );
          getFormContent();
          myModal.show();
        }
      },
      false
    );
  });
};
bootstrapFormValidation();

// Get modal content
const getFormContent = () => {
  const form = document.getElementById("form");
  document.getElementById("modal_fullname").innerHTML = form.fullname.value;
  document.getElementById("modal_email").innerHTML = form.email.value;
  document.getElementById("modal_location").innerHTML = form.location.value;
  document.getElementById("modal_gender").innerHTML = form.gender.value;
  document.getElementById("modal_phoneNumber").innerHTML =
    form.phoneNumber.value;
  document.getElementById("modal_enquiries").innerHTML = form.enquiry.value;
};

// Submit enquiry

const submitEnquiry = () => {
  const form = document.getElementById("form");
  const fullname = form.fullname.value;
  const email = form.email.value;
  const location = form.location.value;
  const gender = form.gender.value;
  const phoneNumber = form.enquiry.value;
  const enquiry = document.getElementById("modal_enquiries").value;
  const formDetails = {
    fullname,
    email,
    location,
    gender,
    phoneNumber,
    enquiry,
  };

  // Put the object into local storage
  localStorage.setItem("formDetails", JSON.stringify(formDetails));

  // Retrieve the object from storage
  const retrievedObject = localStorage.getItem("formDetails");
  console.log("retrievedObject: ", JSON.parse(retrievedObject));

  // Post data to backend API
  postData(
    "https://portfolio-page-1-default-rtdb.firebaseio.com/enquiry.json",
    formDetails
  ).then((data) => {
    console.log(data);
    postSuccessModal();
  });
};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  return response.json();
}

const postSuccessModal = () => {
  console.log("Message sent");
  window.location = document.URL;
};
