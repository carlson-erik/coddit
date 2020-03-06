# Coddit.dev
**An app that renders reddit as code.** Coddit sorts all of the functions you'll need to enjoy reddit. Coddit renders in several programming languages and several color schemes. The user can config their Coddit "editor" to look exactly how they want.

<!-- 
    This **does not** support (yet) user interactions such as voting, private messaging, moderator abilities, etc. 
-->

## Reddit Features
* Reddit routing (/r/SUBNAME, /r/SUBNAME/comments/COMMENTID, /user/USERNAME)
* Post View
    * Post Preview
    * Comment Sorting (new, top, hot, etc)
    * All markdown renders as it would on reddit
* Subreddit View
    * Post Sorting (new, top, hot, etc)
    * Post filtering by time frame  ("past hour", "past 24 hours", "past week", etc)
    * Custom Post Page Limit (10, 25, 50, 100)
    * Show all Post Previews
* User View
    * View user profile data
    * View user activty data (comments and posts)

## "Editor" Features
* Render in the following programming languages:
    * Python
    * C#
    * JavaScript (ES6)
* Preview Posts
    * Self Text 
    * Image
        * Supported direct image link types:
            1. gif
            2. gifv
            3. jpg
            4. png
        * Supported host sites:
            1. [giphy](https://giphy.com/)
* Color Schemes
    * [One Dark](https://github.com/atom/one-dark-syntax)
    * [One Light](https://github.com/atom/one-light-syntax)
    * [Material Theme Darker High Contrast](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)

## Getting Started
These instructions will get you a copy of this project up and running on your local machine for development, testing and general usage purposes.

### Setup
Clone this repo to your desktop and run ```npm install``` to install all the dependencies.

### Usage
Use ```npm start``` to start the application on your local computer for general usage, development and testing purposes. You will then be able to access it at localhost:3000.

**Note:** This application hasn't been deployed yet and I haven't researched how to do it. I will add a deployment section once I've done so.

## Built With
* [Reddit API](https://www.reddit.com/dev/api/) - The API used to gain access to Reddit.
* [React](https://reactjs.org/) - The web framework used
* [Redux](https://redux.js.org/) - State Management

## Contributing
This project is a learning project for me so I will not be accepting pull requests. If you find bugs or have issues with this project, please make use of **Issues** feature of Github and I will address them as soon as I can.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/carlson-erik/coddit/tags). 

## License
This project is licensed under the GNU GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details.