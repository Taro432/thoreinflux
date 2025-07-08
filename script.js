document.addEventListener('DOMContentLoaded', () => {
  // ===== Background Music Toggle Button =====
  const audioBtn = document.getElementById('matrix-audio-btn');
  const backgroundAudio = document.getElementById('background-sound');
  let isPlaying = false;

  if (audioBtn && backgroundAudio) {
    audioBtn.addEventListener('click', () => {
      if (!isPlaying) {
        backgroundAudio.play();
        audioBtn.classList.add('playing');
        isPlaying = true;
      } else {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        audioBtn.classList.remove('playing');
        isPlaying = false;
      }
    });

    window.addEventListener('load', () => {
      backgroundAudio.volume = 0.5;
      backgroundAudio.play().catch(err =>
        console.warn('Autoplay failed:', err)
      );
    });
  }

  // ===== Guestbook Form =====
  const guestbookForm    = document.getElementById('guestbook-form');
  const guestbookMessage = document.getElementById('guestbook-message');
  const submitSound      = document.getElementById('submit-sound');

  if (guestbookForm) {
  guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    guestbookMessage.classList.remove('hidden');
    guestbookForm.reset();
    submitSound?.play().catch(err =>
      console.warn('Guestbook sound playback failed:', err)
    );
    setTimeout(() => {
      guestbookMessage.classList.add('hidden');
    }, 5000);
  });
}

  // ===== Contact Form =====
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  const successAudio = document.getElementById('success-sound');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);

      fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          successMessage.textContent = 'Thank you for your message!';
          successMessage.classList.remove('hidden');
          contactForm.reset();
          successAudio?.play().catch(err => console.warn('Sound playback failed:', err));
          setTimeout(() => {
            successMessage.classList.add('hidden');
            successMessage.style.color = '';
          }, 5000);
        } else showError();
      })
      .catch(showError);

      function showError() {
        successMessage.textContent = 'Something went wrong. Please try again.';
        successMessage.classList.remove('hidden');
        successMessage.style.color = 'red';
        setTimeout(() => {
          successMessage.classList.add('hidden');
          successMessage.style.color = '';
        }, 5000);
      }
    });
  }

  // ===== Matrix Background Animation =====
  const canvas = document.getElementById("matrix");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let letters = Array(256).join("1").split("");

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";

      letters.forEach((y, index) => {
        const text = String.fromCharCode(30000 + Math.random() * 33);
        const x = index * 10;
        ctx.fillText(text, x, y);
        letters[index] = y > 758 + Math.random() * 10000 ? 0 : y + 10;
      });
    };

    setInterval(draw, 33);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ===== Monitor Boot Sequence =====
  const powerButton = document.getElementById("monitor-power-button");
  const monitorGlow = document.getElementById("monitor-glow");
  const bootText = document.getElementById("boot-text");
  const aboutMeText = document.getElementById("about-me-text");
  const buttonSound = document.getElementById("button-sound");
  const bootSound = document.getElementById("boot-sound");

  const bootLines = [
    "> Initializing system...",
    "> Loading kernel modules...",
    "> Boot sequence start [OK]",
    "> Establishing display protocol...",
    "> Welcome, Thore."
  ];

  const aboutMeLines = [
    "~$ whoami",
    "> identity.confirmed: ThoreInflux",
    "> status: in training (web design / front-end engineering)",
    "> languages: HTML, CSS, JS — actively acquiring proficiency",
    "> origin: DE | age: 29 | languages: [German, English]",
    "> affinity: tech systems, PC hardware, AI models, IT support",
    "> mindset: structured | analytical | independent | solution-driven",
    "> objectives: build immersive, high-functioning digital spaces",
    "> system.state: evolving"
  ];

  let isRunning = false;

  function typeLine(line, container, delay = 15) {
    return new Promise(resolve => {
      let i = 0;
      const span = document.createElement("p");
      // >>>>> Ergänzung für gleichmäßiges Verhalten:
      span.style.width = "100%";
      span.style.margin = "0";
      span.style.whiteSpace = "pre";
      span.style.fontFamily = "'Share Tech Mono', monospace";
      span.style.lineHeight = "1.4";
      container.appendChild(span);

      const interval = setInterval(() => {
        span.textContent += line[i];
        i++;
        if (i === line.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  }

  async function typeLines(lines, container) {
    for (const line of lines) {
      await typeLine(line, container);
      await new Promise(r => setTimeout(r, 150));
    }
  }

  async function runSequence() {
    isRunning = true;
    buttonSound?.play();
    powerButton.classList.add("active");
    monitorGlow.style.opacity = 1;
    monitorGlow.style.animation = "screenFlicker 1.4s ease-in-out";

    bootSound.currentTime = 0;
    bootSound.play();

    await new Promise(r => setTimeout(r, 2000));
    await typeLines(bootLines, bootText);
    await new Promise(r => setTimeout(r, 2000));
    bootText.innerHTML = "";
    await typeLines(aboutMeLines, bootText);
    await new Promise(r => setTimeout(r, 1500));

    monitorGlow.style.opacity = 0;
    monitorGlow.style.animation = "none";
    bootText.innerHTML = "";
    aboutMeText.innerHTML = "";
    powerButton.classList.remove("active");

    isRunning = false;
  }

  if (powerButton) {
    powerButton.addEventListener("click", () => {
      if (!isRunning) {
        runSequence();
      }
    });
  }
});
