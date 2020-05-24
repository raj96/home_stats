module.exports = {
  //   distDir: "build",
  exportPathMap: async function (defaultPathMap) {
    return {
      "/": { page: "/" },
    };
  },
};
