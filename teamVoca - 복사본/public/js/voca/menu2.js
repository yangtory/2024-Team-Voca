// 단어장 안 단어보기
// document.addEventListener("DOMContentLoaded", () => {
//   const voca_boxes = document.querySelectorAll("div.voca_box");

//   voca_boxes.forEach((voca_box) => {
//     voca_box.addEventListener("click", (e) => {
//       const target = e.target;

//       const voca_seq = target.closest("SECTION").dataset.v_seq;
//       document.location.href = `/voca/${voca_seq}/words`;
//     });
//   });
// });
// 삭제버튼눌려야해서 수정 // 합치는게 낫겠다
document.addEventListener("DOMContentLoaded", () => {
  const voca_boxes = document.querySelectorAll("div.voca_box");

  voca_boxes.forEach((voca_box) => {
    voca_box.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName !== "BUTTON") {
        const voca_seq = target.closest("SECTION").dataset.v_seq;
        document.location.href = `/voca/${voca_seq}/words`;
      } else if (target.tagName === "BUTTON") {
        // const voca_name =
        //   document.querySelector("h5.voca_name").dataset.name;
        if (
          confirm(
            "단어장을 삭제하시겠습니까? \n삭제된 단어장은 복구가 불가능 합니다."
          )
        ) {
          // 삭제 주소로
          // 단어장 추가가 /voca/add
          const voca_seq = target.closest("SECTION").dataset.v_seq;
          document.location.href = `/voca/${voca_seq}/delete`;
        }
      }
    });
  });
});

// 단어장 삭제
// document.addEventListener("DOMContentLoaded", () => {
//   const voca_name =
//     document.querySelector("h5.voca_name").dataset.name;
//   const delete_btns = document.querySelectorAll("button.delete");
//   delete_btns.addEventListener("click", () => {
//     if (
//       confirm(
//         `${voca_name} 단어장을 삭제하시겠습니까? \n 삭제된 단어장은 복구가 불가능 합니다.`
//       )
//     ) {
//     }
//   });
// });
