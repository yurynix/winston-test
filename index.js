const logger = require("./winston");

const test = () => {

    const done = () => {
        setTimeout(() => {
            test();
        }, 1);
    };
    
    logger.debug("testing log")
    done()
};


test();
