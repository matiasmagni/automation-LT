/// <reference types="Cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import PageFactory from '../pages/PageFactory';


Then('the user visualizes that the name of the item added to the cart is: {string}', (itemName: string) => {
    PageFactory.getCurrentPageObject('Your Cart')
        .getElement('itemName')
        .should('have.text', itemName);
});
