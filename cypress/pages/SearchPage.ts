class SearchPage {
    locationInput() {
        return cy.get('#bigsearch-query-location-input')
        // return cy.get('input[placeholder="Search destinations"]');
    }

    checkInInput() {
        return cy.get('div.b1spesa7[role="button"]').first();
    }

    checkInDate(day, weekDay, month, year) {
        return cy.get(`div [aria-label="${day}, ${weekDay}, ${month} ${year}. Available. Select as check-in date."]`);
    }

    addGuestsInput() {
        return cy.get('div.b1spesa7[role="button"]').last();
    }

    increaseNoOfAdults() {
        return cy.get('[aria-label="increase value"][aria-describedby="searchFlow-title-label-adults"]');
    }

    increaseNoOfChildren() {
        return cy.get('[aria-label="increase value"][aria-describedby="searchFlow-title-label-children"]');
    }

    checkOutDate(day, weekDay, month, year) {
        return cy.get(`div [aria-label="${day}, ${weekDay}, ${month} ${year}. Available. Select as checkout date."]`);
    }

    searchButton() {
        return cy.get('div.snd2ne0 button');
    }

    searchResultsContainer() {
        return cy.get('div[itemprop="itemListElement"] a.l1ovpqvx')
    }

    apartmentsImages() {
        return cy.get('img.itu7ddv')
    }

    filtersButton() {
        return cy.get('div.bocjyl3 button.l1ovpqvx');
    }

    increaseNoOfBedrooms() {
        return cy.get('[aria-label="increase value"][aria-describedby="stepper-filter-item-min_bedrooms-row-title searchFlow-title-label-filter-item-min_bedrooms"]')
    }

    showMoreButton() {
        return cy.get('div.l1j1spus button.l1ovpqvx span')
    }

    poolButton() {
        return cy.get('#filter-item-amenities-7 span').contains('Pool');
    }

    applyFilters() {
        return cy.get('div.ptiimno a').contains("Show");
    }

    numberOfBedroomsSearchResults() {
        return cy.get('div [itemprop="itemListElement"] div.fb4nyux span span[aria-hidden="true"] span').contains(`bedrooms`)
    }

    closeTranslationsModal() {
        return cy.get('button[aria-label="Close"]')
    }
}

export default new SearchPage();
