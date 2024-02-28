document.addEventListener("DOMContentLoaded", () => {
  const click = document.querySelector("span.words");
  click.addEventListener("click", () => {
    if (click) {
      document.getElementById("bar").style.top = "90%";
      document.getElementById("bar").style.transition = "0.7s";
    }
  });
});
