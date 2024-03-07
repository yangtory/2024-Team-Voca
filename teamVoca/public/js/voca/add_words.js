
document.addEventListener("DOMContentLoaded",()=>{
    const word = document.querySelector("input.word");
    const mean = document.querySelector("input.mean");
    const btn = document.querySelector("button.add");

    const input =()=> {
        // 둘다 적어야 활성화
        if(word.value !== "" && mean.value !== "") {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    }

    // 단어랑 뜻 적었으면..
    word.addEventListener("input", input);
    mean.addEventListener("input", input);
});



// ----------------------------- 번역 버튼 --------------


// document.addEventListener("DOMContentLoaded", ()=>{
//     const trans_autobutn = document.querySelector("button.auto");
//     trans_autobutn.addEventListener("click",(e)=>{
//         const word = document.querySelector("input.word");
//         if(word.value === ""){
//             alert("먼저 영어단어를 입력하세요 !!")
//         }else {
//             const trans_input = document.querySelector("input.trans")
//             trans_input.value = word.value;
//             const trans_realbtn = document.querySelector("button.trans")
//             trans_realbtn.click();
//         }
//     })
// })

document.addEventListener("DOMContentLoaded", ()=>{
    const trans_autobutn = document.querySelector("button.auto");
    trans_autobutn.addEventListener("click",(e)=>{
        const word = document.querySelector("input.word");
        if(word.value === ""){
            alert("먼저 영어단어를 입력하세요!!\n영어단어를 한국어 뜻으로 자동생성합니다")
        }else {
            const trans_input = document.querySelector("input.trans")
            trans_input.value = word.value;
            const trans_realbtn = document.querySelector("button.trans")
            trans_realbtn.click();

            // 영어단어칸 입력 저장 
            localStorage.setItem('e_word', word.value);
        }
    })

    // 페이지 로드 시 저장된 영어단어 불러오기// 임시로 저장했다가
    const savedWord = localStorage.getItem('e_word');
    const wordInput = document.querySelector(".word");
    if (savedWord) {
        wordInput.value = savedWord;
    }
});
