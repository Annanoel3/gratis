import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gratis.android',
  appName: 'Gratis',
  webDir: 'dist',
  server: {
    url: 'https://gratis-69e237a7.base44.app',
    cleartext: false,
    androidScheme: 'https',
    allowNavigation: [
      '*.base44.app',
      'base44.app',
      'accounts.google.com',
      '*.google.com',
      'gratis-69e237a7.base44.app',
    ],
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: '#ffffff',
    },
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
};

export default config;
