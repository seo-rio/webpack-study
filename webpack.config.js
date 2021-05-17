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
  module: {
    rules: [
      {
        test: /\.js$/, // loader가 처리해야할 파일의 패턴 작성 js확장자로 끝나는 모든 파일은 loader를 사용하겠다.
        use: [path.resolve("./my-webpack-loader.js")], // 사용할 loader 명시
      },
    ],
  },
};
