# React Search Application

This is a simple React application that allows users to search for TV shows using the TVMaze API. The application is designed to fetch search results and display them in a user-friendly interface.

## Features

- Search for TV shows by name.
- Display search results with show titles.
- Provide user feedback during loading and error states.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (v6 or later) - comes with Node.js

### Setup and Installation
Clone this repository, install dependencies and start the development server

## Usage
Type the name of a TV show in the input box and click "Search".
The application will fetch shows matching your query and display the results.
The search functionality uses a simulated API call for demonstration. Adjust the search logic within the SearchScreen component to integrate with a real API if needed.

## Coding task:
As part of the assessment, you are required to complete the following task within a time span of maximum two hours:
- Add a UI to your own flavour to the search page
- Handle API Calls: Implement and integrate real API calls using the existing searchShows function from apiService.
- Error Handling and User Feedback: Enhance the application’s error handling. Provide detailed feedback to users when network errors occur.  
- Detailed Show Page: Create a detailed view for each show when clicked, displaying more information fetched from the API.
- Pagination or Infinite Scroll (optional): Implement basic pagination or infinite scrolling for the search results if time permits.

## Submission
To submit your completed project, follow these steps:
1. **Clone this project**:
    - open a terminal and command to the directory where you want to clone the repository
    - git clone https://github.com/ruudkalis/series-search-starter.git 
2. **Create a Private Repository**:
    - Create a new private repository on GitHub.
    - Ensure the repository visibility is set to "Private."
3. **Push Your Code**:
    - Add the remote URL of the private repository to your local project:
      ```bash
      git remote add origin <your-private-repo-url>
      git push -u origin main
      ```
4. **Grant Access**:
    - Go to the "Settings" of your private repository on GitHub.
    - Under "Collaborators and teams," invite the reviewer (e.g., recruiter or hiring manager) by their GitHub username or email.
5. **Share the Repository Link**:
    - Provide the private repository link to the reviewer, ensuring they have access.
 

