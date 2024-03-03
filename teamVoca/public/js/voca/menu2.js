
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
