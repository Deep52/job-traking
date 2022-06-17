var config = {
    development: {
        user: "postgres",
        database: "job-tracking",
        password: "12345",
        host: "localhost",
        port: 5432,
    },
    production: {
        user: "qbz21rgu",
        database: "qbz21rgu",
        password: "CourseHouseMinute01-",
        host: "cmpstudb-01.cmp.uea.ac.uk",
        port: 5432,
        idleTimeoutMillis: 3000
    },
};

module.exports = config;