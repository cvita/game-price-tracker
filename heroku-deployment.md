### Test deployment to Heroku

These are notes for my own reference as I work to get the app up and running on Heroku.

---

#### Build and push up to Heroku

Building the app for deployment
````cd my-create-react-app-project````
````npm run build````

Add the build folder to git locally
````git add client/build````
````git commit -m 'Add `build` folder for test deployment'````

Create a new heroku app
````heroku apps:create myApp````

Push project up to heroku
````git push heroku master````


#### Remove or edit Heroku remote

View current remotes
````git remote -v````

Remove the current heroku remote
````git remote rm heroku````

Assign a different remote to local project
````heroku git:remote -a falling-wind-1624````

Info on existing Heroku apps
````heroku apps:info````

View logs
````heroku logs````

#### Other notes
* Beware of ES6 features without complete transpiling.
    - Arrow functions, which worked great locally on Chrome, caused a Promise function located on server.js to fail. Wreaked havoc as issue persisted, even when using Babel on the build.