document.addEventListener("DOMContentLoaded",()=>{
    const voca_btn = document.querySelector("button.voca_update");
    
    voca_btn.addEventListener("click",()=>{
        const v_seq = voca_btn.dataset.v_seq;
        document.location.href = `/voca/${v_seq}/update`;
    })
})

document.addEventListener("DOMContentLoaded",()=>{

    const word_btns = document.querySelectorAll("button.word_update");

    word_btns.forEach((btn) => {
        btn.addEventListener("click",()=>{
            const w_seq = btn.dataset.w_seq;
            document.location.href = `/voca/${w_seq}/words/update`;
        })
    })
})
