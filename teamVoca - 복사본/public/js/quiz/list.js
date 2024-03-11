document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("section.body");

  list.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
      const ul = target.closest("UL");
      const li = ul.dataset.num;
      document.location.href = `/quiz/menu/${li}`;
    }
  });
});
