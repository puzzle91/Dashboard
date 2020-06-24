# Shark Attacks


<h3> This is an interactive data visualization application</h3>

<h3> This project was built for stream 2 for the Code Institute's bootcamp course. It is a project built using Python's Flask framework. </h3>

<h3> https://dashboard-1445.herokuapp.com </h3>
 
<h3> Tools and Frameworks </h3>
<ol>
  <li> Python </li>
  <li> Python's Flask framework - This is a micro-framework that uses the data provided from the database to render the HTML pages </li>
  <li> HTML+CSS - Basic HTML+CSS was used to format the webpage </li>
  <li> Bootstrap - The main framework for building the webpage HTML/CSS layout for the application </li>
  <li> JavaScript - crossfilter.js (JS library for two way data binding; Filters data on a section of a graph that once clicked is highlighted while other data dissipates), d3.js (JS library for rendering data into graphs that become interactive), Dc.js (JS library for helping wrap data into charts)  </li>  
  <li> MongoDB database - Non-sequential database that takes data and transforms it into JSON format. RoboMongo was used pre-process the dataset before connecting it to the web application </li> 
  <li> Dataset: optained from Kaggle.com: <a href='https://www.kaggle.com/teajay/global-shark-attacks'> 'Global Shark Attacks by Toby Jolly' </a>  which comes from the  <a href='http://www.sharkattackfile.net/index.htm'> Global Shark Attack File </a> website </li>

</ol>

<h3> Deployment:</h3> This Application was deployed and is hosted on Heroku using the gunicorn package (Python). Gunicorn will initialize the http address for the application on a webserver, The Procfile file gives Heroku the information to run the app and requirements.txt is a file that conains all the Python packages that are required to run the application. </h4> 

<h3> Testing: </h3>  This application was tested accross different browsers and devices. This webapplication uses the bootstrap framework for cross browser compatability
