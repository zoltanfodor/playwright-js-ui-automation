Feature: EPAM site
  As a webinar attendee
  I want to write test for EPAM career site
  So that I can practice Cucumber

  Scenario Outline: Search for a job
    Given The Epam Career page is opened
    Then The page is opened
    And The search form is visible

    When Click on Location filter box
    And Select `<Country>` / `<City>`
    Then The Location filter box should contain <City>

    When Click on Department filter box
    And Select <Department> element
    Then The Department filter box should contain "Selected: 1" tile

    When Click on Search button
    Then The `<PositionName>` position should be visible
    And The department of the position should be `<Department>`
    And The location of the position should be `<City>`, `<Country>`
    And There should be an Apply button for the `<PositionName>` position

    When Click on Apply button of <PositionName>
    Then The Job description should contain `<City>`
    And The Job description should contain `<PositionName>`

    Examples:
      | # | Country | City     | Department                | PositionName             |
      | 1 | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer |
      | 2 | Belarus | Minsk    | Software Architecture     | Java Solution Architect  |
    # Note: Test Automation Architect has been changed to Java Solution Architect in the data due to there is no open position for that currently
