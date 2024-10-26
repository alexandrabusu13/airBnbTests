Cypress.Commands.add('visitPage' , () =>{
    const customHeaders = {
        'Accept-Language': 'en-US,en',
    };
    cy.visit(Cypress.env('app_url'), {
        headers: customHeaders
    })
})
