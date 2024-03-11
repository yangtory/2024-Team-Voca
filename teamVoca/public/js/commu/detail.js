document.addEventListener("DOMContentLoaded", () => {
  const drop = document.querySelectorAll("input.delete");
  const update = document.querySelectorAll("input.update");
  const commentBox = document.querySelector("div.commentBox");
  const inputBox = document.querySelectorAll("input.commentBox");
  const complete = async (e) => {
    const target = e.target;
    const c_seq = target.closest("DIV").dataset.c_seq;
    const v_seq = target.closest("DIV").dataset.v_seq;
    const res = await fetch(`/commu/${v_seq}/detail/update/${c_seq}`);
    const json = await res.json();
    inputBox.value = json.c_comment;
    inputBox.forEach((box) => {
      comment_box_seq = box.dataset.c_seq;
      if (c_seq === comment_box_seq) {
        box.setAttribute("readonly", "readonly");
        box.style.border = "none";
        box.style.backgroundColor = "transparent";

        target.value = "수정";
      }
      // document.location.href = `/commu/${v_seq}/detail/update/${c_seq}`;
    });

    // form.submit();

    // console.log(inputBox.value);
    target.removeEventListener("click", complete);
  };

  let comment_box_seq = 0;
  let comment = "";
  update.forEach((update_btn) => {
    update_btn?.addEventListener("click", async (e) => {
      const target = e.target;
      const c_seq = target.closest("DIV").dataset.c_seq;
      const v_seq = target.closest("DIV").dataset.v_seq;

      inputBox.forEach((box) => {
        comment_box_seq = box.dataset.c_seq;
        if (c_seq === comment_box_seq) {
          box.removeAttribute("readonly");
          box.style.border = "1px solid black";
          box.style.backgroundColor = "white";
          box.focus();
          target.value = "수정 완료";
          comment = box.value;
          // "수정 완료" 버튼 클릭 이벤트 처리
        }
        // target.addEventListener('click', complete);
      });

      const id = document.querySelector("input.c_user");

      target?.addEventListener("click", async () => {
        const res = await fetch(`/commu/${v_seq}/update/${c_seq}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            c_comment: comment,
            c_seq: comment_box_seq,
            c_user: id.value,
            c_vseq: v_seq,
          }),
        });

        const json = await res.json();
        console.log(json);

        update?.addEventListener("click", complete);
      });

      // box.value = json.c_comment;
      // console.log(box);
      // console.log(box.value);
    });
  });

  drop.forEach((drop_btn) => {
    drop_btn?.addEventListener("click", () => {
      const c_seq = drop_btn.closest("DIV").dataset.c_seq;
      const v_seq = drop_btn.closest("DIV").dataset.v_seq;
      alert(c_seq);
      document.location.href = `/commu/${v_seq}/detail/delete/${c_seq}`;
    });
  });
});
