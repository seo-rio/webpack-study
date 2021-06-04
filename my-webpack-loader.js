module.exports = function myWebpackLoader(content) {
  console.log('myWebpackLoader가 동작함'); // loader가 동작하는지 확인하기 위한 console
  return content.replace('console.log(', 'alert(');
};
