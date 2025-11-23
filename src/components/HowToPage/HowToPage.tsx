import './HowToPage.css';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

interface ContainerProps { }

const HowToPage: React.FC<ContainerProps> = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <div className='row text-center'>
                        <IonTitle>How To Page!</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                How to page!
            </IonContent>
        </IonPage >

    );
};

export default HowToPage;
