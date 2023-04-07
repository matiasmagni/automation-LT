Feature: Shop
  As a User, I want to be able to buy a product after being previously added to the shopping cart.


  Scenario Outline: User adds a product to the shopping cart and finishes the order successfully
    Given the user has already logged into Swag Labs
      | username | <username> |
      | password | <password> |

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      #| problem_user            | secret_sauce |
      #| performance_glitch_user | secret_sauce |
