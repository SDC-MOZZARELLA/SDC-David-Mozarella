import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 1 },
    { duration: '2m', target: 10 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 }
  ],
  rps: 1000
}

export default function() {
  let res = http.get('http://localhost:5050/api/movie');
  check(res, {
    "status 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
}