const PASSWORD = '2026';

const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const loginPhoto = document.getElementById('login-photo');
const waitPhoto = document.getElementById('wait-photo');

const letterModal = document.getElementById('letter-modal');
const surpriseModal = document.getElementById('surprise-modal');
const waitModal = document.getElementById('wait-modal');

function setPhotoFallback(img) {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.style.background =
      "linear-gradient(160deg, #ffb3c1, #ff4d6d) center/cover";
  });
}

setPhotoFallback(loginPhoto);
setPhotoFallback(waitPhoto);

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = passwordInput.value.trim();

  if (value === PASSWORD) {
    loginError.hidden = true;
    loginScreen.classList.remove('active');
    mainScreen.classList.add('active');
    createConfetti();
  } else {
    loginError.hidden = false;
    passwordInput.classList.add('shake');
    passwordInput.value = '';
    setTimeout(() => passwordInput.classList.remove('shake'), 500);
  }
});

document.getElementById('open-letter').addEventListener('click', () => {
  letterModal.hidden = false;
  document.body.style.overflow = 'hidden';
});

document.getElementById('open-surprise').addEventListener('click', () => {
  surpriseModal.hidden = false;
  document.body.style.overflow = 'hidden';
});

document.getElementById('open-wait-card').addEventListener('click', () => {
  surpriseModal.hidden = true;
  waitModal.hidden = false;
});

document.querySelectorAll('.close-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.close).hidden = true;
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
  backdrop.addEventListener('click', () => {
    backdrop.parentElement.hidden = true;
    document.body.style.overflow = '';
  });
});

function createConfetti() {
  const colors = ['#ff4d6d', '#ffb3c1', '#d4a574', '#fff0f3', '#c9184a'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.textContent = ['♥', '✨', '💕', '🌸'][Math.floor(Math.random() * 4)];
    piece.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: -20px;
      font-size: ${12 + Math.random() * 14}px;
      color: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 999;
      animation: confettiFall ${2 + Math.random() * 3}s ease-in forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }

  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        to {
          transform: translateY(105vh) rotate(${360 + Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
