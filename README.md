# chargen-ui

[![Build status](https://ci.appveyor.com/api/projects/status/xb44gjr03xuw7exf?svg=true)](https://ci.appveyor.com/project/tomizechsterson/chargen-ui)
[![Coverage Status](https://coveralls.io/repos/github/tomizechsterson/chargen-ui/badge.svg)](https://coveralls.io/github/tomizechsterson/chargen-ui)

This project is a UI frontend that allows the user to go through the process of creating a character for tabletop RPG's. It won't truly implement the FULL process, since ultimately, this is a toy project that I'm using to work on some things:

- [ReactJS](https://reactjs.org/)
- [Jest](https://jestjs.io/en/)
- [Testing Library](https://testing-library.com/)
- [Sinon](https://sinonjs.org/)
- More JavaScript in general, especially with ES6 and ES2017
  - Specifically async/await and promises
- TDD'ing React components (and really, TDD on the UI side in general)
- Microservices (more of just an exposure really... I hysterically underestimated the size of the frontend in comparison to the size of the backend on this project)

This means that skill selection and a few other things probably won't be implemented. However, if you're so inclined (and want some practice in the above list of things), you're welcome to submit a PR for something that I leave out.

## Getting Started

I've been developing this on Windows, but using non-Microsoft tools, so this should build and run without too much fuss on all OS's

### Prerequisites
 
Be sure to have the latest versions of these installed:
- [Git](https://git-scm.com/)
   - This is what you need to pull the code down to your machine and submit changes to the repo
- [NodeJS](https://nodejs.org/en/)
  - This will allow you to run the `npm`-related commands to run tests and start the dev server

### Installing

- Make a folder for the code and run `git clone https://github.com/tomizechsterson/chargen-ui`
  - This will pull down the latest version of the code and copy it into the `chargen-ui` folder
- Navigate into this folder with your terminal of choice
- Run `npm install` to pull down all the dev dependencies
- You will also need the services from the [CharGen][1] project running on their default port in order for any features beyond creating and deleting characters to work (i.e. rolling stats, selecting race/class). Just follow the steps in that project's readme to get them downloaded and running.
- As an option, you can use the services from the [chargen-nancy][2] project instead. Just make sure to update the URL's found in the `ApiUrls.js` file to point to the address on which they listen for requests.
 
At this point, you should have everything you need to fire up your IDE of choice and start tinkering around. If not, feel free to open an issue and I'll see what I can do.

### Running the App

Simply run `npm start` in your terminal of choice at the root of the project, and this will start up the development server and attempt to open your default browser to view the app.

**Note for Brave users:** For some reason Brave has trouble with this, but you can just as easily surf to the localhost address manually to view the app in this browser.
 
## Running the Tests
 
Simply run `npm test` in the project's root folder and that will start up the test runner. By default, it will monitor for changed files and run the tests that are related to them after they're saved. This can be changed by following the on-screen instructions.
 
You can also run `npm test -- --coverage` to see the current test coverage (yes, there is an extra `--` in there). See [this article][3] for more details
 
## Contributing
 
If you'd like to contribute, feel free to open a PR with the changes you'd like to make, and I'll be happy to review it. I can't promise to be timely, but I will certainly try :)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[1]: https://github.com/tomizechsterson/CharGen
[2]: https://github.com/tomizechsterson/chargen-nancy
[3]:https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#coverage-reporting
