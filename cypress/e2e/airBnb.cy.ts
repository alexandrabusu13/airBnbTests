import SearchPage from "../pages/SearchPage";
import RoomDetailsPage from "../pages/RoomDetailsPage"

describe('Sector labs Test', () => {
    let testData;
    let checkInDate: number;
    let checkInMonth: number;
    let checkOutDate: number;
    let checkOutMonth: number;
    let apartmentReducedPriceText;
    const numberOfDays = 7;
    const currentDate = new Date();
    const fullYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    const currentMonth = (currentDate.getMonth() + 1);
    const numberOfDaysForCheckIn = (currentDay + numberOfDays);
    const daysInCurrentMonth = () => {
        // Set the date to the first day of the next month, then go back one day
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }

    // calculates the check in Date
    const calculateCheckInDate = () => {
        if (numberOfDaysForCheckIn > daysInCurrentMonth()) {
            checkInDate = numberOfDaysForCheckIn - daysInCurrentMonth();
            checkInMonth = currentMonth + 1;

            return [checkInDate, checkInMonth]
        } else {
            checkInDate = numberOfDaysForCheckIn;
            checkInMonth = currentMonth
            return [checkInDate, checkInMonth]
        }
    };

    const numberOfDaysForCheckOut = (calculateCheckInDate()[0] + numberOfDays);

    // calculates the checkout Date
    const calculateCheckoutDate = () => {
        if (numberOfDaysForCheckOut > calculateCheckInDate()[0] && checkInMonth === currentMonth) {
            checkOutDate = numberOfDaysForCheckOut;
            checkOutMonth = currentMonth;

            return [checkOutDate, checkOutMonth]
        } else {
            checkOutDate = numberOfDaysForCheckOut;
            checkOutMonth = currentMonth + 1
            return [checkOutDate, checkOutMonth]
        }
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const checkInMonthString = months[calculateCheckInDate()[1] - 1];
    const checkOutMonthString = months[calculateCheckoutDate()[1] - 1];

    // gets the week day
    function getWeekday(dateString: string): string {
        const date = new Date(dateString); // create a Date object
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return daysOfWeek[date.getDay()]; // map the day number to the day name
    }

    const fullCheckinDate = `${fullYear}-${calculateCheckInDate()[1]}-${checkInDate}`;
    const fullCheckoutDate = `${fullYear}-${calculateCheckoutDate()[1]}-${checkOutDate}`;

    const houseType = ["Entire rental unit in", "Entire condo in", "Private room in rental unit in", "Entire home in"];
    const fullResultTitle = houseType.map(type => `${type} ${location}`)

    before(() => {
        cy.fixture('testData').then((data) => {
            testData = data;
        });
    })

    beforeEach(() => {
        cy.visitPage();
        SearchPage.locationInput().should('be.visible');
        SearchPage.locationInput().click().type(testData.location).type('{enter}');
        SearchPage.checkInInput().click();
        // select check in Date
        SearchPage.checkInDate(calculateCheckInDate()[0], getWeekday(fullCheckinDate), checkInMonthString, fullYear).click();

        // select check out Date
        SearchPage.checkOutDate(checkOutDate, getWeekday(fullCheckoutDate), checkOutMonthString, fullYear).click();
        SearchPage.addGuestsInput().click();
        for (let i = 0; i < testData.numberOfAdults; i++) {
            SearchPage.increaseNoOfAdults().click();
        }

        for (let i = 0; i < testData.numberOfChildren; i++) {
            SearchPage.increaseNoOfChildren().click();
        }
        SearchPage.searchButton().click();
    })


    it('Test1: Verify that the results match the search criteria', () => {
        // aici mai trebe sa ma uit sa verific ca is in roma si ca au cel putin loc de 3 pers
        expect(SearchPage.searchResultsContainer().should('be.visible'))
    })

    it('Test 2: Verify that the results and details page match the extra filters', () => {
        SearchPage.filtersButton().click();
        for (let i = 0; i < testData.numberOfBedrooms; i++) {
            SearchPage.increaseNoOfBedrooms().click();
        }

        SearchPage.showMoreButton().click();
        SearchPage.poolButton().click();
        SearchPage.applyFilters().click();

        cy.wait(2000)
        SearchPage.numberOfBedroomsSearchResults().invoke('text').then((text) => {
            const number = parseInt(text.match(/\d+/)[0]); // Extract the first number in the text and parse it
            if (number === testData.numberOfBedrooms) {
                expect(number).to.equal(testData.numberOfBedrooms);
            } else {
                expect(number).to.be.greaterThan(testData.numberOfBedrooms);
            }

        });

        // to open the page on the same tab I normally use removeAttr target, but in this case it didn't work
        SearchPage.searchResultsContainer().first().invoke('attr', 'href').then((href) => {
            cy.visit(`${Cypress.env('app_url')}/${href}`, {
                headers: {'Accept-Language': 'en-US,en'}
            });
        })

        // in incognito a translations modal is displayed
        SearchPage.closeTranslationsModal().click();
        RoomDetailsPage.showAllAmenities().click();
        RoomDetailsPage.amenitiesSectionHeader().contains("Parking and facilities").scrollIntoView();

        expect(RoomDetailsPage.poolElement().should('be.visible'));
    })

    it('Test 3: Verify that a property is displayed on the map correctly', () => {
        RoomDetailsPage.reducedPrice().then(() => {
            if (RoomDetailsPage.reducedPrice().first().should('be.visible')) {
                return RoomDetailsPage.reducedPrice().first().invoke('text');
            } else {
                return RoomDetailsPage.initialPrice().first().invoke('text');
            }
        }).then((text) => {
            apartmentReducedPriceText = text;
        });

        SearchPage.apartmentsImages().first().trigger('mouseover');
        expect(RoomDetailsPage.pricePillColourDiv().should('have.css', 'background-color', 'rgb(34, 34, 34)'))

        RoomDetailsPage.apartmentPillPrice().first().click();

        // will check the reduced price from the first search result equals the one from the map card
        RoomDetailsPage.apartmentContainerFromMap().then(() => {
            expect(RoomDetailsPage.reducedPrice().should('contain', apartmentReducedPriceText));
        })

        // will check the initial price from the first search result equals the one from the map card
        RoomDetailsPage.initialPrice().first().invoke('text').then((text) => {
            RoomDetailsPage.apartmentContainerFromMap().then(() => {
                expect(RoomDetailsPage.initialPrice().should('contain', text))
            })
        });

        // will check the title of the first search result equals the one from the opened map card
        RoomDetailsPage.apartmentHeader().first().invoke('text').then((text) => {
            RoomDetailsPage.apartmentContainerFromMap().then(() => {
                expect(RoomDetailsPage.apartmentHeader().should('contain', text))
            })
        });

        // will check the first detail of the first search result equals the one from the opened map card
        RoomDetailsPage.apartmentDetails(0).invoke('text').then((text) => {
            RoomDetailsPage.apartmentContainerFromMap().then(() => {
                expect(RoomDetailsPage.apartmentDetails(0).should('contain', text))
            })
        });

        // will check the second/last detail of the first search result equals the one from the opened map card
        RoomDetailsPage.apartmentDetails(1).invoke('text').then((text) => {
            RoomDetailsPage.apartmentContainerFromMap().then(() => {
                expect(RoomDetailsPage.apartmentDetails(1).should('contain', text))
            })
        });
    })
})
