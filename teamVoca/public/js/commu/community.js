document.addEventListener("DOMContentLoaded", () => {
  const click = document.querySelector("div.mainList");
  const v_rec = document.querySelector("div.item.a input");

  click?.addEventListener("click", async (e) => {
    const target = e.target;
    const classList = target.classList;
    let v_seq = 0;
    if (classList.contains("item")) {
      if (classList.contains("A")) {
        v_seq = target.dataset.v_seq;
        console.log(v_seq);
      } else {
        v_seq = target.closest("DIV").dataset.v_seq;
      }
      document.location.href = `/commu/${v_seq}/detail`;
    } else if (classList.contains("like")) {
      v_seq = target.closest("DIV").dataset.v_seq;

      document.location.href = `/commu/${v_seq}/like`;
    }
  });
});
