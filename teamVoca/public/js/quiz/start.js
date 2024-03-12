document.addEventListener("DOMContentLoaded", async () => {
  const bear = document.querySelector("p.comment");
  const result = document.querySelector("div.result");
  const word_box = document.querySelector("input.word");

  const correct_btn = document.querySelector("input.correct");
  const correct = document.querySelector("p.correct");

  const res = document.querySelector("input.res");
  const res_btn = document.querySelector("input.resbtn");
  const btn_box = document.querySelector("div.btn.next");

  const answer = document.querySelector("p.o");
  const wrong = document.querySelector("p.x");
  let answer_count = 0;
  let wrong_count = 0;

  // v_seq 가져오고 단어 리스트 json 받아오기
  const w_vseq = btn_box.dataset.num;
  const response = await fetch(`/quiz/getword/${w_vseq}`);
  const data = await response.json();

  // 단어 가져오기
  let index = 0;

  const getWord = async () => {
    word_box.value = data[index].w_mean;
  };

  // 다음 단어 가져오기
  const nextWord = async () => {
    if (index < data.length - 1) {
      index++;
      word_box.value = data[index].w_mean;
    } else {
      setTimeout(() => {
        bear.innerText = "퀴즈 끝!";
        word_box.style.display = "none";
        result.style.display = "block";
        answer.innerText = `정답 : ${answer_count}`;
        wrong.innerText = `오답 : ${wrong_count}`;
      }, 1000);
    }
  };

  // 처음 퀴즈시작 함수 실행
  bear.innerText = "퀴즈 시작!";
  getWord();

  // 정답 확인
  res_btn.addEventListener("click", async () => {
    if (res.value === data[index].w_word) {
      bear.innerText = "정답이야!";
      answer_count++;
      setTimeout(() => {
        bear.innerText = "이번 문제도 잘 풀어봐!";
      }, 1000);
    } else {
      bear.innerText = "틀렸어!";
      wrong_count++;
      setTimeout(() => {
        bear.innerText = "이번엔 잘 생각해봐!";
      }, 1000);
    }
    nextWord();
    res.value = "";
    correct.style.display = "none";
  });

  correct_btn.addEventListener("click", async () => {
    correct.innerText = data[index].w_word;
    correct.style.display = "block";
  });

  btn_box.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "stop") {
      if (confirm("정말 나갈까요?")) {
        document.location.replace("/quiz");
      }
    }
    if (target.className === "restart") {
      if (confirm("다시 시작할까요?")) {
        document.location.replace(`/quiz/start/${w_vseq}`);
      }
    }
  });
});
