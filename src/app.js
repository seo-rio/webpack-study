/** 핫 모듈 리플레이스먼트 적용일 필요없는 코드 */
// import * as math from "./math.js";

// console.log(math.sum(1, 2));

// import './app.css';
// import nyancat from './nyancat.jpg';

// import axios from 'axios';

// document.addEventListener('DOMContentLoaded', async () => {
//   const res = await axios.get('/api/users');
//   console.log(res);
//   document.body.innerHTML = (res.data || [])
//     .map(user => {
//       return `<div>${user.id}: ${user.name}</div>`;
//     })
//     .join('');
//   // document.body.innerHTML = `<img src="${nyancat}" /> `;
// });

// // console.log(process.env.NODE_ENV);
// // console.log(TWO);
// // console.log(api.domain);

/** 핫 모듈 리플레이스먼트 적용을 위한 코드 */
import form from './form';
import result from './result';

let resultEl;
let formEl;
document.addEventListener('DOMContentLoaded', async () => {
  formEl = document.createElement('div');
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement('div');
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

if (module.hot) {
  console.log('핫 모듈 켜짐');

  module.hot.accept('./result', async () => {
    console.log('result 모듈 변경됨');
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept('./form', () => {
    console.log('form 모듈 변경됨');
    formEl.innerHTML = form.render();
  });
}
