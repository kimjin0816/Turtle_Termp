const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const queryParams = {
  query: '흰색 반팔', // 결과 이미지가 나오게 하는 쿼리 값
  display: 20 // 검색 개수
};

const clientId = 'MLN5m3nClexyvNU0pp46';
const clientSecret = 'fOYgb7iZsf';

async function callNaverShoppingAPI() {
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/shop.json', {
      params: queryParams,
      headers: {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret,
        'User-Agent': 'axios/1.6.8',
        'Accept-Encoding': 'gzip, compress, deflate, br'
      }
    });

    return response.data.items.map(item => item.image); // 이미지 URL만 반환
  } catch (error) {
    console.error('네이버 쇼핑 API 호출 오류:', error);
    throw error;
  }
}

app.get('/api/search-images', async (req, res) => {
  try {
    const images = await callNaverShoppingAPI();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
