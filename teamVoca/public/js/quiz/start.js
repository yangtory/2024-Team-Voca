// 퀴즈 event
/*
0. fetch 로 json 받아오기
1. word_box 에 단어 띄우기
2. res_box 의 값과 비교해서 정답 여부 확인
3. next 버튼을 누르면 오답이 되고 다음 단어가 나온다
*/

document.addEventListener('DOMContentLoaded', () => {
    const word_box = document.querySelector('p.word');
    const quiz_section = document.querySelector('section.body');
    const comment = document.querySelector('p.comment');
    const res_box = document.querySelector('input.res');
    const correct_btn = document.querySelector('input.correct');
    const btn_box = document.querySelector('div.btn.next');

    const getWord = async () => {
        // v_seq 가져오고 단어 리스트 json 받아오기
        const w_vseq = quiz_section.dataset.vseq;
        const response = await fetch(`/quiz/getword/${w_vseq}`);
        const data = await response.json();

        if (data.message) {
            alert(data.message);
        } else {
            word_box.innerText = data.WORD.w_mean;
        }
    };

    const nextWord = async () => {
        const w_vseq = quiz_section.dataset.vseq;
        const response = await fetch(`/quiz/nextword/${w_vseq}`);
        const data = await response.json();

        if (data.message) {
            alert(data.message);
        } else {
            getWord();
        }
    };

    getWord();
    btn_box.addEventListener('click', (e) => {
        const target = e.target;
        if (target.className === 'next') {
            nextWord();
        }
    });
});
