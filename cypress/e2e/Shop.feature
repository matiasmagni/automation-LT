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

    Examples:
      | username      | password     | productName         |
      | standard_user | secret_sauce | Sauce Labs Backpack |
#| problem_user            | secret_sauce |
#| performance_glitch_user | secret_sauce |
