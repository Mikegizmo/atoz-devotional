const letters = document.querySelectorAll(".letter");
const panel = document.getElementById("panel");

function showDevotional(letter) {
  const data = devotionals[letter];
  if (data) {
    panel.innerHTML = `
      <h1>${data.title}</h1>
      <h4>${data.definition}</h4>
      <p><em>${data.scripture}</em></p>
    `;
  } else {
    panel.innerHTML = `<p>Click a letter A-Z to see an attribute of God.</p>`;
  }
}

// click events
letters.forEach(letter => {
  letter.addEventListener("click", () => {
    letters.forEach(l => l.removeAttribute("aria-current"));
    letter.setAttribute("aria-current", "true");
    showDevotional(letter.textContent);
  });
});

// keyboard navigation
document.addEventListener("keydown", e => {
  const current = document.querySelector(".letter[aria-current='true']");
  let index = Array.from(letters).indexOf(current);

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    index = (index + 1) % letters.length;
    console.log(index);
    letters[index].click();
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    index = (index - 1 + letters.length) % letters.length;
    letters[index].click();
  }

  const letter = e.key.toUpperCase();
  if (devotionals[letter]) {
    const target = Array.from(letters).find(l => l.textContent === letter);
    if (target) target.click();
  }
});

// load instructions first
panel.innerHTML = `<h1>A to Z Devotional</h1>
        <p>Click, tap, or press a letter to reveal one of God's names or attributes,
        with meaning and Scripture reference. Use arrow keys to move clockwise or
        counter-clockwise around the letters. Screen readers will announce the
        active content.</p>`;
