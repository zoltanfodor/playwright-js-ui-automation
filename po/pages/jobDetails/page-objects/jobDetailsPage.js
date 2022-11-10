import * as selectors from '../selectors.json';

exports.JobDetailsPage = class JobDetailsPage {
    constructor(page) {
        this.page = page;
        this.url = '/job-listings';
    };

    async isJobDetailsPageLoaded() {
        const currentURL = await this.page.url();
        const isDescriptionVisible = await this.page.locator(selectors['Job Description']).isVisible();
        return (isDescriptionVisible && currentURL.includes(this.url));
    }
}