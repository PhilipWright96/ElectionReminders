import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar } from '@ionic/react';
import IntroductionTextCard from '../components/IntroductionTextCard/IntroductionTextCard';
import FavouritesCard from '../components/FavouritesCard/FavouritesCard';
import './Home.css';
import CountrySearchBar from '../components/CountrySearchBar/CountrySearchBar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Election Reminders</IonTitle>
          <IonButtons slot="primary">
            <IonButton href='myReminders'>My Reminders</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Election Reminders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='container'>
          <div className='row'>
            <div className="col">
              <IntroductionTextCard />
            </div>
            <div className="col">
              <CountrySearchBar></CountrySearchBar>
            </div>
          </div>
          <div className='row text-center'>
            <FavouritesCard />
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Home;
