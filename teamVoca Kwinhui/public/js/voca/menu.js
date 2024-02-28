document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("div.bar");
  const click = document.querySelector("span.words");
  click?.addEventListener("click", () => {
    if (box.className === "bar") {
      box.classList.add("down");
    } else if (box.className === "bar down up") {
      box.className = "bar down";
    } else {
      box.classList.add("up");
    }
  });
});
