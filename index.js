const logger = require("./winston");

const test = () => {

    const done = () => {
        setTimeout(() => {
            test();
        }, 100);
    };
    
    logger.debug("testing log")
    done()
};

test();
