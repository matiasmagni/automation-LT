# automation-LT

Code Challenge: E2E test on the sign-in, sign-up pages and the login endpoint response.

#### Table of contents

* [Get started](#get-started)
  * [Installation](#installation)
  * [Configuration](#configuration)
* [How to organize the tests](#how-to-organize-the-tests)
  * [Single feature files](#single-feature-files)
  * [Bundled features files](#bundled-features-files)
  * [Step definitions](#step-definitions)
    * [Step definitions creation](#step-definitions-creation)
* [How to write tests](#how-to-write-tests)
  * [Cucumber Expressions](#cucumber-expressions)
  * [Given/When/Then functions](#cucumber-functions)
  * [Data table parameters](#data-table-parameters)
  * [Custom Parameter Type Resolves](#custom-parameter-type-resolves)
  * [Before and After hooks](#before-and-after-hooks)
  * [Background section](#background-section)
  * [Sharing context](#sharing-context)
  * [Smart tagging](#smart-tagging)
* [How to run the tests](#how-to-run-the-tests)
  * [Running tagged tests](#running-tagged-tests)
  * [Ignoring specific scenarios using tags when executing test runner](#ignoring-specific-scenarios-using-tags-when-executing-test-runner)
  * [Output](#output)
* [IDE support](#ide-support)
  * [Visual Studio Code](#visual-Studio-Code)

## Get started

### Installation

Install the framework:

```shell
yarn install
```

### Configuration

Please make use of [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to create a configuration for the plugin, for example, by adding this section to your package.json:

```json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true
}
```

*This will become the default option in a future version*

#### Configuration option

Option | Default value | Description
------------ | ------------- | -------------
commonPath | `cypress/integration/common` when `nonGlobalStepDefinitions` is true <br> `cypress/support/step_definitions` when `nonGlobalStepDefinitions` is false <br> `${nonGlobalStepBaseDir}/common` when `nonGlobalStepBaseDir` is defined | Define the path to a folder containing all common step definitions of your tests. When `nonGlobalStepBaseDir` is defined this path is defined from that base location. e.g `${nonGlobalStepBaseDir}/${commonPath}`.
nonGlobalStepDefinitions | false | If true use the Cypress Cucumber Preprocessor Style pattern for placing step definitions files. If false, we will use the "oldschool" (everything is global) Cucumber style.
nonGlobalStepBaseDir| undefined | If defined and `nonGlobalStepDefinitions` is also true then step definition searches for folders with the features name will start from the directory provided here. The cwd is already taken into account. e.g `test/step_definitions`.
stepDefinitions | `cypress/integration` when `nonGlobalStepDefinitions` is true <br> `cypress/support/step_definitions` when `nonGlobalStepDefinitions` is false | Path to the folder containing our step definitions.

## How to organize the tests

### Single feature files

Put the feature files in `cypress/integration/`

Example: cypress/integration/Shop.feature

```gherkin
Feature: Shop
  As a User, I want to be able to buy a product after being previously added to the shopping cart.


  Scenario Outline: User adds a product to the shopping cart and finishes the order successfully
    Given the user has already logged into Swag Labs
      | username | <username> |
      | password | <password> |
    When the user adds the "<productName>" product to the cart
    Then the user visualizes the value 1 in the "Shopping Cart Badge"
    When the user clicks on "Products" page's "Shopping Cart Icon"
    Then the user is redirected to "Your Cart" page
    And the user visualizes that the name of the item added to the cart is: "<productName>"
    When the user clicks on "Checkout" button
    Then the user is redirected to "Checkout: Your Information" page
    When the user inputs valid data into "Checkout: Your Information" form
      | First Name  | <firstName>  |
      | LastName    | <lastName>   |
      | Postal Code | <postalCode> |
    And the user clicks on "Continue" submit button
    Then the user is redirected to "Checkout: Overview" page
    And the user visualizes that the name of the item shown on the Checkout Overview is: "<productName>"
    When the user clicks on "Finish" button
    Then the user is redirected to "Checkout: Complete!" page

    Examples:
      | username      | password     | productName         | firstName | lastName | postalCode |
      | standard_user | secret_sauce | Sauce Labs Backpack | Matias    | Magni    | 5519       |
```

### Bundled features files

When running Cypress tests in a headless mode, the execution time can get pretty bloated, this happens because by default Cypress will relaunch the browser between every feature file.
The **cypress-cucumber-preprocessor** gives you the option to bundle all feature files before running the tests, therefore reducing the execution time.

You can take advantage of this by creating `.features` files. You choose to have only one in the root of the directory `cypress/integrations` or per directory.

You also have to add support for `.features` files to your Cypress configuration

`cypress.json`

```json
{
  "testFiles": "**/*.{feature,features}"
}
```

### Step definitions

**This is the RECOMMENDED way**

#### Step definitions creation

The `.feature` file will use steps definitions from a directory with the same name as your `.feature` file. The javascript files containing the step definitions can have other names if you want to break them into different concerns.

Easier to show than to explain, so, assuming the feature file is in `cypress/integration/Shop.feature` , as proposed above, the preprocessor will read all the files inside `cypress/integration`, so:

`cypress/support/step_definitions/Common.js` (or any other .js file in the same path)

```javascript
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
```

## How to write tests

### Cucumber Expressions

We use <https://docs.cucumber.io/cucumber/cucumber-expressions/> to parse your .feature file, please use that document as your reference

<a name="cucumber-functions"></a>

### Given/When/Then functions

Since Given/When/Then are on global scope please use

```javascript
/* global Given, When, Then */
```

to make IDE/linter happy or import them directly as shown in the above examples.

### Data table parameters

To create steps that use gherkin data tables, the step definition needs to take an object and handle it like in these examples: [Example Feature](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/blob/master/cypress/integration/DataTable.feature), [Example Step Definition](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/blob/master/cypress/support/step_definitions/dataTable.js).

### Custom Parameter Type Resolves

Thanks to @Oltodo we can now use Custom Parameter Type Resolves.
Here is an [example](cypress/support/step_definitions/customParameterTypes.js) with related [.feature file](cypress/integration/CustomParameterTypes.feature)

### Before and After hooks

The **cypress-cucumber-preprocessor** supports both Mocha's `before/beforeEach/after/afterEach` hooks and Cucumber's `Before` and `After` hooks.

The Cucumber hooks implementation fully supports tagging as described in [the cucumber js documentation](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md). So they can be conditionally selected based on the tags applied to the Scenario. This is not possible with Mocha hooks.

Cucumber Before hooks run after all Mocha before and beforeEach hooks have completed and the Cucumber After hooks run before all the Mocha afterEach and after hooks.

Example:

```javascript
const {
  Before,
  After,
  Given,
  Then
} = require("cypress-cucumber-preprocessor/steps");

// this will get called before each scenario
Before(() => {
  beforeCounter += 1;
  beforeWithTagCounter = 0;
});

// this will only get called before scenarios tagged with @foo
Before({ tags: "@foo" }, () => {
  beforeWithTagCounter += 1;
});

Given("My Step Definition", () => {
  // ...test code here
})
```

Note: to avoid confusion with the similarly named Mocha before and after hooks, the Cucumber hooks are not exported onto global scope. So they need explicitly importing as shown above.

### Background section

Adding a background section to your feature will enable you to run steps before every scenario. For example, we have a counter that needs to be reset before each scenario. We can create a given step for resetting the counter.

```javascript
let counter = 0;

Given("counter has been reset", () => {
  counter = 0;
});

When("counter is incremented", () => {
  counter += 1;
});

Then("counter equals {int}", value => {
  expect(counter).to.equal(value);
});
```

```gherkin
Feature: Background Section
  
   Background:
    Given counter has been reset

   Scenario: Basic example #1
     When counter is incremented
     Then counter equals 1

   Scenario: Basic example #2
     When counter is incremented
     When counter is incremented
     Then counter equals 2
```

### Sharing context

You can share context between step definitions using `cy.as()` alias.

Example:

```javascript
Given('I go to the add new item page', () => {
  cy.visit('/addItem');
});

When('I add a new item', () => {
  cy.get('input[name="addNewItem"]').as('addNewItemInput');
  cy.get('@addNewItemInput').type('My item');
  cy.get('button[name="submitItem"]').click();
})

Then('I see new item added', () => {
  cy.get('td:contains("My item")');
});

Then('I can add another item', () => {
  expect(cy.get('@addNewItemInput').should('be.empty');
});

```

For more information please visit: <https://docs.cypress.io/api/commands/as.html>

### Smart tagging

Start your tests without setting any tags. And then put a @focus on the scenario (or scenarios) you want to focus on while development or bug fixing.

For example:

```gherkin
Feature: Smart Tagging

  As a cucumber cypress plugin which handles Tags
  I want to allow people to select tests to run if focused
  So they can work more efficiently and have a shorter feedback loop

  Scenario: This scenario should not run if @focus is on another scenario
    Then this unfocused scenario should not run

  @focus
  Scenario: This scenario is focused and should run
    Then this focused scenario should run

  @this-tag-affects-nothing
  Scenario: This scenario should also not run
    Then this unfocused scenario should not run

  @focus
  Scenario: This scenario is also focused and also should run
    Then this focused scenario should run
```

## How to run the tests

To run the tests:

```shell
yarn test
```

To run the tests on all supported browsers (Chrome, Firefox and Edge):

```shell
yarn test:all-browsers
```

To run the tests using online Cypress' dashboard:

```shell
yarn test:dashboard
```

To run the test using Cypress electron app:

```shell
yarn debug
```

To clean all the generated HTML reports:

```shell
yarn clean:reports
```

### Running tagged tests

You can use tags to select which test should run using [cucumber's tag expressions](https://github.com/cucumber/cucumber/tree/master/tag-expressions).
Keep in mind we are using newer syntax, eg. `'not @foo and (@bar or @zap)'`.
In order to initialize tests using tags you will have to run cypress and pass TAGS environment variable.

Example:

```shell
  ./node_modules/.bin/cypress-tags run -e TAGS='not @foo and (@bar or @zap)'
```

Please note - we use our own cypress-tags wrapper to speed things up.
This wrapper calls the cypress executable from local modules and if not found it falls back to the globally installed one.
For more details and examples please take a look to the [example repo](https://github.com/TheBrainFamily/cypress-cucumber-example).

### Ignoring specific scenarios using tags when executing test runner

You can also use tags to skip or ignore specific tests/scenarios when running cypress test runner (where you don't have the abilitiy to pass parameters like in the examples above for the execution)

The trick consists in adding the "env" property with the "TAGS" subproperty in the cypress.json configuration file. It would look something like this:

```javascript
{
    "env": {
        "TAGS": "not @ignore"
    },
    //rest of configuration options
    "baseUrl": "yourBaseUrl",
    "ignoreTestFiles": "*.js",
    //etc
}
```

Then, any scenarios tagged with @ignore will be skipped when running the tests using the cypress test runner

### Limiting to a subset of feature files

You can use a glob expression to select which feature files should be included.

Example:

```shell
  ./node_modules/.bin/cypress-tags run -e GLOB='cypress/integration/**/*.feature'
```

### Output

The **cypress-cucumber-preprocessor** can generate a `cucumber.json` file output as it runs the features files. This is separate from, and in addition to, any Mocha reporter configured in Cypress.

These files are intended to be used with one of the many available Cucumber report generator packages.
Seems to work fine with both <https://github.com/jenkinsci/cucumber-reports-plugin> and <https://github.com/wswebcreation/multiple-cucumber-html-reporter>

Output, by default, is written to the folder `cypress/cucumber-json`, and one file is generated per feature.

This behaviour is configurable. Use [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) to create a configuration for the plugin, see step definition discussion above and add the following to the cypress-cucumber-preprocessor section in package.json to turn it off or change the defaults:

```
  "cypress-cucumber-preprocessor": {
    "cucumberJson": {
      "generate": true,
      "outputFolder": "cypress/reports",
      "filePrefix": "",
      "fileSuffix": ".cucumber"
    }
  }
```

## IDE support

### Visual Studio Code

To get vscode to resolve your steps, install the [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) extension from the marketplace.

You will also need to tell the extension the locations of your feature and step definition files [as described here](https://github.com/alexkrechik/VSCucumberAutoComplete#settings-example).

Note, that unlike WebStorm which will correctly identify multiple implementations of matching steps, the vscode extension currently resolves to the first matching occurence it finds on its path.
