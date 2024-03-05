const getWords = async (search) => {
    const KOGPT_URL = 'https://dapi.kakao.com/v2/search/web';

    const prompt = `${search}`;

    const body = {
        query: prompt,
        // max_tokens: 20, // 생성할 결과의 최대 토큰 수
        // temparature: 1, // 온도 설정
        // top_p: 1, // 상위 확률 결정
        // n: 1, // 생성할 결과 수(쿼터 차감)
    };

    // kogpt API 호출
    const response = await fetch(KOGPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: 'KakaoAK ' + '7dbc1d9c6ab536a62d349b555586eb97', // API Key
        },

        body: JSON.stringify(body),
    });

    return await response.json();

    // console.log(json);
};

export { getWords };
