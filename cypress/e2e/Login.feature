Feature: Login
  As a User, I want to be able to sign into SwagLabs application.

  Scenario Outline: User logs into application correctly
    Given the user has navigated to SwagLabs "Home" page
    When the user inputs valid data into "Login" form
      | username | <username> |
      | password | <password> |
    And the user clicks on "LOGIN" button
    Then the user is redirected to "Inventory" page
    
    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      | locked_out_user         | secret_sauce |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |















  Scenario: User visualizes error messages after inputting invalid data
    Given the user has navigated to Membrane Demo "Sign In" page
    Then the user visualizes "Next" button is inactive
    When the user unfocus the "Email" field on "Sign In" page
    Then the user visualizes "This field is required" error message below the "Email" field on "Sign In" page
    When the user unfocus the "Password" field on "Sign In" page
    Then the user visualizes "This field is required" error message below the "Password" field on "Sign In" page
    When the user inputs invalid format data on the "Email" field on "Sign In" page
    Then the user visualizes "Invalid email format" error message below the "Email" field on "Sign In" page
    When the user fills all fields with wrong data on "Sign In" page
    Then the user visualizes "Next" button is active
    When the user clicks on "Next" button
    Then the user visualizes "Wrong email or password, try again." on "Sign In" popup message
