document.addEventListener("DOMContentLoaded", () => {
  const p_false = document.querySelector("input.false");
  const p_true = document.querySelector("input.true");

  // 체크되면 다른쪽 체크풀리게
  p_false.addEventListener("change", ()=> {
    if (p_false.checked) {
      p_true.checked = false;
    }
  });

  p_true.addEventListener("change", ()=> {
    if (p_true.checked) {
      p_false.checked = false;
    }
  });
});

// 단어장 생성 누르면 생성된 단어장 번호의 단어추가 페이지로 이동하는 링크
// js 생성해야함
