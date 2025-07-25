import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import MyReminders from './pages/MyReminders';
import CountryElections from './components/CountryElections/CountryElections';
import SetupReminderPage from './components/SetupReminderPage/SetupReminderPage';
import ElectionDetailsPage from './components/ElectionDetailsPage/ElectionDetailsPage';
import DevTestPage from './components/DevTestPage/DevTestPage';
import { useEffect } from 'react';
import { StatusBar } from '@capacitor/status-bar';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: false });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/myReminders" component={MyReminders} />
          <Route exact path="/countryElections/:countryName" component={CountryElections} />
          <Route exact path="/setupReminder" component={SetupReminderPage} />
          <Route exact path="/electionDetails/:electionName" component={ElectionDetailsPage} />
          <Route exact path="/devTestPage" component={DevTestPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
