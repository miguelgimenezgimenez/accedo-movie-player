#  ACCEDO CODE ASSESSMENT 


Deployed project at http://miguelgimenez.tech
### Running the project

**Install dependencies:**


    $ yarn 
    or 
    $ npm install


**Run in development mode:**


    $ npm run dev

Then go to ``http://localhost:3000/``

**Run in production mode:**


    $ npm run build
    $ npm start   
  
    


# DESCRIPTION


The project has been done with React, Redux,React Router, Babel, Webpack, and Express.
It is deployed using an nginx server on Digital Ocean. I didnt have time to set up https, but wanted to do it.
Since the response for the images at ```lorempixel``` was a bit slow and the response had a no cache header I decided to lazy load the images ,
so after loading a first set of images , I would request more images as the user scrolls, or when the previous images had been loaded.
Also I decided to cache ther images manually by mounting all the images components, but not displaying the elements which were out of 
scope for the carousel. I could have usedd flexbox to create a much simpler carousel, but from the specifications I understood that this was the way it was supposed to be created.
Also the UI is not very beautiful,if I am given more time I would like to include  tests, login and improve UI .


## Architecture:

To Structure the project I have grouped the components as Atoms, Molecules and Pages:

### Atoms

Simple components that consist of one unique component, but may also have some functionality:

**Iterator:** Returns a list of the Component passed as a prop, from the array passed as a a prop.(Very common pattern used in React which would reused in bigger projects) 
I have never seen this done this way, but I think its a good pattern.

### Molecules

Components that render different simple components, like atoms or other molecules.

**Header:** no need for explanation..

**Carousel** The component that is in charge of rendering the Movie Component and the Iterator. It will dispatch actions to mount more components
when the images are loaded or the user scrolls through the carousel. It also has a component which is arrow-keys-react that will be
the event listener when the user presses a key.

**Movie** Component that renders a loader before the image is loaded, and when it loads it will render the image with a play button,
which when clicked will open a fullscreen modal with the video.

### Pages

This component is the main rendered component for a specific route.

**Home:** It will dispatch the list action which will call the api to fetch 
the movies ,it contains the carousel which will be passed the movies as props.
 

**History:**  It will dispatch the historyList action which will get movies from localstorage
,it contains the carousel which will be passed the movies as props.

## DESIGN QUESTIONS ##
**1. Describe the data you would capture as part of this service.**

The saved videos of course, how much depth has been scrolled through the carousel, and which movies have been clicked.

**2.How would make this service more efficient?**

**Efficient for performance:** If the picture source was the same one we had , i would have done what i did to cache images, if not I could have used a much simpler method since the browser would have done all the caching for me.
**Efficient for users :** I would have made a much nicer UI , with user profile, reccomendation for user, rating for movies ...

**3.Imagine that the JSON file that provides all the videos has a ‘rate limit’
policy that blocks you to access that file more than 5 times per hour that
file. Please describe how would you bypass that limitation given that your
application will be used by thousand of users.**


I would have stored the data in a database and would make a call every 15 minutes to the endopoint to update my database.



**4.Once the feature is complete, how would you know that it’s ready for go-live?**


Once all the tests  ( stress tests , TDD , integration ... ) and the security has been properly setup (Https, secured routes ...) should be ready to go live.



**5. How would you determine if this feature is successful?**



By determining how many users are getting back to their history to view which videos they have watched.






