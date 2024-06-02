# ElectionReminders

Goal: 
To create a mobile app which offers the user the ability to set up reminders for important elections 
(local and national). 

Technology: 
Ionic and Capacitor with React

How to get started: 
1. Start by just running the command "ionic serve" - which will run the app on localhost 8100. From here, you can see changes. 
You can also make changes and what you see on localhost will be automatically updated. 
2. This frontend will automatically try to connect to a spring app to pull down data. You can find this spring app in ElectionRemindersBackend repository. You can checkout the backend repository and start the associated spring app. Alternatively, there is a dummy data folder in this repo which json files which you can use instead (but then you will have to change the code in relevant areas)

How to use capacitor with this project: 
1. If you want to create a build - just run "ionic build" which will create a dist folder.
2. From there you can run commands like "ionic cap add android" and "ionic cap add ios" to create the native folders for these platforms. 
3. From there - you can run ionic cap open android (for example) which will open the native project on the right platform (ie Android Studio). You will need to have the right tools installed beforehand (for example Android Studio).
4. Then you can run "ionic cap sync" to sync the dist folder to the relevant android/ios folder.
5. From there - you can now run the app on the relevant app (for example Android Studio).

Project Structure
Most of what exists was automatically generated as a template ionic/react project. As a short summary
1. public - a React folder for assets which don't exist in JS files. See https://create-react-app.dev/docs/using-the-public-folder/
2. src - location for all the source code. 
3. cypress - a js/ts testing framework for web components. 
Aside from these, there may also exist the dist folder (the source code) or the android and ios folders (builds for these platforms). There are also various typical config files like the .eslintrc
4. The browserslistrc specifies which browsers the app can run on

Linting:
This project has eslint installed which should run on save. You can also alternatively run 
npm run lint - which will lint the tests and the source code 

Automatic Tests:
This project has two testing frameworks included. 
1. Cypress for end to end testing. You can run these tests by first running "ionic serve" and then "npm run test.e2e"
2. Jest for unit tests. Just run npm test. 
