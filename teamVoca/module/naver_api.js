import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_BOOK_URL } from '../config/naver_secret.js';

const getWords = async (search) => {
    const naverFetchOption = {
        method: 'GET',
        headers: {
            'X-Naver-Client-Id': NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
    };
    let queryString = `${NAVER_BOOK_URL}?query=${search}&display=10`;
    let res = null;
    try {
        res = await fetch(queryString, naverFetchOption);
        return (await response.json()).item;
    } catch (error) {
        return res.json(error);
    }
};

export { getWords };
