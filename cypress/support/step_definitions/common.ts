/// <reference types="Cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { WAIT_TIME_PAGE_LOAD, WAIT_TIME_UNFOCUS } from '../../../config.json';
import { getRandomElementFrom, getRandomEmail } from '../../utils/random';
import App from '../App';
import NotFoundError from '../errors/NotFoundError';
import BasePage from '../pages/BasePage';
import PageFactory from '../pages/PageFactory';

const navigate = (pageName: string) => {
    PageFactory.getCurrentPageObject(pageName).navigateToThisPage(30);
    //cy.wait(WAIT_TIME_PAGE_LOAD);
};

const fillForm = (pageName: string, table: any)  => {
    const data: any = table.raw();
    /*
    cy.log('TABLE rows:', table.rows());
    cy.log('TABLE hashes:', table.hashes());
    cy.log('TABLE raw:', table.raw());
    cy.log('TABLE rowsHash:', table.rowsHash());
    */
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);

    for (let field of data) {
        page.getElement(field[0])?.type(field[1]);
    }
};

const click = (pageName: string, elementName: string) => {
    PageFactory.getCurrentPageObject(pageName)
        .getElement(elementName)
        .click();
};

const clickButton = (buttonName: string) => {
    BasePage.getSubmitButtonByName(buttonName).click();
};

const verifyPageNavigation = (pageName: string) => {
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);
    // Verify correct URL
    const regex = new RegExp(`${page.getUrl()}$`);
    cy.url().should('match', regex);
    // Verify correct title
    page.getElement('title').should('have.text', pageName);
};

Given('the user has navigated to Swag Labs {string} page', navigate);

Given('the user has already logged into Swag Labs', (table: any) => {
    const pageName = 'Login';
    // Login steps grouping
    navigate(pageName);
    fillForm(pageName, table);
    clickButton('Login');
    verifyPageNavigation('Products');
});

When('the user clicks on {string} button', clickButton);

When("the user clicks on {string} page's {string}", click);

When('the user inputs valid data into {string} form', fillForm);

Then('the user is redirected to {string} page', verifyPageNavigation);
