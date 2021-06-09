// import * as math from "./math.js";

// console.log(math.sum(1, 2));

import './app.css';
import nyancat from './nyancat.jpg';

import axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {
  const res = await axios.get('/api/users');
  console.log(res);
  document.body.innerHTML = (res.data || [])
    .map(user => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join('');
  // document.body.innerHTML = `<img src="${nyancat}" /> `;
});

// console.log(process.env.NODE_ENV);
// console.log(TWO);
// console.log(api.domain);
