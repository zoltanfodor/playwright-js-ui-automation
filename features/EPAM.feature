Feature: EPAM site
  As a Test Automation Engineer
  I want to write test for EPAM career site
  So that I can make sure if the page works properly

  Scenario Outline: <n>. Search for a job
    Given The Epam Career page is opened
    Then The page is opened
    And The search form is visible

    When The "Location Filter Box" is clicked
    And The "<Country>" / "<City>" is selected
    Then The "Location Filter Box" text should be "<City>"

    When The "Skills Filter Box" is clicked
    And The "<SkillType>" skill is selected
    Then The "Skills Filter Box Label" text should be "Selected: 1"

    When The "Search Button" is clicked
    Then The "<PositionName>" position should be visible
    And The location of the "<PositionName>" position should contain "<City>", "<Country>"
    And The Apply button for the "<PositionName>" position should be visible

    When Apply button of "<PositionName>" is clicked
    Then The Job Detailed page should be opened
    And The "Job Description" should contain "<PositionName>" text
    And The "Job Description" should contain "DESCRIPTION" text

    Examples:
      | n | Country     | City     | SkillType                              | PositionName                  |
      | 1 | Hungary     | Debrecen | Software, System, and Test Engineering | Lead Test Automation Engineer |
      | 2 | Switzerland | Zurich   | Solution Architecture                  | Data Solution Architect       |
