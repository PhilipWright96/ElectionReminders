# ElectionReminders

Goal: 
To create a mobile app which offers the user the ability to set up reminders for important elections 
(local and national). 

Technology: 
Ionic and Capacitor with React

# How to get started: 
Tip:  you want to test things locally in the frontend with no backend connection, just set the "enableBackendTesting" property to false. Then you will receive local dummy data. 

1. Start by just running the command "ionic serve" - which will run the app on localhost 8100. From here, you can see changes. 
You can also make changes and what you see on localhost will be automatically updated. 
2. This frontend will automatically try to connect to a spring app to pull down data. You can find this spring app in ElectionRemindersBackend repository. You can checkout the backend repository and start the associated spring app. Alternatively, there is a dummy data folder in this repo which json files which you can use instead (but then you will have to change the code in relevant areas)

# How to use capacitor with this project: 
1. If you want to create a build - just run "ionic build" which will create a dist folder.
2. From there you can run commands like "ionic cap add android" and "ionic cap add ios" to create the native folders for these platforms. 
(Warning with android build - If you build android, you will have to go into the android folder and set the gradle version (com.android.tools.build:gradle:8.6.0 in android\build.gradle) to 8.6.0. Thats the version that android studio supports.)
If you run into the invalid source release: 21 error message, you will have to go into the android folders and change all
instances of JavaVersion.VERSION_21 to JavaVersion.VERSION_17
 
3. From there - you can run ionic cap open android (for example) which will open the native project on the right platform (ie Android Studio - which you need to have already installed)
4. From there - you can now run the app on the relevant app (for example Android Studio).
5. If you make further changes in the ionic code and want to test in android/ios, you can just run ionic build and ionic cap copy. Then restart the app

We have various helper commands in our package.json. For example...
1. "npm run start-android" will create a dist folder, a android folder, and start the android app if you have installed it.
2. "npm run refresh-ionic" will rebuild the dist folder and ensure the android/ios folder is synced to the android environment. Useful if you have made a small change to the app and want direct feedback. 

Tips: if something goes wrong with the android build, you should first simply try "./gradlew clean" on the android platform. Failing that, here you can simply delete the local android folder and rerun 
"ionic cap add android". And to aid debugging, you can connect your phone to a computer, and go to the url
chrome://inspect/#devices to view your apps logs via the google dev console. Debugging via the google console and the 
debugger keyword also works. 

# SQLite Database and Phone Testing
Our app will automatically create a SQLite database in the users phone and write/read data from this database. 
This is fine if you are testing with a phone. If not, we have a system boolean "enablePhoneTesting". You can set it to false, 
and the program will not pull down data from a phone database, but will rather pull down test data. 
Want to view the contents of the database? In Android Studio, you can go to "Device Explorer" and find the database in 
/data/data/com.election.reminders/databases. You can then view the database however you want (I use DB Browser for SQLite)

# Project Structure
Most of what exists was automatically generated as a template ionic/react project. As a short summary
1. public - a React folder for assets which don't exist in JS files. See https://create-react-app.dev/docs/using-the-public-folder/
2. src - location for all the source code. 
3. cypress - a js/ts testing framework for web components. 
Aside from these, there may also exist the dist folder (the source code) or the android and ios folders (builds for these platforms). There are also various typical config files like the .eslintrc
4. The browserslistrc specifies which browsers the app can run on

# Linting:
This project has eslint installed which should run on save. You can also alternatively run 
npm run lint - which will lint the tests and the source code 

# Automatic Tests:
This project has two testing frameworks included. 
1. Cypress for end to end testing. You can run these tests by first running "ionic serve" and then "npm run test.e2e"
2. Jest for unit tests. Just run npm test. 

# Tips:
1. If you are debugging with the mobile app running on your phone and in Android Studio, you can go to chrome://inspect/#devices on your laptop and there get important logs about things like Network calls.  
