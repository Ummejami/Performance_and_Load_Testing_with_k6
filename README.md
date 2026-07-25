# k6 Performance Testing Assignment

This repository contains the solution for the **Road to SDET - Batch 18** Performance Testing Assignment using **k6**.

## Assignment Overview

### Question 1: Daily Finance API Performance Test

Automated performance testing of the Daily Finance APIs.

### Workflow

1. Login as Admin
2. Extract JWT access token
3. Fetch all users
4. Select a random user
5. Get user details by ID
6. Print selected user's information
7. Measure API response time

### APIs Tested

| Method | Endpoint |
|---------|----------|
| POST | `/api/auth/login` |
| GET | `/api/user/users` |
| GET | `/api/user/{id}` |

### Validations

- Login API returns **200**
- Get Users API returns **200**
- Get User By ID API returns **200**
- Selected User ID matches searched User ID

### k6 Tags

- Admin Login API
- Get All Users API
- Get User By ID API

### Thresholds

| API | Threshold |
|------|-----------|
| Admin Login API | p(95) < 600 ms |
| Get All Users API | p(95) < 800 ms |
| Get User By ID API | p(95) < 600 ms |

---
## Summary Report Screenshot

![Task 1 Summary Report](./Screenshot/Task1(1).png)
![Task 1 Summary Report](./Screenshot/Task1(2).png)
![Task 1 Summary Report](./Screenshot/Task1(3).png)
![Task 1 Summary Report](./Screenshot/Task1(4).png)
![Task 1 Summary Report](./Screenshot/Task1(5).png)

# Question 2: DemoQA BookStore Performance Test

Performance testing of the DemoQA BookStore API using a staged load pattern.

### API Tested

```
GET https://demoqa.com/BookStore/v1/Books
```

### Load Pattern

| Stage | Duration | Virtual Users |
|--------|----------|---------------|
| Ramp Up | 20s | 0 → 10 |
| Constant Load | 30s | 10 |
| Ramp Up | 20s | 10 → 25 |
| Constant Load | 30s | 25 |
| Ramp Down | 20s | 25 → 0 |

### Validations

- Response Status = 200
- Response contains books
- Response time < 600 ms
- Total books printed in console

### Thresholds

- 95% of requests complete below **600 ms**
- Failed request rate below **1%**

---

# HTML Reports

HTML reports are generated automatically using **k6-reporter**.

Example:

```
Task1_summary.html
Task2_summary.html
```

---
## Summary Report Screenshot

![Task 2 Summary Report](./Screenshot/Task2(1).png)
![Task 2 Summary Report](./Screenshot/Task2(2).png)
![Task 2 Summary Report](./Screenshot/Task2(3).png)
![Task 2 Summary Report](./Screenshot/Task2(4).png)

# Project Structure

```
k6-performance-testing/
│
├── Task1_script.js
├── Task2_script.js
│  
│
│
├── .gitignore
└── README.md
```

---

# Generate HTML Report

Both scripts generate an HTML report using:

```javascript
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "Task_summary.html": htmlReport(data),
    };
}
```

---

# Run the Tests

## Task 1

```bash
k6 run Task1_script.js
```

## Task 2

```bash
k6 run Task2_script.js
```

---

# Technologies Used

- k6
- JavaScript (ES6)
- k6 Reporter

---
