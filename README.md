# Making interactive graphics with D3 and React
An original tutorial for [Journocoders London](https://www.meetup.com/Journocoders/), October 12, 2017.

🚶 David Blood/[@davidcblood](https://twitter.com/davidcblood)/[first] dot [last] at ft.com

## Introduction

Thanks for joining us at this month's Journocoders. We're going to build an interactive data visualisation using two of the world's most popular [JavaScript libraries](https://en.wikipedia.org/wiki/JavaScript_library):

* 📊 [D3.js](https://d3js.org/) is a library that's widely used for building data visualisations. It enables you to [bind data](https://github.com/d3/d3-selection/blob/master/README.md#joining-data) to web elements (usually [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) elements) then control how those elements look based on properties of the bound data. D3 was created by [Mike Bostock](https://twitter.com/mbostock), a former New York Times graphics editor, and is probably the only really indispensable tool for making online dataviz.
* ⚛ [React](https://facebook.github.io/react/) is a library for building user interfaces from self-contained components that automatically update with changes to their underlying data. This component-based approach makes React a popular choice for building anything from basic interactive components all the way up to whole apps. React was created by Facebook, which [looked to be problematic](https://medium.com/@raulk/if-youre-a-startup-you-should-not-use-react-reflecting-on-the-bsd-patents-license-b049d4a67dd2) but [doesn't so much anymore](https://code.facebook.com/posts/300798627056246/relicensing-react-jest-flow-and-immutable-js/).

A selection of D3 + React examples can be found [here](https://react.rocks/tag/D3).

We'll use React to build a simple app featuring a D3 chart with dynamic filters and transitions. This is not an advanced D3 tutorial; instead, the aim is to explore some of the possibilities for interactive development offered by this powerful combination of tools.

### **TODO**: Why React?
* Fast/pluggable/battle-tested: easily compose complex UIs from simple components or plug individual components into other apps and integrate with other technologies
* JSX: syntax for writing HTML-like markup in JavaScript, rendered by React as regular HTML
* Virtual DOM: minimises slow UI updates by comparing current state of your page structure — specifically, its [document object model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), or DOM — to the new, desired state required as a result of interactions, and determines most efficent way to update the DOM. Performance + other benefits e.g. flexibility to do isomorphic rendering

## Before you start
You'll need to ensure you have the software below installed and working. Mac users may wish to install [Homebrew](https://brew.sh/), which will make it quicker and easier to install most of these requirements. I'm assuming Linux users have all this stuff squared away.

### A terminal emulator
macOS | Windows
----- | -------
[iTerm2](https://www.iterm2.com/index.html) | [cmder](http://cmder.net/) (download the ‘full’ as opposed to the ‘mini’ version, as it includes Git)

### Git
macOS | Windows
----- | -------
[Git]()/`brew install git` | [Git]() (unnecessary if you installed the full version of cmder)

### Node.js
macOS | Windows
----- | -------
[Node.js](https://nodejs.org/en/download/)/`brew install node` | [Node.js](https://nodejs.org/en/download/)

### A code editor
macOS | Windows
----- | -------
[Atom](https://atom.io/)/`brew cask install atom` | [Atom](https://atom.io/)
[Sublime Text](https://www.sublimetext.com/3)/`brew cask install sublime-text` | [Sublime Text](https://www.sublimetext.com/3)

## Up and running
Open a terminal and run the command

`cd ~`

Now run

`git clone git@github.com:davidbjourno/making-interactive-graphics.git`

followed by

`cd making-interactive-graphics`

This'll pull down the tutorial project from GitHub into your home directory and ensure you're working in the project directory. We're going to be using [Yarn](https://yarnpkg.com/en/) to manage the various software packages we need for this project, so run

`yarn`

to install all the required Node packages. If Yarn isn't found in your system, run

`npm install --global yarn`

to install it via the Node package manager, then try running it again. When Yarn has finished installing the project dependencies, run

`yarn start`

to start a local web server, then navigate to `localhost:3000` in a browser. You should see this page:

![Welcome to React](images/react-app.png)

This is a simple React app rendering a logo, header and paragraph of text.

The boilerplate code for this project was created by a tool called [Create React App](https://github.com/facebookincubator/create-react-app), which generates a project structure containing everything we need to start developing with React. It doesn't include D3, though, so we'll need to install that using Yarn. While we're at it, let's also install [React-Bootstrap](https://react-bootstrap.github.io/), so our page elements will be styled with [Bootstrap](https://getbootstrap.com/) CSS:

`yarn add d3 react-bootstrap bootstrap@3`

Open the project directory in your code editor (either Atom or Sublime Text) and open the file `src/index.js`. Include the Bootstrap CSS in your app by inserting this at line 4:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

At this point, you're ready to start writing React code.

## The App component
With the project directory open in your code editor, you should see that it has a structure like this:

```
making-interactive-graphics
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── images
│   └── react-app.png
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

Let's take a quick spin through the main files in the project. We've already seen `public/index.html`; it's a standard HTML page with the familiar `<head>` and `<body>` elements. The interesting part, for our purposes, is line 29:

```html
<div id="root"></div>
```

This `<div>` element is the “root” node for the simple app created by Create React App. Everything inside it is rendered and controlled by React. This is established in `src/index.js`, where the key line is:

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

Here, the `render` method from the `react-dom` package (installed into the project by Create React App) is called and passed two arguments separated by a comma:

1. A component to render (`<App />`)
2. A root node, i.e. an element within which to render that component (in this case, the element with the ID of `root` — the `<div>` on line 29 of `public/index.html`)

(I know this is a lot of jargon. Bear with me.)

It's standard practice to have a short `index.js` like this in a React project. Its primary function is to establish an entry point for the app on the page, and a common name for the first component in a React component hierarchy is ‘App’. Hence we render `<App />` to `document.getElementById('root')`, which returns the `<div>` on line 29 of `public/index.html`.

Where does the App component come from? Take a look at the first five rows of `index.js`:

1. `import React from 'react';`: makes the `react` package available for use in this file — pretty crucial for a React app!
2. `import ReactDOM from 'react-dom';`: does the same for the `react-dom` package.
3. `import './index.css';`: loads `src/index.css` as a CSS module for styling page elements.
4. `import 'bootstrap/dist/css/bootstrap.css';` does the same for the Bootstrap CSS.
5. **`import App from './App';`: makes the JavaScript in `src/App.js` available for use in this file (i.e. the App component).**
6. `import registerServiceWorker from './registerServiceWorker';`: not relevant to this tutorial. If you want to learn more about service workers, [this](https://developers.google.com/web/fundamentals/primers/service-workers/) is probably a good place to start.

So the App component starts life as another JavaScript file called, astonishingly, `src/App.js`. Open it up. This is where we start to get into the real, meaty Reacty goodness.

In `App.js`, you'll see some more JavaScript and CSS module imports followed by a [JavaScript class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) called `App`. This class defines the App component.

Not all React components have to be defined by a class; they can also be JavaScript functions that simply return some JSX for rendering. We only have two hours for this tutorial, so I'm going to skip over the details of the differences between the two component types and how they work, but you can always go back and read about them [here](https://reactjs.org/docs/components-and-props.html).

Back in `index.js`, if you edit some of the text inside the `<p>` tags and save the file, you should see the page reload automatically in your browser to reflect your changes. This is because Create React App projects are set up in such a way that they live-reload by default.

Let's take a leap into the unknown and replace the App component with one that manages its own internal [state](https://reactjs.org/docs/react-component.html#state) and will automatically re-render with changes to the data associated with its state. Replace lines 4-19 of `App.js` with this:

```javascript
import { Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { year: '2012' }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ year: value });
  }

  render() {
    const years = ['2012', '2013', '2014', '2015', '2016'];
    const yearButtons = years.map((year) => {
      return <ToggleButton value={year} key={year}>{year}</ToggleButton>
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Col xs={12} md={6} mdPush={2}>
          <h3>Select a year</h3>
          <ToggleButtonGroup type="radio" name="yearButtons" defaultValue={'2012'} onChange={this.handleChange} justified>
            {yearButtons}
          </ToggleButtonGroup>
          <h1>{this.state.year}</h1>
        </Col>
      </div>
    );
  }
}
```

Now your page features a toggle button group which controls the value of the header beneath it. Let's quickly take a closer look at what's going on here:

* Line 4: import some pre-built and pre-styled components from React-Bootstrap.
* Lines 6-16: define a [class constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) that initialises the component, sets its initial state to `{ year: '2012' }` and binds the `handleChange` event handler to the class as a [method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) (which can then be called using `this.methodName`).
* Lines 14-16: define the `handleChange` [event handler](https://reactjs.org/docs/handling-events.html), which, when fired by an interaction with an element (in this case, a button), receives a value from that element and sets `this.state.year` to that value.
* Line 18: define a [render method](https://reactjs.org/docs/react-component.html#render) to establish the component's output (what will be rendered in the DOM).
* Lines 19-22: define an array of values that we want to be able to select from and [map](https://mdn-mixmix.hashbase.io/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map.html) those values to an array of `ToggleButton` components.
* Lines 24-39: the JSX that will ultimately be rendered as elements on our page. Key lines to note here are:
    * Line 33: `onChange={this.handleChange}` passes `handleChange` to the `ToggleButtonGroup` component as the function to call when its `onChange` [event](https://react-bootstrap.github.io/components.html#btn-groups-toggle-group-props) is fired.
    * Line 34: include the array of `ToggleButton` components we created via `.map()` on lines 20-22.
    * Line 36: set the text of this `<h1>` element to the value of `this.state.year` (which, on line 10, we gave an initial value of '2012').

The cumulative effect of all this is that, when a button element is clicked, `this.state.year` is set to the value of that button, and with this update to the component's state, React triggers a smart update of the DOM that changes the value of the `<h1>` element to match the value of `this.state.year`.

A component's state (`this.state`) is just a JavaScript object, but hopefully this part of the tutorial goes some way towards illustrating how state serves as the effective “source of truth” for the component, determining how and when its output is rendered and updated.

We can use state to manage more than simple string values, however; we're going to use it to manage the data that will be filtered and then passed to our chart component. So let's load some [IMF data](https://www.imf.org/external/pubs/ft/weo/2017/01/weodata/index.aspx) on G7 countries' GDP per capita growth rates from `public/data.csv`:

TK
