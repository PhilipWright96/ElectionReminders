import './IntroductionTextCard.css';
import { IonCard, IonCardContent, IonRouterLink } from '@ionic/react';

interface ContainerProps { }

const IntroductionTextCard: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardContent>
                Welcome to Election Reminders - the app to help you remember
                how and when to use your democratic rights. First time using this app? See our
                <IonRouterLink routerLink="/howto" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 'bold' }}> HOW-TO</IonRouterLink> page for help.
            </IonCardContent>
        </IonCard>
    );
};

export default IntroductionTextCard;
