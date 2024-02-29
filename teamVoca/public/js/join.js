document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.join.input");
  const btn_join = document.querySelector("input.join");

  const div_error = document.querySelectorAll("div.error");

  const input_id = document.querySelector("input.id");
  const input_pw = document.querySelector("input.pw");
  const input_pwcheck = document.querySelector("input.pwcheck");
  const input_nick = document.querySelector("input.nick");

  const DIV_INDEX = {
    ID: 0,
    PW: 1,
    PWCHECK: 2,
    NICK: 3,
  };
  btn_join.addEventListener("click", async () => {
    div_error.forEach((item) => (item.innerHTML = ""));
    if (input_id.value === "") {
      div_error[DIV_INDEX.ID].innerHTML = "아이디를 입력해주세요";
      input_id.select();
      return false;
    }
    if (input_id.value.length > 20) {
      div_error[DIV_INDEX.ID].innerHTML = "20자내로 입력해주세요";
      input_id.select();
      return false;
    }
    if (input_pw.value === "") {
      div_error[DIV_INDEX.PW].innerHTML = "비밀번호를 입력해주세요";
      input_pw.select();
      return false;
    }
    if (input_pwcheck.value === "") {
      div_error[DIV_INDEX.PWCHECK].innerHTML =
        "비밀번호 확인을 해주세요";
      return false;
    }
    if (input_pwcheck.value !== input_pw.value) {
      div_error[DIV_INDEX.PWCHECK].innerHTML =
        "비밀번호 확인이 일치하지 않습니다";
      input_pwcheck.select();
      return false;
    }
    if (input_nick.value === "") {
      div_error[DIV_INDEX.NICK].innerHTML =
        "사용할 닉네임을 입력해주세요";
      input_nick.select();
      return false;
    }
    if (input_nick.value.length > 20) {
      div_error[DIV_INDEX.NICK].innerHTML = "20자내로 입력해주세요";
      input_nick.select();
      return false;
    }
    form.submit();
  });
});
