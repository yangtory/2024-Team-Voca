document.addEventListener("DOMContentLoaded", () => {
  const click = document.querySelector("div.mainList");
  click.addEventListener("click", (e) => {
    const target = e.target;
    const classList = target.classList;
    if (classList.contains("item")) {
      let v_seq = 0;
      if (classList.contains("A")) {
        v_seq = target.dataset.v_seq;
        console.log(v_seq);
      } else {
        v_seq = target.closest("DIV").dataset.v_seq;
      }
      document.location.href = `/commu/${v_seq}/detail`;
    }
  });
});
