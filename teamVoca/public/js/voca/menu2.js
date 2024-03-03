// 단어장 안 단어보기
document.addEventListener("DOMContentLoaded",()=>{
    const voca_boxes = document.querySelectorAll("div.voca_box");

    voca_boxes.forEach((voca_box) => {
        voca_box.addEventListener("click",(e)=>{
            const target = e.target;

                const voca_seq = target.closest("SECTION").dataset.v_seq;
                document.location.href = `/voca/${voca_seq}/words`;
        })
    });
})

// 단어장 삭제
document.addEventListener("DOMContentLoaded",()=>{

    const delete_btns = document.querySelectorAll("button.delete")

})