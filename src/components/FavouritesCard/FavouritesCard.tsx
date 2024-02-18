import '../FavouritesCard/FavouritesCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface ContainerProps { }

const TextCard: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Favourites</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                See your favourite reminders here!
            </IonCardContent>
        </IonCard>
    );
};

export default TextCard;
