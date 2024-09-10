$(document).ready(function () {

  var scriptlink = "https://script.google.com/macros/s/AKfycbyOB3RD4pPoJOou4N3dx8rVvex_H8hzevcn0QlouNOdu3Y7sjhscBTuXkjVslMU9lFitw/exec";
  // Set global toastr options
  toastr.options = {
    progressBar: true,
    closeButton: true,
    extendedTimeOut: 1000 // Extended timeout for user interaction
  };

  // Utility function to show toast notifications
  function showToast(type, message, customOptions = {}) {
    const originalOptions = { ...toastr.options };
    toastr.options = { ...originalOptions, ...customOptions };

    switch (type) {
      case 'success':
        toastr.success(message);
        break;
      case 'error':
        toastr.error(message);
        break;
      case 'info':
        toastr.info(message);
        break;
      case 'warning':
        toastr.warning(message);
        break;
      default:
        console.error('Unknown toast type');
    }

    toastr.options = originalOptions; // Restore original options
  }

  $('form').on('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Collect form data
    var formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    };

    // Show a loading toast
    showToast('info', 'Submitting your response...', {
      progressBar: false,
      closeButton: false,
      timeOut: 0,
      extendedTimeOut: 0
    });

    // Send the POST request using fetch
    fetch(scriptlink, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(formData) // Send the form data as JSON
    })
    .then(response => response.json()) // Parse the JSON from the response
    .then(data => {
      toastr.clear(); // Clear the loading toast
      if (data.result === 'success') {
        showToast('success', 'Success! Thank you for your response!', {
          timeOut: 4000 // 4-second delay for success messages
        });
        // Clear the form fields after successful submission
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      } else {
        showToast('error', 'Oops unexpected error: ' + data.message, {
          timeOut: 4000 // 4-second delay for error messages
        });
      }
    })
    .catch(error => {
      toastr.clear(); // Clear the loading toast
      showToast('error', 'Request failed: ' + error.message, {
        timeOut: 4000 // 4-second delay for error messages
      });
    });
  });
});