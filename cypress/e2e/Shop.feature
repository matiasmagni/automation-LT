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
#| problem_user            | secret_sauce |
#| performance_glitch_user | secret_sauce |
