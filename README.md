# Authentication-And-Authorization-NodeJs
Authentication And Authorization based on JSONWebToken for Node.js and Express.js .

i built two seprate things api and main route.

api can deal with http requests and the same for main route for web app.

in The case of signup:
first:  create Data and encrypt password in Database.
second: create token and store.
third : redirect to profile page and decode token to extract inforamtion.

in the case of Login: 
first: check if the user already signedin and if this true will redirect to profile page.
second: otherwise will render login page and send data using ajax request and create token and store user data the redirect user to profile page.

in the case user goes to admin panel : 
will check if user have an admin role or not, if not redirect to home direct.

only user whos have admin role can goto admin panel and change users role.

edit profile only shows if the user logged in by check the token.

and also if user looking for user and show his profile details will not show the admin page button.




<img src="http://s01.arab.sh/i/00078/18sdojjxe6fm.png">

<img src="http://s01.arab.sh/i/00078/1dxppqywcp9h.png">

<img src="http://s01.arab.sh/i/00078/tvepjozt8q12.png">

<img src="http://s01.arab.sh/i/00078/5d4hx4zn7qok.png">

<img src="http://s01.arab.sh/i/00078/p2g2017xabnm.png">

<img src="http://s01.arab.sh/i/00078/xtbb2f9947x9.png">

<img src="http://s01.arab.sh/i/00078/3vs2k0xa9zdb.png">

<img src="http://s01.arab.sh/i/00078/i2l0ftm2iir5.png">

<img src="http://s01.arab.sh/i/00078/035wfmo0eccw.png">

<img src="http://s01.arab.sh/i/00078/w8fapg8l0jxv.png">

