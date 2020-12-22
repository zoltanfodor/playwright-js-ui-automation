Feature: EPAM site
  As a webinar attendee
  I want to write test for EPAM career site
  So that I can practice Cucumber

  Scenario Outline: Search for a job
    Given The Epam Career page is opened
    Then The page is opened
    And The search form is visible

    When Click on Location Filter Box
    And Select `<Country>` / `<City>`
    Then The Location Filter Box should contain "<City>"

    When Click on Department Filter Box
    And Select <Department> element
    Then The Department Filter Box Label should contain "Selected: 1"

    When Click on Search Button
    Then The `<PositionName>` position should be visible
    And The department of the position should be `<Department>`
    And The location of the position should be `<City>`, `<Country>`
    And There should be an Apply button for the `<PositionName>` position

    When Apply button of <PositionName> is clicked
    Then The "Detailed" page should be opened
    And The "Job Description" should contain "<PositionName>" text
    And The "Job Description" should contain "<City>" text

    Examples:
      | # | Country | City     | Department                | PositionName              |
      | 1 | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer  |
      | 2 | Belarus | Minsk    | Software Architecture     | Python Solution Architect |
    # Note: Test Automation Architect has been changed to Python Solution Architect in the data due to there is no open position for that currently
