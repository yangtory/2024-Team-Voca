// 단어장 수정
document.addEventListener("DOMContentLoaded", () => {
  const voca_btn = document.querySelector("button.voca_update");

  voca_btn.addEventListener("click", () => {
    const v_seq = voca_btn.dataset.v_seq;
    document.location.href = `/voca/${v_seq}/update`;
  });
});

//단어장 안 단어수정
document.addEventListener("DOMContentLoaded", () => {
  const word_btns = document.querySelectorAll("button.word_update");

  word_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const w_seq = btn.dataset.w_seq;
      document.location.href = `/voca/${w_seq}/words/update`;
    });
  });
});

// 단어장 안 단어>>추가<<
// 단어추가 주소 "/:newvoca_seq/add_words"
// 단어>장< 번호
document.addEventListener("DOMContentLoaded", () => {
  const add_btn = document.querySelector("button.add_word");

  add_btn.addEventListener("click", () => {
    const voca_btn = document.querySelector("button.voca_update");
    const v_seq = voca_btn.dataset.v_seq;
    document.location.href = `/voca/${v_seq}/add_words`;
  });
});

// ------ 단어 삭제 ----------

document.addEventListener("DOMContentLoaded", () => {
  const delete_btns = document.querySelectorAll("button.delete");
  delete_btns.forEach((delete_btn) => {
    delete_btn.addEventListener("click", (e) => {
      if (
        confirm(
          "단어를 삭제하시겠습니까?\n삭제된 단어는 복구가 불가능합니다."
        )
      ) {
        const target = e.target;
        const div = target.closest("DIV");
        const w_seq = div.dataset.w_seq;
        // const w_seq = document.querySelector("button.word_update")
        //   .dataset.w_seq;
        // 삭제주소 /:w_seq/words/delete
        document.location.href = `/voca/${w_seq}/words/delete`;
      }
    });
  });
});
