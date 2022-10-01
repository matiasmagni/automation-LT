/// <reference types="Cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { WAIT_TIME_PAGE_LOAD, WAIT_TIME_UNFOCUS } from '../../../config.json';
import { getRandomElementFrom, getRandomEmail } from '../../utils/random';
import App from '../App';
import NotFoundError from '../errors/NotFoundError';
import BasePage from '../pages/BasePage';
import PageFactory from '../pages/PageFactory';

Given('the user has navigated to SwagLabs {string} page', (pageName: string) => {
    PageFactory.getCurrentPageObject(pageName).navigateToThisPage(30);
    cy.wait(WAIT_TIME_PAGE_LOAD);
});

When('the user clicks on {string} button', (buttonName: string) => {
    BasePage.getButtonByName(buttonName).click();
});

When('the user inputs valid data into {string} form', (pageName: string, table: any)  => {
    const data: any = table.rowsHash();
    //cy.log('TABLE rows:', table.rows());
    //cy.log('TABLE hashes:', table.hashes());
    //cy.log('TABLE raw:', table.raw());
    //cy.log('TABLE rowsHash:', table.rowsHash());
    const page: BasePage = PageFactory.getCurrentPageObject(pageName);
    page.getElement('usernameInput')?.type(data.username);
    page.getElement('passwordInput')?.type(data.password);
});

Then('the user is redirected to {string} page', (pageName: string) => {
    const regex = new RegExp(`${PageFactory.getCurrentPageObject(pageName).getUrl()}$`);
    cy.url().should('match', regex);
});
