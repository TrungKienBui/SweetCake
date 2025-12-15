let fired = false;

const watcher = setInterval(() => {
  if (window.count === 4 && !fired) {
    fired = true;

    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.6 }
    });

    clearInterval(watcher);
  }
}, 100);
