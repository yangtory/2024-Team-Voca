document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector("div.bar");
  const click = document.querySelector("span.words");
  const menu_box = document.querySelector("div.center");

  click?.addEventListener("click", () => {
    if (box.className === "bar") {
      box.classList.add("down");
    } else if (box.className === "bar down up") {
      box.className = "bar down";
    } else {
      box.classList.add("up");
    }
  });

  menu_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "add") {
      document.location.href = "/voca/add";
    } else if (target.className === "quiz") {
      document.location.href = "/quiz";
    } else if (target.className === "commu") {
      document.location.href = "/commu";
    } else if (target.className === "setting") {
      document.location.href = "/setting";
    }
  });
});
