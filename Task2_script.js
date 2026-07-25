import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
    stages: [
        { duration: '20s', target: 10 }, // Ramp up to 10 VUs
        { duration: '30s', target: 10 }, // Stay at 10 VUs
        { duration: '20s', target: 25 }, // Ramp up to 25 VUs
        { duration: '30s', target: 25 }, // Stay at 25 VUs
        { duration: '20s', target: 0 },  // Ramp down to 0 VUs
    ],

    thresholds: {
        http_req_duration: ['p(95)<600'], // 95% of requests < 600ms
        http_req_failed: ['rate<0.01'],   // Failed request rate < 1%
    },
};

const BASE_URL = 'https://demoqa.com/BookStore/v1/Books';

export default function () {
    const response = http.get(BASE_URL);

    const body = response.json();

    check(response, {
        'Status is 200': (r) => r.status === 200,

        'Response contains books': (r) =>
            body.books &&
            Array.isArray(body.books) &&
            body.books.length > 0,

        'Response time < 600ms': (r) =>
            r.timings.duration < 600,
    });

    console.log(`Total Books: ${body.books.length}`);
}

export function handleSummary(data) {
  return {
    "Task2_summary.html": htmlReport(data),
  };
}