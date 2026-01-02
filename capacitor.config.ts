import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.election.reminders',
  appName: 'Election Reminders',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
