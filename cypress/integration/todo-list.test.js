
describe("ToDo List Tests", () => {

    beforeEach(function () {
        cy.server();
        cy.visit("/");
    });

    it("Login Home Page", () => {
        cy.title().should('include', 'ToDo List');
        cy.get('#btn-login').should('contain', 'Entrar');
    });

});
