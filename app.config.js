import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'RouteMemo2',
  slug: 'RouteMemo2',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
    NSLocationWhenInUseUsageDescription:
      "This app uses your location to track your route and provide you with a summary of your activity.",
  },
  },
  android: {
    package: 'com.thewebdeveloperglasgow.RouteMemo2',
    permissions: ['ACCESS_FINE_LOCATION'],
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
  web: {
    favicon: './assets/favicon.png',
  },
});