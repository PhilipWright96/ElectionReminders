import '../CountdownCard/CountdownCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface CountdownCard {
    countdownCardProperties: {
        electionDate: string,
    }
}
const CountdownCard: React.FC<CountdownCard> = ({ countdownCardProperties }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>CountdownCard Title {countdownCardProperties?.electionDate}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                CountdownCard Content
            </IonCardContent>
        </IonCard>
    );
};

export default CountdownCard;
