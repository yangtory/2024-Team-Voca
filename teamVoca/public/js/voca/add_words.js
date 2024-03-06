
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

document.addEventListener("DOMContentLoaded",()=>{
    const trans = document.querySelector("button.trans");

    trans.addEventListener("click",()=>{
        document.location.href = "/voca/serach";
    })

})