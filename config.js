var config = {
    serverport: 3000,
    livereloadport: 35729,
    paths: {
        lib: {
            css: [
                "bootstrap-sass/dist/css/bootstrap.css",
                "bootstrap-sass/dist/css/bootstrap-theme.css"
            ],
            js: [
                "bootstrap-sass/dist/js/bootstrap.js"
            ]
        },
        app: {
            scss: "public/scss",
            css: "public/css",
            js: [
                "public/js"
            ]
        }
    }
};

module.exports = config;