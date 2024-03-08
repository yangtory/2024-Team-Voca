document.addEventListener("DOMContentLoaded", () => {
  const update = document.querySelectorAll("p.update");
  const commentBox = document.querySelector("div.commentBox");
  const inputBox = document.querySelectorAll("input.commentBox");
  const form = document.querySelector("form.input");
  const complete = async (e) => {
    const target = e.target;
    const c_seq = target.closest("DIV").dataset.c_seq;
    const v_seq = target.closest("DIV").dataset.v_seq;
    inputBox.forEach((box) => {
      comment_box_seq = box.dataset.c_seq;
      if (c_seq === comment_box_seq) {
        box.setAttribute("readonly", "readonly");
        box.style.border = "none";
        box.style.backgroundColor = "transparent";

        target.textContent = "수정";
      }
    });
    const res = await fetch(`/commu/${v_seq}/detail/update/${c_seq}`);
    const json = await res.json();
    console.log(json);
    inputBox.value = json.c_comment;

    console.log(inputBox.value);
    target.removeEventListener("click", complete);
  };

  let comment_box_seq = 0;
  update.forEach((update_btn) => {
    update_btn.addEventListener("click", async (e) => {
      const target = e.target;
      const c_seq = target.closest("DIV").dataset.c_seq;

      inputBox.forEach((box) => {
        comment_box_seq = box.dataset.c_seq;
        if (c_seq === comment_box_seq) {
          box.removeAttribute("readonly");
          box.style.border = "1px solid black";
          box.style.backgroundColor = "white";
          box.focus();
          target.textContent = "수정 완료";

          // "수정 완료" 버튼 클릭 이벤트 처리
          target.addEventListener("click", complete);
        }
        // form.submit();
      });

      // box.value = json.c_comment;
      // console.log(box);
      // console.log(box.value);
    });
  });
});
