import { Link } from 'react-router-dom';
import './ElectionCard.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { useTranslation } from 'react-i18next';

interface ElectionCard {
    electionProperties: {
        electionId: string,
        electionName: string,
        electionDetails: string,
        electionPollsOpenDateTime: string,
        electionPollsCloseDateTime: string,
        electionSummary: string,
        isRepeating: boolean,
        repeatingEvery: string
    }
}

const ElectionCard: React.FC<ElectionCard> = ({ electionProperties }) => {
    const { t } = useTranslation(),
        electionPollsOpenText = t("Election_Polls_Open"),
        electionPollsCloseText = t("Election_Polls_Close"),
        electionSummaryText = t("Election_Summary"),
        moreDetailsText = t("More_Details");
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{electionProperties.electionName}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <b>{electionPollsOpenText}: </b> {electionProperties.electionPollsOpenDateTime.toLocaleString()} <br></br>
                <b>{electionPollsCloseText}: </b> {electionProperties.electionPollsCloseDateTime.toLocaleString()} <br></br>
                <b>{electionSummaryText}: </b> {electionProperties.electionSummary} <br></br>
            </IonCardContent>
            <div className="row">
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark">
                        <Link
                            to={{
                                pathname: `/electionDetails/${electionProperties.electionName}`,
                                state: { electionDetails: electionProperties.electionDetails },
                            }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {moreDetailsText}
                        </Link>
                    </IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark" routerLink={`/setupReminder?electionName=${electionProperties.electionName}&electionPollsOpenDate=${electionProperties.electionPollsOpenDateTime}&electionId=${electionProperties.electionId}`}>Setup Reminder</IonButton>
                </div>
            </div>
        </IonCard>
    );
};

export default ElectionCard;
