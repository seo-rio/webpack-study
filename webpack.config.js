const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"), // node의 path 모듈을 가져와 절대경로를 삽입한다.
    filename: "[name].js", // 번들링된 파일명을 설정 [name]은 entry에서 설정한 key값인 main이 들어간다.
  },
};
