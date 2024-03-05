document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('ul');
    const update = document.querySelector('input.update');

    menu?.addEventListener('click', (e) => {
        const target = e.target;
        if (target.className === 'logout') {
            alert('로그아웃 되었습니다.');
            document.location.href = 'setting/logout';
        }
    });
    const toggle = document.querySelector('input.check');
    const toggleActive = localStorage.getItem('active');

    toggle.checked = toggleActive === 'true'; // 문자열 "true"를 받으면 true로 변환

    toggle.addEventListener('click', async (e) => {
        console.log(toggle.checked);

        if (toggle.checked) {
            localStorage.setItem('active', 'true');
            alert('비공개 전환 후 해제하면 모든 단어장이 공개됩니다◠‿◠');
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
