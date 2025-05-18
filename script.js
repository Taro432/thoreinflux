const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');
const audio = document.getElementById('success-sound');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the form from submitting the usual way

  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      successMessage.style.display = 'block';
      successMessage.style.color = '#0f0';
      form.reset();

      // Play the sound on success
      if (audio) {
        audio.play().catch(err => {
          console.warn('Autoplay failed:', err);
        });
      }
    } else {
      successMessage.textContent = 'Something went wrong. Please try again.';
      successMessage.style.color = 'red';
      successMessage.style.display = 'block';
    }
  }).catch(() => {
    successMessage.textContent = 'Something went wrong. Please try again.';
    successMessage.style.color = 'red';
    successMessage.style.display = 'block';
  });
});
