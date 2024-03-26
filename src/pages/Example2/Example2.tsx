import { IonContent, IonPage, IonHeader, IonMenu, IonSplitPane, IonTitle, IonToolbar, IonRouterOutlet, IonItem, IonMenuToggle, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

function Example2() {
    const paths = [{
        name: "Home",
        url: "/home"
    }, {
        name: "Home2",
        url: "/home"
    }]
    return (
        <IonPage>
            <IonSplitPane contentId="test">
                <IonMenu contentId="test">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>TEST</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent>
                        {paths.map((item, index) => (
                            <IonItem routerLink={item.url} routerDirection="forward">
                                {item.name}
                            </IonItem>
                        ))}
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id="test">
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>

    );
}
export default Example2;