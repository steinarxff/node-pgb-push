# node-pgb-push
Insanely small, but incredibly time saving, script that zips a folder and pushes the zip to PhoneGap Build to initiate building. Created after having to do these steps manually 50 times. Should be very straightforward to use if you are familiar with PhoneGap Build.

Supports zip uploads only.


## Installation / Use
`npm install`

`vim index.js`

Set the variables;

**username** = phonegap build username ( can be email )

**password** = phonegap build password

**appid** = the id of the app you wish to push the zip to

**buildFolder** = which folder to add to the zip

**buildTarget** = where to store the zip file temporarily

`DEBUG=* ./index.js`



## Future
Probably not going to do anything on this, but if I ever get the time, here is a list of things to do;

### Todo
- implement support for command line arguments
- implement support for incrementing version numbers

