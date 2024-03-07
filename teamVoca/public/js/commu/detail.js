document.addEventListener("DOMContentLoaded", () => {
  const update = document.querySelector("p.update");
  const deleteBtn = document.querySelector("p.delete");

  update.addEventListener("click", () => {
    document.location.href = "/";
  });
  deleteBtn.addEventListener("click", () => {});
});
