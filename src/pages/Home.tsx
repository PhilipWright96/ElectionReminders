import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import TextCard from '../components/TextCard';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Election Reminders</IonTitle>
          <IonButtons slot="primary">
            <IonButton>My Reminders</IonButton>
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
              <TextCard />
            </div>
            <div className="col">
              <IonSearchbar showClearButton="always" animated={true} placeholder="Enter country name here"></IonSearchbar>
            </div>
          </div>
        </div>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
