## Welcome to Classified-ads-48 

Bringing to the web the idea of [classified advertising](https://www.wikiwand.com/en/Classified_advertising). Together with rich input forms and an [interactive map](https://leafletjs.com/), we hope to create a digital platform that scales for different categories (sections) and for a large load of accessing users. All with a simple navigation, [minimal subscription](https://www.wikiwand.com/en/Passwordless_authentication) and respecting user privacy.

This page presents the web-app technical aspects for possible *contribution* and *deployment*.

### Classified-ads-48 and Classified-ads-xx 

[Classified-ads-48](https://github.com/bacloud14/Classified-ads-48) would be the code base of a fully functional website that I (personally) want to deploy in Algeria. This means that it is specific to my case. Nevertheless, the repository is supposed to be fully customizable. You could with little configuration change the geo-location and served messages for all web-pages. All with different languages also. 

### Technical stack 

Node.js and MongoDB.

#### Front-end dependencies

 - Bootstrap: The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web [repo](https://github.com/twbs/bootstrap)
 - Leaflet: 🍃 JavaScript library for mobile-friendly interactive maps [repo](https://github.com/Leaflet/Leaflet)
 - pell: the simplest and smallest WYSIWYG text editor for web, with no dependencies [repo](https://github.com/jaredreich/pell)
 - tagify: lightweight, efficient Tags input component in Vanilla JS / React / Angular / Vue [repo](https://github.com/yairEO/tagify)
 - toasty: A minimal JavaScript notification plugin that provides a simple way to display customizable toast messages on the web page with CSS3 transition effects. [repo](https://github.com/egalink/Toasty.js)
 - holmes: Fast and easy searching inside a page [repo](https://github.com/Haroenv/holmes) It uses microlight also.
 - auto-complete:  An extremely lightweight and powerful vanilla JavaScript completion suggester. [repo](https://github.com/Pixabay/JavaScript-autoComplete)
 - jsi18n: Simple client side internationalization with javascript. [repo](https://github.com/danabr/jsI18n) 
 - avatar: Library for showing Gravatars or generating user avatars. [repo](https://github.com/MatthewCallis/avatar) 
 - FontPicker: Font selector component for Google Fonts . [repo](https://github.com/samuelmeuli/font-picker)
 - stretchy: Form element autosizing, the way it should be. [repo](https://github.com/LeaVerou/stretchy)

#### Back-end dependencies

 - The official MongoDB Node Driver [link](https://mongodb.github.io/node-mongodb-native/)
 - Express: Fast, unopinionated, minimalist web framework for node [link](https://expressjs.com/)
 - Passwordless: node.js/express module to authenticate users without password [repo](https://github.com/florianheinemann/passwordless)
 - other handy Express plugins and dependencies like: EJS, Winston, socket.io, Multer, Helmet, Nodemailer ...

#### Security

Anti spam, anti flood, http security all achieved with several tools

 - [Helmet](https://helmetjs.github.io/), express-slow-down, express-rate-limit, [projecthoneypot](https://www.projecthoneypot.org/).

#### Database

Several benefits of No-SQL are achieved easily using modern MongoDB. Particularly, I chose to limit the whole data model to one collection that represent posts by users. Note the following benefits of using a modern No-SQL database like MongoDB:

 - Works well for web-apps where data can be unstructured (JSON, HTTP, REST...)
 - Easy implementations: Asynchronicity, Map-Reduce, Pipelines
 - Easy to use tools like **Robo 3T** and **MongoDBCompass**
 - Native support of geo-data (geo-indexes, geo-queries)

#### Maps and geo-data

For this, I used Leaflet with different possible map tiles providers. Together with JavaScript and CSS we can achieve beautiful interactive maps.  
These are current interactive maps
 - Index page's map: A map with visible sub-division delimitations where you can click on each delimitation (feature in GEOJSON data) to fetch posts within that boundry.
 - Read-only maps: are maps with a visible marker to show the geo-location of a post.
 - Post maps: are maps with a visible marker to drag and size to any geo-location within the limits of a country borders, to be able to add a post or to search posts withing a radius.
 - Game maps: are maps connected with server not by HTTP but by sockets. You can implement your game where you can create channels, broadcast current position of users, and do any other magic. 

#### Data

Data used for map geo-locations is in [GEOJSON format](https://en.wikipedia.org/wiki/GeoJSON). In [deployment step](https://github.com/bacloud14/Classified-ads-48#deployment) data is downloaded and copied for front and back-end.  
Data that is used is simple; Two types are present.  

 - [Country (or area) borders](https://bacloud14.github.io/Classified-ads-48/geo_data)
 - [Country (or area) first level delimitations](https://bacloud14.github.io/Classified-ads-48/geo_data2)
 
