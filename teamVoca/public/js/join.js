document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.join.input');
    const btn_join = document.querySelector('input.join');

    const div_error = document.querySelectorAll('div.error');

    const input_id = document.querySelector('input.id');
    const input_pw = document.querySelector('input.pw');
    const input_pwcheck = document.querySelector('input.pwcheck');
    const input_nick = document.querySelector('input.nick');
    const input_file = document.querySelector('input.image');
    const preview_file = document.querySelector('img');

    const DIV_INDEX = {
        ID: 0,
        PW: 1,
        PWCHECK: 2,
        NICK: 3,
    };

    preview_file.addEventListener('click', () => {
        input_file.click();
    });

    const imagePreView = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const fileURL = e.target.result;
            preview_file.src = fileURL;
        };
        fileReader.readAsDataURL(file);
    };

    input_file?.addEventListener('change', imagePreView);

    const id_check = document.querySelector('button.idcheck');
    id_check?.addEventListener('click', async () => {
        const response = await fetch(`/${input_id.value}/check`);
        const json = await response.json();
        if (json.MESSAGE === 'NOT FOUND') {
            div_error[DIV_INDEX.ID].innerHTML = '사용 가능한 ID 입니다.';
            input_pw.select();
        } else {
            div_error[DIV_INDEX.ID].innerHTML = '이미 등록된 사용자 입니다.';
            input_id.select();
            return false;
        }
    });

    btn_join?.addEventListener('click', async () => {
        if (btn_join.value === '회원가입') {
            div_error.forEach((item) => (item.innerHTML = ''));
            if (!input_id.value) {
                div_error[DIV_INDEX.ID].innerHTML = '아이디를 입력해주세요';
                input_id.select();
                return false;
            } else {
                const response = await fetch(`/${input_id.value}/check`);
                const json = await response.json();
            }

            if (input_id.value.length > 20) {
                div_error[DIV_INDEX.ID].innerHTML = '20자내로 입력해주세요';
                input_id.select();
                return false;
            }

            if (!input_pw.value) {
                div_error[DIV_INDEX.PW].innerHTML = '비밀번호를 입력해주세요';
                input_pw.select();
                return false;
            }
            if (!input_pwcheck) {
                div_error[DIV_INDEX.PWCHECK].innerHTML = '비밀번호 확인을 해주세요';
                return false;
            }
            if (input_pwcheck.value !== input_pw.value) {
                div_error[DIV_INDEX.PWCHECK].innerHTML = '비밀번호 확인이 일치하지 않습니다';
                input_pwcheck.select();
                return false;
            }
            if (!input_nick.value) {
                div_error[DIV_INDEX.NICK].innerHTML = '사용할 닉네임을 입력해주세요';
                input_nick.select();
                return false;
            }
            if (input_nick.value.length > 20) {
                div_error[DIV_INDEX.NICK].innerHTML = '20자내로 입력해주세요';
                input_nick.select();
                return false;
            }
        }
        form.submit();
    });
});
