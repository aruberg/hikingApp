# hikingApp
=======
# TrailPro 

## Installation Instructions 

The first key element to making the code work is to have all the necessary tools. This includes downloading and installing VS Code, React Native environment, npm installer, node.js, Android Studio and React Native. Once the environment is set up, the app can be created using the command react-native init hikingApp. Add the following folders: “components”, “routes”, “screens” and necessary packages described above. The app’s repository can also be cloned from GitHub: https://github.com/camilaecc/hikingApp.

To install the application on a device for testing purposes, first connect the Android device to the computer. Ensure ‘usb debugging’ is turned on. To do this, tab the phone’s build number in the settings screen seven times. Upon completion, the app will have developer mode enabled. Once the phone is connected, navigate to the app’s folder on Windows CMD. Type the following command “adb devices”. This command will show you which devices are currently attached. Usually there is an Android emulator and you will see your physical Android device populate. After selecting “allow usb debugging” on your Android device, run the command: ‘react-native run-android’ on Windows CMD. This command installs the application on your mobile device and any changes made in React native will be automatically updated on your phone. 

## App Flow diagram 

![alt text](https://github.com/camilaecc/hikingApp/blob/master/activityDiagramFlow.png)

## Component Breakdown 
### ‘Components’ folder 
###### FadeInView.js: allows components to fade into view for 2.5 seconds. 
This component was implemented on the logo for the splash screen.

### ‘Routes’ folder
###### AuthNavigator.js: 
Provides the authentication navigation flow: when no authentication context exists, the SignOutStack is presented to the user. The SignOutStack is a stack of screens that displays login flow. It begins with the splash screen and then moves to the login screen. Once AuthNavigator confirms the authorization state from the user, it navigates to the TabNavigator.js class.

###### SignOutStack.js
The set of screens that are displayed when no user is signed in. The stack begins by displaying SplashScreen.js and then transitions to LoginScreen.js. The user also has the option of creating a new account and resetting their password. As such, ForgotPasswordScreen.js and CreateAccountScreen.js are also included lower down in the stack. 
###### Graphically:
SplashScreen.js
LoginScreen.js
ForgotPasswordScreen.js
CreateAccountScreen.js

###### TabNavigator.js: 
A tab navigator is graphically displayed as a menu bar at the bottom of the screen where each tab is a stack of screens. The TabNavigator.js class is called only upon successful user authentication at the login screen. There are three tabs on the tab navigator which are Home, Profile, and Hikes. Graphically, each tab and associated stack is organized as follows:
Home Tab	Profile Tab	Hikes Tab
HomeScreen.js	
ProfileScreen.js	
HikeMenuScreen.js
HikeInfoScreen.js	
GoalScreen.js	
HikeInfoScreen.js
InHikeScreen.js
QRScreen.js		

Initially the user is directed to the HomeScreen.js tab where the home screen is 	 	displayed. Clicking on the different tabs gives access to that stack of screens.

### ‘Screens’ folder
###### CreateAccountScreen.js
It allows the user to create a new account. Fields include first name, last name, email, and password. Upon clicking the “Create account” button, a profile document is created in Cloud Firestore to store relevant information, authentication is added in Firebase and the user is logged in to use the app. Error checking in user input fields is handled on button press.

###### ForgotPasswordScreen.js
It provides a mechanism for users to reset their password. Password reset is handled entirely by Firebase and the “.sendPasswordResetEmail()” function. This function sends an email to the user’s account. In the email is a link to a webform provided by Firebase for resetting your password. The ForgotPasswordScreen.js file provides a place for the user to enter the email of their account. The address entered is the email that Firebase sends the reset email to.
###### GoalScreen.js
The goal screen allows users to set future hiking goals and well as view their current goals. It provides them with incentives to achieve their goals.

###### HikeInfoScreen.js
Displays information about the selected hike which is stored in the Trails collection in Cloud Firestore. This file gets a snapshot of the trail document in question and populates the information in an easy-to-read manner for the client. 

###### HikeMenuScreen.js
Stores a snapshot of each trail in the Trails Collection from Cloud Firestore into an Array. The array is queried in the HikeMenuScreen and displayed to the user. Users can also search for a hike at the top of the screen. The search bar filters the hikes from the array of trail documents. Each trail is displayed as a card with a photo and relevant information about the hike. The user can select a hike by pressing on the hike card.

###### HomeScreen.js 
Displays relevant information to the user including a snapshot of their hiking goal progress, awards earned, and a featured hike selected by the developer. The featured hike is queried from the FeaturedHike collection in Cloud Firestore and the goal progress is queried from the user document in the Profiles Collection. Awards are calculated based on the user’s distance hiked, elevation climbed, and number of hikes completed. The awards breakdown is as follows:

Distance:

* 100 km = Gold badge
* 50 km = Silver badge
* 25 km = Bronze badge
* <25 km = Empty badge

Elevation:
* 20000 m = Gold badge
* 10000 m = Silver badge
* 5000 m = Bronze badge
* < 5000 m = Empty badge

Hikes Completed:
* 100 = Gold badge
* 50 = Siver badge
* 25 = Bronze badge
* < 25 = Empty badge

###### InHikeScreen.js
This file handles displaying the dynamic map of the selected hike. When a hike is selected by the user, the dynamic map loads with annotations in the colour of the rainbow. The colours are meant to guide the user around the hike. In addition, there are numbers inside each annotation to help guide the user in the correct direction. This file displays a dynamic map for the user and presents a QR scanning button so the user can scan a QR code. 

###### LoginScreen.js
Provides text input for the user to enter their login information and sign into the app. Also provides a way for users to reset their password and create a new account. 

###### ProfileScreen.js
Displays a user’s hiking statistics, current goals and awards earned. Provides a way for users to sign out of the app. 

###### QRScreen.js
Simple QR scanning functionality which allows users to scan a QR code. 

###### SplashScreen.js
Introduces users to the app in a dynamic way.


## Versions and Dependencies 
![alt text](https://github.com/camilaecc/hikingApp/blob/master/VD1.png?raw=true)
![alt text](https://github.com/camilaecc/hikingApp/blob/master/VD2.png?raw=true)
![alt text](https://github.com/camilaecc/hikingApp/blob/master/VD3.png?raw=true)
