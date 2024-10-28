# Star Wars Hero Map

[DEMO](https://star-wars-map.vercel.app/)

## Description of the project

This web application allows users to view a list of Star Wars characters and detailed information about the spaceships and movies associated with each character. React.js is used to build the interface and React Flow to visualize information in the form of a graph.

## Basic requirements

- **Hero List**: Using the [sw-api.starnavi.io](https://sw-api.starnavi.io/documentation) API, display a paginable or infinite scrollable list of all Star Wars heroes.
- **Detailed information about the hero**: When clicking on a specific hero, display detailed information in the form of a graph, where:
 - The main note is the chosen hero.
 - There are connections from the hero to the films in which he appears.
 - From each film there are connections to spaceships on which the hero traveled.

## Technologies

- **React.js**
- **React Flow**
- **TypeScript**
- **Jest** (for testing)

## Starting the project

To start the project, execute the following commands:

```bash
# Clone the repository
git clone https://github.com/your-login/starnavi-test.git

# Go to the project directory
cd starnavi-test

# Install dependencies
npm install

# Run the project
npm start

# Running tests
npm test

