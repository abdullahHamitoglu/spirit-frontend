module.exports = {
  devServer: {
    contentBase: "./app",
    compress: true,
    proxy: {
      "/graphql": {
        target: "https://http://localhost:4000/graphql",
        secure: false,
      },
    },
  },
};
