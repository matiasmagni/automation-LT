Feature: Login
  As a User, I want to be able to sign into Swag Labs application.

  Scenario Outline: User logs into application correctly
    Given the user has navigated to Swag Labs "Login" page
    When the user inputs valid data into "Login" form
      | username | <username> |
      | password | <password> |
    And the user clicks on "Login" button
    Then the user is redirected to "Products" page

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |
