import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'RouteMemo',
  slug: 'RouteMemo2',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/routeMemo_white.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/routeMemo_white.png',
    resizeMode: 'contain',
    backgroundColor: '#0d1601',
  },
  
  ios: {
    bundleIdentifier: "com.thewebdeveloperglasgow.RouteMemo2",
  infoPlist: {
    NSLocationWhenInUseUsageDescription:
      "This app uses your location to track your route and provide you with a summary of your activity.",
    NSMotionUsageDescription:
      "This app uses motion data to count your steps during activities.",
      "ITSAppUsesNonExemptEncryption": false,
  }
},
  android: {
    package: 'com.thewebdeveloperglasgow.RouteMemo2',
    permissions: ['ACCESS_FINE_LOCATION', 'ACTIVITY_RECOGNITION'],
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
      },
    },  
  },

   extra: {
    eas: {
      projectId: "25fbf6d3-b30d-4c7b-8a3d-8d08eaac410b",
    },
  },

    plugins: [
    [
      "expo-camera",
      {
        cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone",
        recordAudioAndroid: true,
        barcodeScannerEnabled: true
      }
      //  "expo-sensors",
      //   {
      //     motionPermission: "Allow $(PRODUCT_NAME) to access your device motion"
      //   }
    ]
  ],

  web: {
    favicon: './assets/favicon.png',
  },
});