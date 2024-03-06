// document.addEventListener("DOMContentLoaded", () => {
//   const p_false = document.querySelector("input.false");
//   const p_true = document.querySelector("input.true");

//   // 체크되면 다른쪽 체크풀리게
//   p_false.addEventListener("change", () => {
//     if (p_false.checked) {
//       p_true.checked = false;
//     }
//   });

//   p_true.addEventListener("change", () => {
//     if (p_true.checked) {
//       p_false.checked = false;
//     }
//   });
// });
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

  const checkInputs = () => {
    if (name.value === "" || name.value.length > 20) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
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
