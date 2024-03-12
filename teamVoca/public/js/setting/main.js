document.addEventListener("DOMContentLoaded", async () => {
  const menu = document.querySelector("ul");
  const popup = document.querySelector("div.bg");
  const update = document.querySelector("input.update");
  const slide = document.querySelector("label.switch");
  menu?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "logout") {
      alert("로그아웃 되었습니다.");
      document.location.href = "setting/logout";
    }
    if (target.className === "pro") {
      popup.style.display = "block";
      slide.style.opacity = "0.2";
    }
    if (target.className === "tuto") {
      document.location.href = "/tuto";
    }
    if (target.className === "drop") {
      const id = target.dataset.id;
      if (confirm("정말 탈퇴할까요?")) {
        document.location.replace(`/setting/drop/${id}`);
      }
    }
  });

  //-----------------프로 멤버십
  const pro_check = document.querySelector("input.pro");
  const badge = document.querySelector("p.badge");
  const m_id = document.querySelector("div.btn").dataset.id;

  const response = await fetch(`setting/getinfo/${m_id}`);
  const data = await response.json();

  if (data.m_pro === "0") {
    pro_check.checked = false;
    localStorage.setItem("pro", "false");
    badge.style.display = "none";
  } else {
    pro_check.checked = true;
    localStorage.setItem("pro", "true");
    badge.style.display = "block";
  }
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
    if (target.className === "revoke") {
      const m_id = target.closest("DIV").dataset.id;
      if (confirm("정말 취소할까요?")) {
        document.location.replace(`/setting/prooff/${m_id}`);
      }
    }
  });

  //-----------------계정 전환 toggle
  const toggle = document.querySelector("input.check");
  const toggleActive = localStorage.getItem("active");

  toggle.checked = toggleActive === "true"; // 문자열 "true"를 받으면 true로 변환

  toggle?.addEventListener("click", async (e) => {
    console.log(toggle.checked);

    if (toggle.checked) {
      localStorage.setItem("active", "true");
      alert("모든 단어장이 비공개되었습니다◝(・▿・)◜");
      document.location.href = "setting/toggle";
    } else {
      console.log("false");
      localStorage.setItem("active", "false");
      alert("모든 단어장이 공개되었습니다◝(・▿・)◜");
      document.location.href = "setting/toggleoff";
    }
  });

  update.addEventListener("click", () => {
    const m_id = update.dataset.id;
    document.location.href = `setting/${m_id}/update`;
  });
});
