var config = {
    development: {
        server: {
            port: 3000,
        },
        database: {
            url: 'mongodb://localhost/e4-generated_dev'
        }
    },
    testing: {
        server: {
            port: 3001
        },
        database: {
            url: 'mongodb://localhost/e4-generated_test'
        }
    },
    production: {
        server: {
            port: 8080
        },
        database: {
            url: 'mongodb://localhost/e4-generated'
        }
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];