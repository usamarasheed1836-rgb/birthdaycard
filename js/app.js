const PASSWORD = '2026';

const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const loginPhoto = document.getElementById('login-photo');

const letterModal = document.getElementById('letter-modal');
const surpriseModal = document.getElementById('surprise-modal');

// Fallback if picture not found
loginPhoto.addEventListener('error', () => {
  loginPhoto.style.display = 'none';
  loginPhoto.parentElement.style.background =
    "linear-gradient(160deg, #ffb3c1, #ff4d6d) url('data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<text y="55" x="50" text-anchor="middle" font-size="40">💕</text></svg>'
    ) +
    "') center/80px no-repeat";
});

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

document.querySelectorAll('.close-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.close;
    document.getElementById(modalId).hidden = true;
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
