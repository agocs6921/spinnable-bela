const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

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
            sourcemap: true,
            watch: true,
            platform: "browser"
        });
    } catch(err) {}
})();