document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('ul');
    const popup = document.querySelector('div.bg');
    const update = document.querySelector('input.update');
    const slide = document.querySelector('label.switch');

    popup.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.className === 'close') {
            popup.style.display = 'none';
            slide.style.opacity = '1';
        }
        if (target.className === 'buy') {
            const m_id = target.closest('DIV').dataset.id;
            confirm('정말 구매할까요?');
            document.location.replace(`/setting/pro/${m_id}`);
        }
    });
    menu?.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.className === 'logout') {
            alert('로그아웃 되었습니다.');
            document.location.href = 'setting/logout';
        }
        if (target.className === 'pro') {
            popup.style.display = 'block';
            slide.style.opacity = '0.2';
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

    toggle?.addEventListener('click', async (e) => {
        console.log(toggle.checked);

        if (toggle.checked) {
            localStorage.setItem('active', 'true');
            alert('모든 단어장이 비공개되었습니다◝(・▿・)◜');
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
