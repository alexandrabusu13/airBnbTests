import './commands';

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            visitPage(): Chainable;
        }
    }
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});
