class MyWebpackPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap("My Plugin", (stats) => {
    //   console.log("My Plugin: done");
    // });
    compiler.plugin('emit', (compilation, callback) => {
      const source = compilation.assets['main.js'].source(); // compilation 객체 통해서 웹팩이 번들링한 결과물에 접근을 할 수 있다. main.js에 접근
      compilation.assets['main.js'].source = () => {
        const banner = [
          '/**',
          ' * 이것은 BannerPlugin이 처리한 결과입니다.',
          ' * Build Date: 2021-05-20',
          ' */',
        ].join('\n');
        return `${banner}\n\n${source}`;
      };

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
