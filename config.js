var config = {
    serverport: 3000,
    livereloadport: 35729,
    paths: {
        lib: {
            css: [
                'bower_components/bootstrap-sass/dist/css/bootstrap.css',
                'bower_components/bootstrap-sass/dist/css/bootstrap-theme.css'
            ],
            js: [
                'bower_components/bootstrap-sass/dist/js/bootstrap.js',
                'bower_components/jquery/dist/jquery.js'
            ]
        },
        app: {
            views: './views',
            scss: 'public/scss',
            css: 'public/css',
            js: 'public/js'
        }
    }
};

module.exports = config;