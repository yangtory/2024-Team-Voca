// // 유효성검사
// //이름안적거나 넘으면 버튼비활성화가 나을듯
// // disabled false, true (true 가 안보이는거)
// document.addEventListener("DOMContentLoaded", () => {
//   const name = document.querySelector("input.voca_name");
//   const btn = document.querySelector("button.make_voca");

//   name.addEventListener("input", () => {
//     if (name.value === "" || name.value.length > 20) {
//       btn.disabled = true;
//     } else {
//       btn.disabled = false;
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const name = document.querySelector("input.voca_name");
  const p_false = document.querySelector("input.false");
  const p_true = document.querySelector("input.true");
  const btn = document.querySelector("button.make_voca");

  //-----------------전체 비공개 시 단어장공개 선택하면 알림창
  p_true?.addEventListener("click", () => {
    if (localStorage.getItem("active") === "true") {
      if (
        confirm(
          "전체 비공개 상태가 해제됩니다. 공유하기로 만들겠어요?"
        )
      ) {
        localStorage.setItem("active", "false");
      } else {
        p_true.checked = false;
      }
    }
  });

  const advice = document.querySelector("p.advice");
  advice.innerText =
    "반가워요!\n단어장이름을 적고, 공개여부를 선택해주세요!";

  const checkInputs = () => {
    if (!p_false.checked && !p_true.checked) {
      advice.innerText = "공개여부를 선택하세요!";
    }
    // 단어장 이름안쓰거나 20자 넘으면
    if (name.value === "" || name.value.length > 20) {
      btn.disabled = true;
      advice.innerText = "단어장이름은 1-20자를 입력해야 해요!";
    } else {
      // 체크안하면 버튼못누르게
      if (!p_false.checked && !p_true.checked) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
        advice.innerText = "이제 단어장을 생성할 수 있어요!";
      }
    }
  };

  // 체크되면 다른쪽 체크풀리게
  p_false.addEventListener("change", () => {
    if (p_false.checked) {
      p_true.checked = false;
    }
    checkInputs();
  });

  p_true.addEventListener("change", () => {
    if (p_true.checked) {
      p_false.checked = false;
    }
    checkInputs();
  });

  name.addEventListener("input", checkInputs);
});
