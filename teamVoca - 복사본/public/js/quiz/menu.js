document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("section.body");

  btn_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "spell") {
      const voca = target.closest("SECTION").dataset.num;
      document.location.href = `/quiz/start/${voca}`;
    }
    if (target.className === "mean") {
      const voca = target.closest("SECTION").dataset.num;
      document.location.href = `/quiz/meanstart/${voca}`;
    }
  });
});
