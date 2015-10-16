# OB-Ionic
----------

## Installation
> npm install

> bower install

> ionic serve

## Device Emulation
To build the iOS app, the following commands are recommended as they will take care of app customization, cordova plugin installation and clearing of previous project caches.
#####Build the app and load it onto an iPhone (requires use and knowledge of XCode)
> gulp buildiOS

#####Build the app and emulate it on desktop using XCode's emulator
> ionic emulate ios

OR

Replace [platform] with ios or android
> cordova platform add [platform]

> ionic build [platform]

> ionic emulate [platform]

## Testing
Tests can be found www -> test -> client -> unit.  Each test name will match what it is testing followed by '.spec'.  For instance, the 'account-ctrl.js' (AccountCtrl) has a corresponding 'account-ctrl.spec.js' file.  

To run all tests, simply:
> gulp test

## App Customization and Deployment
The default gulp build is set up to look for a specific directory 'customTheme' in the projects root.  If this directory is present, any images and scss files present within the folder will replace the default images and theme.  

The 'customTheme' directory should have the following structure (by default).

```
customTheme
└───img
    │   logo.png
    │   ...
└───scss
    │   ionic.app.scss
    |   ...
```
In the 'img' directory, 'logo.png' will replace the logo shown on the login and register pages in the app.  Any other images added to this directory will also be copied into the app's image directory.

In the 'scss' folder, ionic.app.scss will replace the default app theme.  Any other .scss files will also be used within the app.

### Building and testing
All 'customTheme' contents can be built and tested within the web browser by simply running:
> ionic serve

Gulp is set up to watch .scss files for changes and will watch the appropriate directory (either customTheme or the scss directory in the root) for changes and refresh the app in the browser in real time without having to rebuild.  This way, color schemes can be quickly tested by altering the values within the scss file.  

Currently, the following values can be changed in order to customize the app:
> **$bar-positive-bg** - This applies to the background of the top menu bar of the app.

> **$bar-positive-border** - This applies to the border of the top menu bar of the app.

> **$button-royal-bg** - This applies to the background of the action buttons within the app.

> **$button-royal-border** - This applies to the border of the action buttons within the app.

> **$button-royal-active-bg** - This applies to the background of the action buttons within the app when they are pressed.  

> **$button-royal-active-border** - This applies to the border of the action buttons within the app when they are pressed. 

> **$tabs-royal-bg** - This applies to the background of the bottom menu bar of the app.

> **$tabs-royal-border** - This applies to the border of the bottom menu bar of the app.

> **$ionicons-font-path** - This will change the location of the font to use within the app.

### Deploying B2B app
Once the ios project has been built, the Xcode project can be located as follows: 

```
OB-Ionic
└───platforms
    └───ios
        │   OB-Ionic.xcodeproj
        |   ...
```
This project can be opened on a Mac that has Xcode installed. 

In order to release the app using Apple's B2B program, you must do the following:
 
1. Sign up for an [Apple developer licence](https://developer.apple.com/programs/).  This costs $99 a year through Apple.

2. Make sure your bank and tax information is set up correctly in [iTunes Connect](https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa).

3. In iTunes Connect, [create an app record for this app](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Appendices/B2B.html).  You will only need to do this once per B2B app.

4. After the app is created in iTunes Connect, go to the app details page.  On this page, select the 'Pricing' tab.

5. On the pricing tab, select 'Custom B2B App'.
 
6. You will be prompted to enter in at least one [Volume Purchase Program](http://vpp.itunes.apple.com/faq) Apple ID.  The addresses you enter here will be the users that have access to this particular B2B App.

7. Follow the steps [outlined here](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) to create an archive of the app and upload it to iTunes Connect.

8. When the app has been approved, the B2B customers will be able to install it on their devices that are logged in using the Volume Purchase Program Apple IDs you provided.


#### Yes No Radio button
```javascript
{
   type: "YesNoRadio",
   key: "Example Yes No Radio Key",
   templateOptions: {
       label: 'Radio yes no',
       required: true
   }
}
```