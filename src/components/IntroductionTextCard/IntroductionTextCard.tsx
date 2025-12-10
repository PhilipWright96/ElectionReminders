import './IntroductionTextCard.css';
import { IonCard, IonCardContent, IonRouterLink } from '@ionic/react';
import { useTranslation } from "react-i18next";


interface ContainerProps { }

const IntroductionTextCard: React.FC<ContainerProps> = () => {
    const { t } = useTranslation();

    return (
        <IonCard>
            <IonCardContent>
                {t("IntroText")}
                <IonRouterLink routerLink="/howto" style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 'bold' }}> HOW-TO</IonRouterLink> {t("IntroText2")}
            </IonCardContent>
        </IonCard>
    );
};

export default IntroductionTextCard;
