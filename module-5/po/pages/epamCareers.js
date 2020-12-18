'use strict'

class EpamCareers {
    constructor(driver, url) {
        this.driver = driver;
        this.url = url;
    }

    navigate() {
        return this.driver.get(this.url);
    }
}

module.exports = EpamCareers;
