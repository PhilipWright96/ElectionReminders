import './IntroductionTextCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface ContainerProps { }

const IntroductionTextCard: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>The App</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                Welcome to Election Reminders - the app to help you remember
                how and when to use your democratic rights. With this app, you can set up
                countdowns and reminders for upcoming elections in various countries.
                To add your first reminder, search a country in the right hand search
                bar.
            </IonCardContent>
        </IonCard>
    );
};

export default IntroductionTextCard;
