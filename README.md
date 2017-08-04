# Game Price Tracker ![travis-ci](https://travis-ci.org/VitaC123/game-price-tracker.svg?branch=master)



*The PlayStation store has weekly sales with some surprisingly deep discounts on their games. The problem: I don't care enough to check their sales regularly. The solution: some fancy pants automation!*  


### A working build can be viewed [here](https://game-price-tracker.herokuapp.com/) for demonstration purposes.  
Note that it takes a moment for Heroku's services to initially activate.

---

### Detailed description
The app allows a user to paste in a valid Sony PlayStation store game URL and enter their email address. Upon confirmation, the game and user info are stored in a MongoDB collection. Then, once a day, the app's back-end will iterate through the database and query the PlayStation store, comparing prices to determine if the game is on sale. If the game is on sale, the user will receive an email alert. If the game hasn't gone on sale for 18 weeks, the user's document in Mongo is deleted, and the user is invited to sign up again.


#### Preview screenshot
![development screenshot as of 7-17-17](./demo-assets/screenshot-7-17-17.png "development screenshot as of 7-17-17")


**Credit:** Video game controller svg icon made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>