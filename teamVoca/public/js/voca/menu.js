document.addEventListener("DOMContentLoaded", async () => {
  const box = document.querySelector("div.bar");
  const click = document.querySelector("span.words");
  const menu_box = document.querySelector("div.center");
  const popup = document.querySelector("div.bg");
  const tuto_btn = document.querySelector("div.tuto.btn");

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
    } else if (target.className === "getpro") {
      popup.style.display = "block";
    }
  });

  popup.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "close") {
      popup.style.display = "none";
      slide.style.opacity = "1";
    }
    if (target.className === "buy") {
      const m_id = target.closest("DIV").dataset.id;
      if (confirm("정말 구매할까요?")) {
        document.location.replace(`/setting/pro/${m_id}`);
      }
    }
  });

  tuto_btn.addEventListener("click", async (e) => {
    const target = e.target;
    const m_id = tuto_btn.dataset.id;
    if (target.className === "go") {
      document.location.href = `/tuto/go/${m_id}`;
    } else {
      document.location.href = `/tuto/out/${m_id}`;
    }
  });
});
