import './Menu.css';
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar
} from '@ionic/react';

const Menu: React.FC = () => {
    return (
        <IonMenu contentId="main" swipeGesture={true}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    <IonMenuToggle autoHide={false}>
                        <IonItem routerLink="/home">
                            <IonLabel>Home</IonLabel>
                        </IonItem>

                        <IonItem routerLink="/enterElection">
                            <IonLabel>Enter New Election</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;