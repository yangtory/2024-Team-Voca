document.addEventListener("DOMContentLoaded", () => {
  const click = document.querySelector("div.mainList");
  const like_btn = document.querySelectorAll("label.button");
  const heart = document.querySelectorAll("img.heart");
  click?.addEventListener("click", async (e) => {
    const target = e.target;
    const classList = target.classList;
    let v_seq = 0;
    if (classList.contains("item")) {
      if (classList.contains("A")) {
        v_seq = target.dataset.v_seq;
      } else {
        v_seq = target.closest("DIV").dataset.v_seq;
      }
      document.location.href = `/commu/${v_seq}/detail`;
    } else if (classList.contains("like")) {
      v_seq = target.closest("DIV").dataset.v_seq;
      document.location.href = `/commu/${v_seq}/like`;
    }
  });

  heart.forEach((e) => {
    e.addEventListener("click", (e) => {
      const target = e.target;
      const like_btn = target.closest("label");

      like_btn.click();
    });
  });
});
