<script>
  // Contact form handling
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-msg');
  const successAudio = document.getElementById('success-sound');
  const backgroundAudio = document.getElementById('background-sound');

  // Autoplay background music on first user interaction
  document.addEventListener('click', () => {
    if (backgroundAudio && backgroundAudio.paused) {
      backgroundAudio.volume = 0.5;
      backgroundAudio.play().catch(err => {
        console.warn('Background music autoplay failed:', err);
      });
    }
  }, { once: true });

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

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
          successAudio.play().catch(err => {
            console.warn('Success sound failed:', err);
          });
        }
      } else {
        successMessage.textContent = 'Something went wrong. Please try again.';
        successMessage.style.color = 'red';
        successMessage.style.display = 'block';
      }
    }).catch(error => {
      successMessage.textContent = 'There was an error. Please try again later.';
      successMessage.style.color = 'red';
      successMessage.style.display = 'block';
    });
  });
</script>
