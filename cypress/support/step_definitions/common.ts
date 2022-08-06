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

Then('the user is redirected to {string} page', (pageName: string) => {
    const regex = new RegExp(`${PageFactory.getCurrentPageObject(pageName).getUrl()}$`);
    cy.url().should('match', regex);
});
