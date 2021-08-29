
describe("ToDo List Tests", () => {

    beforeEach(function () {
        cy.server();
        cy.visit("/");
    });

    it("Login Successful", () => {
        cy.title().should('include', 'ToDo List');
        cy.get('#btn-login').should('contain', 'Entrar');
        cy.contains('INICIA SESIÓN');
        cy.contains('Tu email');
        cy.contains('Tu contraseña');
        cy.get('#username')
            .type('test@example.com')
            .should('have.value', 'test@example.com');
        cy.get('#userpass')
            .type('12345678')
            .should('have.value', '12345678');
        cy.contains('Entrar').click();
        cy.url().should('include', 'index/1');
        cy.contains('tareas');
        cy.contains('Salir');
    });

    it("Login Error", () => {
        cy.title().should('include', 'ToDo List');
        cy.get('#btn-login').should('contain', 'Entrar');
        cy.contains('INICIA SESIÓN');
        cy.contains('Tu email');
        cy.contains('Tu contraseña');
        cy.get('#username')
            .type('test@example.com')
            .should('have.value', 'test@example.com');
        cy.get('#userpass')
            .type('123')
            .should('have.value', '123');
        cy.contains('Entrar').click();
        cy.contains('INICIA SESIÓN');
        cy.contains('Tu email');
        cy.contains('Tu contraseña');
    });

    it("Create a new task", () => {
        cy.title().should('include', 'ToDo List');
        cy.get('#btn-login').should('contain', 'Entrar');
        cy.contains('INICIA SESIÓN');
        cy.contains('Tu email');
        cy.contains('Tu contraseña');
        cy.get('#username')
            .type('test@example.com')
            .should('have.value', 'test@example.com');
        cy.get('#userpass')
            .type('12345678')
            .should('have.value', '12345678');
        cy.contains('Entrar').click();
        cy.url().should('include', 'index/1');
        cy.contains('tareas');
        cy.contains('Salir');

        cy.contains('Crear tarea').click();
        cy.contains('Crear tarea');
        cy.get('#task-name')
            .type('My New Test Task')
            .should('have.value', 'My New Test Task');
        cy.get('#task-description')
            .type('Creating New Automatic Task With Cypress')
            .should('have.value', 'Creating New Automatic Task With Cypress');
        cy.get('#button-save-task').click();
        cy.contains('Tareas');
        cy.contains('My New Test Task');

    });

});
