import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.election.reminders',
  appName: 'electionReminders',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
