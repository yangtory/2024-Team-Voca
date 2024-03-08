document.addEventListener("DOMContentLoaded", () => {
  const btnBox = document.querySelector("div.box");
  btnBox.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "vocas") {
      document.location.href = "/commu/vocas";
    } else if (target.className === "free") {
      document.location.href = "/commu/free";
    }
  });
});
