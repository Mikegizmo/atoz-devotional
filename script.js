const clockwiseOrder = [
  "A","B","C","D","E","F",     // top
  "G","H","I","J","K","L","M", // right
  "N","O","P","Q","R","S",     // bottom
  "T","U","V","W","X","Y","Z"  // left
];

const letters = document.querySelectorAll(".letter");
const panel = document.getElementById("panel");

// helper to find letter by text
function getLetterButton(letter) {
  return Array.from(letters).find(l => l.textContent === letter);
}

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
  const currentLetter = current ? current.textContent : null;
  let index = clockwiseOrder.indexOf(currentLetter);

  if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    e.preventDefault();
    index = (index + 1) % clockwiseOrder.length;
    getLetterButton(clockwiseOrder[index]).click();
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    e.preventDefault();
    index = (index - 1 + clockwiseOrder.length) % clockwiseOrder.length;
    getLetterButton(clockwiseOrder[index]).click();
  }

  const letter = e.key.toUpperCase();
  if (devotionals[letter]) {
    const target = getLetterButton(letter);
    if (target) target.click();
  }
});

// load instructions first
panel.innerHTML = `<h1>A to Z Devotional</h1>
        <p>Click, tap, or press a letter to reveal one of God's names or attributes,
        with meaning and Scripture reference. Use arrow keys to move clockwise or
        counter-clockwise around the letters. Screen readers will announce the
        active content.</p>`;
