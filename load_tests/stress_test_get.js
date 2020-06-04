import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomShoe } from "./randomIds.js"

export let options = {
  stages: [
    { duration: '3m', target: 1500},
  ],

  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
}

const BASE_URL = 'http://18.188.234.135:4200/api/shoes'; 

export default () => {
  var random = Math.random();
  var landPage;
  if(random < 0.5) {
    landPage= http.get(`${BASE_URL}/${Math.floor(Math.random() * 50000)}/relatedproducts`);
  } else {
    landPage= http.get(`${BASE_URL}/${Math.floor(Math.random() * 10000)}/relatedproducts`);
  }
  check(landPage, {
    "status was 200": (res) => res.status === 200,
    "content was ok": (res) => JSON.parse(res.body).relatedProducts.length === 12
  });

  
  sleep(1)
}