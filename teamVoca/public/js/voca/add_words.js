document.addEventListener("DOMContentLoaded", () => {
  const word = document.querySelector("input.word");
  const mean = document.querySelector("input.mean");
  const add_btn = document.querySelector("button.add");
  const advice = document.querySelector("p.advice");

  //  맨처음엔 영어단어, 뜻 입력하라하고
  if (word.value === "") {
    advice.innerText = "영어단어와 뜻을 입력하세요!";
  } else {
    // 수정했을때 경우엔 input은 없지만 값이 있으니
    advice.innerText = "수정한 내용이 없어요!";
  }

  // 이제 입력을하면
  const input = () => {
    if (word.value !== "" && mean.value !== "") {
      add_btn.disabled = false;
      advice.innerText = "이제 단어를 저장할 수 있어요!!";
    } else if (word.value === "") {
      add_btn.disabled = true;
      advice.innerText = "영어단어를 입력하세요!";
    } else if (mean.value === "") {
      add_btn.disabled = true;
      advice.innerText =
        "뜻을 입력하세요!\n자동입력 버튼을 눌러 자동입력도 가능해요!!";
    }
  };

  // 단어랑 뜻 적었으면..
  word.addEventListener("input", input);
  mean.addEventListener("input", input);
  // 발음이나 메모를 적어도 수정한거니까 저장이 가능해야 하니
  // 메모랑 발음에도 input 이벤트발생
  const pron = document.querySelector("input.pron");
  const memo = document.querySelector("input.memo");
  pron.addEventListener("input", input);
  memo.addEventListener("input", input);

  add_btn.addEventListener("click", () => {
    // 추가&저장된거 알려주게
    alert("단어가 저장되었습니다!!");
  });
});

// ----------------------------- 번역 버튼 --------------

document.addEventListener("DOMContentLoaded", () => {
  const trans_autobutn = document.querySelector("button.auto");
  trans_autobutn.addEventListener("click", () => {
    const word = document.querySelector("input.word");
    if (word.value === "") {
      alert(
        "먼저 영어단어를 입력하세요!!\n영어단어를 한국어 뜻으로 자동생성할 수 있습니다."
      );
    } else {
      const trans_input = document.querySelector("input.trans");
      trans_input.value = word.value;
      const trans_realbtn = document.querySelector("button.trans");
      trans_realbtn.click(); // 진짜번역버튼 클릭한걸로

      // 영어단어칸 입력 저장
      localStorage.setItem("e_word", word.value);
    }
  });

  // 페이지 로드 시 저장된 영어단어 불러오기// 임시로 저장했다가
  const savedWord = localStorage.getItem("e_word");
  const wordInput = document.querySelector(".word");
  if (savedWord) {
    wordInput.value = savedWord; // 영단어 입력한거 저장했다가 다시 보여줘야하니까..
    // 번역 후 한 번만쓰고 다시 단어추가 할때 나오면 안되니까 폐기
    localStorage.removeItem("e_word");
    const mean = document.querySelector("input.mean");
    // 자동입력을쓰면 번역한 t_word 값을 넣는거라, 인풋이 발생하지않아서
    let event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });

    // 버튼 못쓰게 되어버리니까 번역된뜻 집어넣을때 input 이벤트 발생한걸로 쳐서
    // 버튼 다시 활성화되게..
    mean.dispatchEvent(event); // input 강제발생
  }
});
