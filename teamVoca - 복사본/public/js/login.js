document.addEventListener("DOMContentLoaded", () => {
  const join = document.querySelector("input.join");

  join.addEventListener("click", () => {
    return (document.location.href = "/join");
  });
});
