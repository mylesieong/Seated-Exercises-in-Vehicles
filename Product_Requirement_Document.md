# Product Requirement Document (Seated Fitness)

## Value Proposition
_Its the core value of the product_
* Provide exercises to users with limited space that reduces pain and numbness or higher fitness purpose

## Customer Segmentation
_The targeted customers of the product_
* Office workers (Persona: Claire)
* People with long commutes (Persona: David)
* People who travels (Persona: Vanessa)

## Features
_Describe what the product can do from a technical perspective_
* Exercise
    * test case: When [Open app], user can see exercise options by different formats
    * test case: When [Open app]>[click on exercise card], user can see an exercise overview
    * test case: When [Open app]>[click on exercise card]>[click start], user can see steps of exercises and details
    * test case: When [Open app]>[click on exercise card]>[click start]>[click next and click back], user is able to navigate back and forth among steps in an exercise
    * test case: When [Open app]>[click on exercise card]>[click start]>[stay in one step for more than 1 minutes without touching screen], app should still have screen on
    * test case: When [Open app]>[click on exercise card]>[click start]>[click next until finish], user see a finish page and there are buttons to start over or back to home
    * test case: When [user has no internet], user is still able to perform above actions
* Exercise Scheduling
    * TODO
* Browse History & Stats
    * test case: When [Open app]>[Navigate to history], user can see an overview of exercise record
    * test case: When [Open app]>[Navigate to history]>[select a date], user can see details of exercise record by specific date
* Manage records
    * test case: When [Open app]>[Navigate to setting], user can see a reset button with clear description
    * test case: When [Open app]>[Navigate to setting]>[click on reset], user can clear all records

## User story
_Describe what the product can do from a user's point of view_
* As Claire, I want to have a scheduled stretching session throughout the day, so that I can ease my back pain
* As David, I want to access to some seat-friendly core exercises, so that I make most of my long commute time
* As Vanessa, I want to do in- seat stretching in low key, so that I can ease my back pain while not looking weird to others on plane

## UX Flow & Design Notes
* _See figma_

## System & Environment Requirements
* Support both android and iOS with React Native
* User only use on mobile devices

## Assumptions, Constraints & Dependencies
* Users may have unstable internet connection
* Users use app on small devices (not tablet or tv)
* Content and exercise should be accessible even when offline
* Users are not familiar with exercise and fitness