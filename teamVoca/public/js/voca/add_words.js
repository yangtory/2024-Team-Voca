// 좀이상함
document.addEventListener("DOMContentLoaded",()=>{

    const add = document.querySelector("button.add");

    const input_check = async () =>{
        const word = document.querySelector("input.word");
        const mean = document.querySelector("input.mean");
        if(word.value === "") {
            word.focus();
            alert("영어단어를 입력해주세요")
            return false;
        } else if(mean.value === ""){
            mean.focus();
            alert("단어 뜻을 입력해주세요")
            return false;
        }

    }
    add.addEventListener("click",input_check)


  
})