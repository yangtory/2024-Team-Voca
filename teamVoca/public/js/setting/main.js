document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("ul");

  menu?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "logout") {
      alert("로그아웃 되었습니다.");
      document.location.href = "setting/logout";
    }
  });
  const toggle = document.querySelector("input.check");
  const toggleActive = localStorage.getItem("active");
  // const toggleState = (toggleOn) => {
  toggle.checked = toggleActive === "true"; // 문자열 "true"를 받으면 true로 변환
  // };
  toggle.addEventListener("click", async (e) => {
    // toggle.classList.toggle("on");
    // if (toggle.classList.contains("on")) {
    console.log(toggle.checked);

    if (toggle.checked) {
      localStorage.setItem("active", "true");
      alert("비공개 전환 후 해제하면 모든 단어장이 공개됩니다◠‿◠");
      document.location.href = "setting/toggle";
    } else {
      console.log("false");
      localStorage.setItem("active", "false");
      alert("모든 단어장이 공개되었습니다◝(・▿・)◜");
      document.location.href = "setting/toggleoff";
    }
  });
  // window.onload = () => {
  //   toggleState(toggleActive === "true");
  // };
});
