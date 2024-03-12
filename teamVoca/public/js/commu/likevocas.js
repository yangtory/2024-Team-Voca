document.addEventListener("DOMContentLoaded", () => {
  const divList = document.querySelector("div.mainList");

  divList.addEventListener("click", (e) => {
    const target = e.target;
    const classList = target.classList;
    if (classList.contains("voca")) {
      let v_seq = 0;
      if (classList.contains("list")) {
        v_seq = target.dataset.v_seq;
      } else {
        v_seq = target.closest("ul.voca").dataset.v_seq;
      }
      document.location.href = `/commu/${v_seq}/detail`;
    }
  });
});
