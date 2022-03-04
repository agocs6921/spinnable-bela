const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { argv } = require("process");

const ISDEV = argv[2] === "dev";

(async () => {
    try {
        await build({
            entryPoints: {
                "./public/js/bundle": "./src/app.ts",
                "./public/css/bundle": "./src/sass/style.sass"
            },
            outdir: ".",
            plugins: [
                sassPlugin()
            ],
            bundle: true,
            minify: true,
            sourcemap: ISDEV,
            watch: ISDEV,
            platform: "browser"
        });
    } catch(err) {}
})();