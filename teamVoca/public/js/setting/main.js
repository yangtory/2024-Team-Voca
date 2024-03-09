document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('ul');
    const update = document.querySelector('input.update');

    menu?.addEventListener('click', async (e) => {
        const popup = document.querySelector('div.bg');
        const slide = document.querySelector('label.switch');
        const target = e.target;
        if (target.className === 'logout') {
            alert('로그아웃 되었습니다.');
            document.location.href = 'setting/logout';
        }
        if (target.className === 'pro') {
            popup.style.display = 'block';
            slide.style.opacity = '0.3';
        }
        if (target.className === 'drop') {
            const id = target.dataset.id;
            confirm('정말 탈퇴할까요?');
            document.location.replace(`/setting/drop/${id}`);
        }
    });

    const toggle = document.querySelector('input.check');
    const toggleActive = localStorage.getItem('active');

    toggle.checked = toggleActive === 'true'; // 문자열 "true"를 받으면 true로 변환

    toggle.addEventListener('click', async (e) => {
        console.log(toggle.checked);

        if (toggle.checked) {
            localStorage.setItem('active', 'true');
            alert('모든 단어장이 비공개되었습니다 ◠‿◠');
            document.location.href = 'setting/toggle';
        } else {
            console.log('false');
            localStorage.setItem('active', 'false');
            alert('모든 단어장이 공개되었습니다◝(・▿・)◜');
            document.location.href = 'setting/toggleoff';
        }
    });

    update.addEventListener('click', () => {
        const m_id = update.dataset.id;
        document.location.href = `setting/${m_id}/update`;
    });
});
