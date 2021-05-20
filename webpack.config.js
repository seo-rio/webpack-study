const path = require("path");
// const MyWebpackPlugin = require("./my-webpack-plugin");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    // rules: [
    //   {
    //     test: /\.js$/, // loader가 처리해야할 파일의 패턴 작성 js확장자로 끝나는 모든 파일은 loader를 사용하겠다.
    //     use: [path.resolve("./my-webpack-loader.js")], // 사용할 loader 명시
    //   },
    // ],
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      // {
      //   test: /\.(png|jpg)$/,
      //   loader: "file-loader",
      //   options: {
      //     publicPath: "./dist/", // 파일로더가 처리하는 파일을 모듈로 사용했을 때 경로앞에 추가되는 문자열 우리는 아웃풋 경로가 dist가 사용되었기 때문에 dist를 추가
      //     name: "[name].[ext]?[hash]", // 파일로더가 아웃풋에 복사할때 사용되는 파일명을 설정할 때 사용
      //   },
      // },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
        options: {
          // publicPath: "./dist/",
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb
        },
      },
    ],
  },
  plugins: [
    // new MyWebpackPlugin()
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin({}),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
  ],
};
