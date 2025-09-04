const btn = document.getElementById("funnyBtn");
let moveCount = 0;
if (btn) {
  btn.addEventListener("mouseover", () => {
    if (moveCount < 3) {
      const maxX = window.innerWidth - btn.offsetWidth - 20;
      const maxY = window.innerHeight - btn.offsetHeight - 20;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      btn.style.left = `${x}px`;
      btn.style.top = `${y}px`;
      moveCount++;
    }
  });
  btn.addEventListener("click", () => {
    window.location.href = "cards.html";
  });
}
const cards = document.querySelectorAll(".card");
function addEffects(card) {
  // ✨ Sparkle burst
  const burst = document.createElement("div");
  burst.className = "burst";
  burst.innerHTML = "✨🌟💖";
  card.appendChild(burst);
  setTimeout(() => burst.remove(), 1000);
  const messages = ["Cool!", "Nice Flip!", "Woah!", "Magic ✨", "Haha 😍"];
  const popup = document.createElement("div");
  popup.className = "popup-text";
  popup.textContent = messages[Math.floor(Math.random() * messages.length)];
  card.appendChild(popup);
  setTimeout(() => popup.remove(), 1200);
}
if (cards.length) {
  cards.forEach((card) => {
    const [c1, c2] = (card.dataset.colors || "").split(",");
    const blob = card.querySelector(".blob");
    if (blob && c1 && c2) {
      blob.style.background = `radial-gradient(60% 60% at 30% 30%, rgba(255,255,255,.12), transparent 60%), linear-gradient(135deg, ${c1}, ${c2})`;
    }

    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
      if (card.classList.contains("is-flipped")) {
        addEffects(card);
      }
    });
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("is-flipped")) {
        card.classList.add("is-flipped");
        addEffects(card);
      }
    });
    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("is-flipped")) {
        card.classList.remove("is-flipped");
      }
    });
  });
  const shuffleBtn = document.getElementById("shuffleBtn");
  const autoplayBtn = document.getElementById("autoplayBtn");
  const palettes = [
    ["#ffd166", "#70e1ff"],
    ["#ff9a9e", "#fecfef"],
    ["#8ec5fc", "#e0c3fc"],
    ["#a1ffce", "#faffd1"],
    ["#f6d365", "#fda085"],
    ["#fbc2eb", "#a6c1ee"],
    ["#84fab0", "#8fd3f4"],
    ["#fddb92", "#d1fdff"],
  ];
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      cards.forEach((card, i) => {
        const [c1, c2] =
          palettes[
            (i + Math.floor(Math.random() * palettes.length)) % palettes.length
          ];
        const blob = card.querySelector(".blob");
        if (blob)
          blob.style.background = `radial-gradient(60% 60% at 30% 30%, rgba(255,255,255,.12), transparent 60%), linear-gradient(135deg, ${c1}, ${c2})`;
      });
    });
  }
  let timer = null,
    autoplay = false;

  function startAuto() {
    let idx = 0;
    autoplay = true;
    autoplayBtn.textContent = "⏸ Stop Auto";
    timer = setInterval(() => {
      cards.forEach((c) => c.classList.remove("is-flipped"));
      const current = cards[idx % cards.length];
      current.classList.add("is-flipped");

      // add sparkle + popup immediately
      addEffects(current);

      idx++;
    }, 1100);
  }

  function stopAuto() {
    autoplay = false;
    autoplayBtn.textContent = "▶ Auto Flip";
    clearInterval(timer);
    timer = null;
  }

  if (autoplayBtn) {
    autoplayBtn.addEventListener("click", () => {
      autoplay ? stopAuto() : startAuto();
    });
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && autoplay) stopAuto();
  });
}
