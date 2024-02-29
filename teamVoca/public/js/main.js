document.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("div.main");

  start.addEventListener("click", () => {
    return (document.location.href = "/login");
  });
});
