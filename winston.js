let winston = require('winston');


const genTimestamp = () =>  {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
};

const genLogRow = (options) => {
    // Return string will be passed to logger.
    return options.level.toUpperCase() + ' ' + options.timestamp() + '  ' + (options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? " " + JSON.stringify(options.meta) : '' );
};

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    colorize: true,
    json: false,
    level: 7,
    timestamp: genTimestamp,
    formatter: genLogRow
});

winston.add(winston.transports.File, {
    filename: "logs/somename.log",
    maxsize: 1000,
    maxFiles: 3,
    tailable: true,
    level: "debug",
    json: false,
    timestamp: genTimestamp,
    formatter: genLogRow,
    zippedArchive: true
});

// usage: logger.error(message), logger.info(message). The log levels are:
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

module.exports = winston;
