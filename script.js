<script>
  // Get elements from the DOM
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-msg');
  const successAudio = document.getElementById('success-sound');
  const backgroundAudio = document.getElementById('background-sound');

  // Autoplay background music 
  document.addEventListener('click', () => {
  window.addEventListener('load', () => {
  if (backgroundAudio && backgroundAudio.paused) {
    backgroundAudio.volume = 0.5;
    backgroundAudio.play().catch(err => {
      console.warn('Background music autoplay failed:', err);
    });
  }
});
  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form behavior

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
        successMessage.textContent = 'Thank you for your message!';
        form.reset();

        if (successAudio) {
          successAudio.volume = 1.0;
          successAudio.play().catch(err => {
            console.warn('Success sound failed to play:', err);
          });
        }
      } else {
        successMessage.style.display = 'block';
        successMessage.style.color = '#f00';
        successMessage.textContent = 'Something went wrong. Please try again.';
      }
    }).catch(error => {
      console.error('Form submission error:', error);
      successMessage.style.display = 'block';
      successMessage.style.color = '#f00';
      successMessage.textContent = 'Something went wrong. Please try again.';
    });
  });
</script>
