const path = require("path");

module.exports = {
    mode: "production",
    devtool: "inline-source-map",
    entry: {
        background: "./src/main/background.ts",
        main: "./src/main/index.ts",
        options: "./src/options/options.ts"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "dist/[name].js"
    }
};
