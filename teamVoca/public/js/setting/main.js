document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("ul");
  const toggle = document.querySelector("input.check");

  menu.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "logout") {
      alert("로그아웃 되었습니다.");
      document.location.href = "setting/logout";
    }
  });

  toggle.addEventListener("click", () => {
    const on = document.querySelector("p.on");
    const off = document.querySelector("p.off");
    if (toggle.className === "check") {
      toggle.classList.add("on");
      off.style.display = "none";
      on.style.display = "block";
    }
    if (toggle.className === "check on") {
      toggle.classList.replace("check");
    }
  });
});
