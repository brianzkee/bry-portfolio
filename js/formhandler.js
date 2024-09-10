$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Collect form data
    var formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    };

    // Send the POST request using fetch
    fetch('https://script.google.com/macros/s/AKfycbyOB3RD4pPoJOou4N3dx8rVvex_H8hzevcn0QlouNOdu3Y7sjhscBTuXkjVslMU9lFitw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(formData) // Send the form data as JSON
    })
    .then(response => response.json()) // Parse the JSON from the response
    .then(data => {
      if (data.result === 'success') {
        alert('Form submitted successfully!');
        // Clear the form fields after successful submission
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');
      } else {
        alert('Error submitting the form: ' + data.message);
      }
    })
    .catch(error => {
      alert('Request failed: ' + error.message);
    });
  });
});
