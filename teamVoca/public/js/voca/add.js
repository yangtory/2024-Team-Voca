document.addEventListener("DOMContentLoaded", () => {
  const p_false = document.querySelector("input.false");
  const p_true = document.querySelector("input.true");

  // 체크되면 다른쪽 체크풀리게
  p_false.addEventListener("change", () => {
    if (p_false.checked) {
      p_true.checked = false;
    }
  });

  p_true.addEventListener("change", () => {
    if (p_true.checked) {
      p_false.checked = false;
    }
  });
});

// 이름 안쓰면 버튼 생성안되게.. 미완성

// document.addEventListener("DOMContentLoaded", () => {
//   const name = document.querySelector("input.voca_name");
//   const btn = document.querySelector("button.make_voca");
//   // const form = document.querySelector("form.add_words");
//   btn.addEventListener("click", () => {
//     if (name.value === "") {
//       alert("단어장 이름을 입력해주세요!");
//       return false;
//       // 생성되고있음..
//     } else if (name.value.length > 20) {
//       alert("20자까지 작성가능합니다.");
//       return false;
//     }
//   });
// });
// 안되는데 이름안적거나 넘으면 버튼비활성화가 나을듯 // 아직안됨.
//disabled false, true
document.addEventListener("DOMContentLoaded", () => {
  const name = document.querySelector("input.voca_name");
  const btn = document.querySelector("button.make_voca");
  // const form = document.querySelector("form.add_words");
  btn.addEventListener("click", () => {
    if (name.value === "") {
      btn.disabled = true; // true 가 안보이는건가
    } else if (name.value.length > 20) {
      btn.disabled = true;
    }
  });
});
