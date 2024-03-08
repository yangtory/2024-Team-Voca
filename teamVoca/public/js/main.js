document.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("div.main");
  const back = document.querySelector("p.back");

  start?.addEventListener("click", () => {
    return (document.location.href = "/login");
  });

  back.addEventListener("click", () => {
    window.history.back();
  });
});
