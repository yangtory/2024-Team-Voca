document.addEventListener("DOMContentLoaded", () => {
  const drop = document.querySelectorAll("input.delete");

  drop.forEach((drop_btn) => {
    drop_btn?.addEventListener("click", () => {
      const c_seq = drop_btn.closest("DIV").dataset.c_seq;
      const v_seq = drop_btn.closest("DIV").dataset.v_seq;

      if (confirm("댓글을 지우시겠습니까?")) {
        document.location.href = `/commu/${v_seq}/detail/delete/${c_seq}`;
      }
    });
  });

  const date_form = document.querySelector("form.input");
  const comment = document.querySelector("form.input input.comment");
  const btn_save = document.querySelector("input.save");
  const comment_box = document.querySelector("div.comment");
  comment_box.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "btnupdate") {
      comment.focus();

      const c_seq = target.closest("DIV").dataset.c_seq;
      const v_seq = target.closest("DIV").dataset.v_seq;
      const res = await fetch(`/commu/${v_seq}/get/${c_seq}`);
      const json = await res.json();

      comment.value = json.c_comment;
      console.log(json.c_comment);
      btn_save.value = "수정";
      btn_save.classList.add("update");
      date_form.action = `/commu/${v_seq}/update/${c_seq}`;
    }
  });
});

// ------------------- 단어보기 댓글보기 버튼기능 추가
document.addEventListener("DOMContentLoaded", function () {
  // 단어보기 버튼
  const viewWordButton = document.querySelector("button.view_word"); // '단어보기' 버튼의 클래스 이름을 확인해주세요.
  // 댓글보기 버튼
  const viewCommentButton = document.querySelector("button.view_com"); // '댓글보기' 버튼의 클래스 이름을 확인해주세요.

  // 단어칸
  const scrollDiv = document.querySelector("div.scroll");
  // 댓글칸
  const commentDiv = document.querySelector("div.comment");

  // 단어보기
  viewWordButton.addEventListener("click", () => {
    scrollDiv.style.height = "100%";
    commentDiv.style.height = "0%";
  });

  // 댓글보기
  viewCommentButton.addEventListener("click", () => {
    scrollDiv.style.height = "0%";
    commentDiv.style.height = "100%";
  });
});
