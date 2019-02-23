
const path = require("path");

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: {
        background: "./src/main/background.js",
        main: "./src/main/index.js",
        options: "./src/options/options.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "dist/[name].js"
    }
};
