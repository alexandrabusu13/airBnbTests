class RoomDetailsPage {
    apartmentHeader() {
        return cy.get('div.gltso3m div.t1jojoys');
    }

    apartmentDetails(index) {
        return cy.get('div.fvu8mpv div.lxq01kf div.fb4nyux span').eq(index);
    }

    showAllAmenities() {
        return cy.get('div.b9672i7 button.l1ovpqvx');
    }

    amenitiesSectionHeader() {
        return cy.get('section div._11jhslp h2');
    }

    poolElement() {
        return cy.get('#pdp_v3_parking_facilities_7_3511488-0-row-title');
    }

    apartmentPillPrice() {
        return cy.get('button.czgw0k9 span [aria-hidden="true"]');
    }

    initialPrice() {
        return cy.get('div._1jo4hgw span._1aejdbt');
    }

    reducedPrice() {
        return cy.get('div._1jo4hgw span._11jcbg2');
    }

    pricePillColourDiv() {
        return cy.get('button.czgw0k9 div div');
    }

    apartmentContainerFromMap() {
        return cy.get('div.fvu8mpv div.lxq01kf');
    }
}

export default new RoomDetailsPage();
