document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector(".btn");

  btn_box?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "ok") {
      const vseq = target.closest("DIV").dataset.vseq;
      document.location.href = `/voca/${vseq}/add_words`;
    }
    if (target.className === "no") {
      document.location.replace("/quiz");
    }
  });
});
