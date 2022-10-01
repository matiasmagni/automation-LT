/// <reference types="Cypress" />
import { When } from 'cypress-cucumber-preprocessor/steps';
import PageFactory from '../pages/PageFactory';

When('the user clicks on LOGIN button', () => {
    PageFactory.getCurrentPageObject('Login').getElement('loginButton')?.click();
});
