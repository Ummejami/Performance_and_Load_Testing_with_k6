import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
  vus: 1,
  iterations: 1,

  thresholds: {
    'http_req_duration{name:Admin Login API}': ['p(95)<600'],
    'http_req_duration{name:Get All Users API}': ['p(95)<800'],
    'http_req_duration{name:Get User By ID API}': ['p(95)<600'],
  },
};

const BASE_URL = 'https://dailyfinanceapi.roadtocareer.net/api';

const adminCredentials = {
  email: 'admin@test.com',
  password: 'admin123',
};

export default function () {

  
  //................................ 1. Admin Login ......................................
  

  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify(adminCredentials),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: {
        name: 'Admin Login API',
      },
    }
  );

  console.log(`Login API Response Time: ${loginRes.timings.duration} ms`);

  check(loginRes, {
    'Login Status is 200': (res) => res.status === 200,
  });

  const token = loginRes.json().token;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  
  // ....................... 2. Get All Users........................................
  

 const usersRes = http.get(
    `${BASE_URL}/user/users`,
    {
      headers,
      tags: {
        name: 'Get All Users API',
      },
    }
  );
 //console.log("User List Response:");
 //console.log(usersRes.body);
 //console.log(JSON.stringify(usersRes.json(), null, 2));
 console.log(`User List API Response Time: ${usersRes.timings.duration} ms`);

  check(usersRes, {
    'User List Status is 200': (res) => res.status === 200,
  });

const response = usersRes.json();

//console.log(typeof response);
//console.log(Array.isArray(response));
//console.log(response.length);


  
  //................................... 3. Select Random User.............................
  


const randomIndex = Math.floor(Math.random() * response.length);
const selectedUser = response[randomIndex];
const userId = selectedUser._id;


/*console.log("Selected User:");
console.log(JSON.stringify(selectedUser, null, 2));
console.log("User ID:", userId);*/

  
  // ................................. 4. Search User By ID.....................................
  

  const userRes = http.get(
    `${BASE_URL}/user/${userId}`,
    {
      headers,
      tags: {
        name: 'Get User By ID API',
      },
    }
  );
console.log(`User List API Response Time: ${userRes.timings.duration} ms`);
const user = userRes.json();

check(userRes, {
  'User Details Status is 200': (res) => res.status === 200,
  'Selected user id matches searched user id': () =>
    user._id === userId,
});


  

  
  //.......................... 5. Print User Information...........................
  

  console.log('==============================');
  console.log(`ID          : ${user._id}`);
  console.log(`Name        : ${user.firstName} ${user.lastName}`);
  console.log(`Email       : ${user.email}`);
  console.log(`Phone Number: ${user.phoneNumber}`);
  console.log('==============================');
}


export function handleSummary(data) {
  return {
    "Task1_summary.html": htmlReport(data),
  };
}