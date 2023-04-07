/// <reference types="Cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import PageFactory from '../pages/PageFactory';
import { toKebabCase } from 'cypress/utils/string';

When('the user adds the {string} product to the cart', (productName: string) => {
    PageFactory.getCurrentPageObject('Products')
        .getElementBySearchParam('addProductToCartButton', productName)?.click();
});

Then('the user visualizes the value {int} in the {string}', (value: number, badgeName: string) => {
    PageFactory.getCurrentPageObject('Products')
        .getElement(badgeName)
        .should('have.text', value);
});
