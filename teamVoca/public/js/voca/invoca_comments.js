document.addEventListener("DOMContentLoaded", () => {
  const x_btns = document.querySelectorAll("button.x");
  x_btns.forEach((x_btn) => {
    x_btn.addEventListener("click", (e) => {
      if (confirm("이 댓글을 지우시겠습니까?")) {
        const target = e.target;
        //   댓글번호
        const c_seq = target.closest("DIV").dataset.c_seq;
        //  댓글 삭제주소
        document.location.href = `/voca/comment/${c_seq}/delete`;
      }
    });
  });
});
