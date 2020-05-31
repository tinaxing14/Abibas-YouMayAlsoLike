import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomShoe, randomUser } from "./randomIds.js"

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
}

const BASE_URL = 'http://localhost:3002/api/shoes'; 

export default () => {
  let landPage= http.get(`${BASE_URL}/${randomShoe()}/relatedproducts`);
  check(landPage, {
    "status was 200": (res) => res.status === 200,
    "content was ok": (res) => JSON.parse(res.body).relatedProducts.length === 12
  });

  var likeShoe = JSON.stringify({
    id: randomShoe(),
    userid: randomUser(),
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let postLikes = http.post(`${BASE_URL}`, likeShoe, params);
  check(postLikes, {
    "status was 201": (res) => res.status === 201
  });
  sleep(1)
}

