### Python API Setup
* Install python3 https://realpython.com/installing-python/
* Create a new virtual environment, activate it, and install project requirements

    `python3 -m venv intervue`

    `source intervue/bin/activate`

    `pip install -r requirements.txt`

* Run `python minimal.py runserver`
* Open `http://127.0.0.1:8000/content`, and observe a large blob of json data 


### Vue Frontend Setup
* Install vue-cli as documented here https://cli.vuejs.org/guide/installation.html
* Run `npm install`
* Run `npm serve`, and observe the frontend running at `localhost:8080`


## Motley Fool Developer Interview Project

Hello!

Below you will find guidelines for a small website you will create. One API endpoint (`http://127.0.0.1:8000/content`) is provided, and will populate the website.
Also included are two wireframe designs for a homepage and an article page as well as a basic Vue templates for hooking up your Vue components.
Please feel free to use your own creativity for the design of this website.

We would like to thank you for taking the time to complete this project. We will schedule your in-person interview after we have received your completed project.
We are looking forward to discussing your experience and the completed project!

### General project guidelines
* Host your project on github.
* Your app should be a single page app built off our base Vue app.
* Use any publicly available VUE / NPM packages that you need.
* Feel free to use any CSS frameworks you are comfortable with.

### Homepage
* The top box on the homepage should be populated with the first article in the content API with the tag where slug=10-promise.
* List the remaining articles below this
* The headline's of each article should link to the article page.
* The content API supports primitive filtering by the article `tag_slug`: pass query parameter `tag=` to filter
articles by tag. The homepage should allow users to filter by the available tags.
* Homepage should support sorting by article publish date

### Article Page
* Use the content provided by the API to populate article pages for each article
* Use a URL schema that makes sense to you.
* Create a button below the Stock Quotes sidebar that, when clicked, will use javascript to shuffle the order of the stock quote
items.

### Evaluation criteria
List of possible evaluation criteria.
* Front-end structure - What you build vs pull in via libraries, CSS and JS / VUE component structure.
* VUE Framework usage.
* Possible areas for future additions, improvement, or optimization.
* Anything you did to make make the application your own.

