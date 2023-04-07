/// <reference types="Cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import PageFactory from '../pages/PageFactory';


Then('the user visualizes that the name of the item shown on the Checkout Overview is: {string}', (itemName: string) => {
    PageFactory.getCurrentPageObject('Checkout: Overview')
        .getElement('itemName')
        .should('have.text', itemName);
});
