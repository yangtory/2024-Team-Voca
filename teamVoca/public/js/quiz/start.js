// 퀴즈 event
/*
0. fetch 로 json 받아오기
1. word_box 에 단어 띄우기
2. res_box 의 값과 비교해서 정답 여부 확인
3. next 버튼을 누르면 오답이 되고 다음 단어가 나온다
*/
const quiz_event = async () => {
  const quiz_section = document.querySelector("section.body");
  const comment = document.querySelector("p.comment");
  const word_box = document.querySelector("input.word");
  const res_box = document.querySelector("input.res");
  const correct_btn = document.querySelector("input.correct");
  const btn_box = document.querySelector("div.btn.next");

  // v_seq 가져오고 단어 리스트 json 받아오기
  const w_vseq = quiz_section.dataset.vseq;
  console.log(v_seq);
  const res = await fetch(`/quiz/start/${w_vseq}`);
  const word = await res.json();

  word_box.value = word.w_word;
  console.log(word_box.value);

  // json 에 있는 단어들 word_box에 띄우기
};

document.addEventListener("DOMContentLoaded", () => {
  quiz_event();
  //   word_box.addEventListener("load", quiz_event);
});
