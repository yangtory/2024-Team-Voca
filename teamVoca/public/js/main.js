document.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("h2");

  start.addEventListener("click", () => {
    return (document.location.href = "/login");
  });
});
