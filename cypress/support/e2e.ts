import './commands';

declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            visitPage(): Chainable;
        }
    }
}
