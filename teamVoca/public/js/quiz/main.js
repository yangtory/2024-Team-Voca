document.addEventListener("DOMContentLoaded", () => {
  const btn_box = document.querySelector("section.body");

  btn_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "my") {
      document.location.href = "quiz/mylist";
    }
    if (target.className === "like") {
      document.location.href = "quiz/likelist";
    }
  });
});
