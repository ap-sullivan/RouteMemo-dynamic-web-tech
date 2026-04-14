# Instructions for installing RouteMemo locally

These instructions will guide the user through getting RouteMemo application up and running on a Simulator (iOS) or Emulator (Android) on a local machine.

## iOS setup

### Prerequisites

- Machine running MacOS 
- With Xcode with iOS simulator with a device configured
- VSCode (or similar IDE)
- Node.js installed

### Instructions

1.	Create and open a fresh folder and open in your IDE and terminal
2.	Run “git clone  https://github.com/ap-sullivan/RouteMemo-dynamic-web-tech.git” to pull the latest repo from GitHub
3.	“cd” into the folder 
4.	Run “npm install” to install dependencies
5.	Once complete run “npx expo prebuild”
6.	Then “npx expo run:ios” to build a development version of the application for the simulator
7.	Run “npx expo start --dev-client” to start the application
8.	The simulator may open automatically, if not in the terminal hit “I” to open the simulator and the application


## Android setup

### Prerequisites

- Machine running Windows, macOS or linux 
- With Android Studio installed and an Emulator device configured
- VSCode (or similar IDE)
- Node.js installed

### Instructions

1.	Create and open a fresh folder and open in your IDE and terminal
2.	Run “git clone  https://github.com/ap-sullivan/RouteMemo-dynamic-web-tech.git” to pull the latest repo from GitHub
3.	“cd” into the folder 
4.	Run “npm install” to install dependencies
5.	Once complete run “npx expo prebuild”
6.	Then “npx expo run:android” to build a development version of the application for the emulator to run
7.	Run “npx expo start --dev-client” to start the application
8.	The emulator may open automatically, if not in the terminal hit “a” to open the emulator and the application

### Environment Variables - Android Specific

For Google maps to work on Android adding an API key to an .env file is necessary for maps to display. This is in the report on the Local Installation slide

1. Create a file called .env in the root folder of the project
2. Copy the contents of the included .env.example file to the newly created .env file 
3. Update with the API key given in the report documentation
4. Install dotenv by running "npm install dotenv"
5. After adding the .env file the dev server needs to be restarted (ctrl +c to kill current server)
6. Run "npx expo start --dev-client" and maps should initailise if key is correctly added


