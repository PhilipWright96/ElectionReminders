import '../CountdownCard/CountdownCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';

interface CountdownCard {
    countdownCardProperties: {
        electionDate: string,
    }
}

const CountdownCard: React.FC<CountdownCard> = ({ countdownCardProperties }) => {
    const [valueToUpdate, setValueToUpdate] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setValueToUpdate(prevValue => prevValue + 1);
        }, 1000);


        return () => clearInterval(intervalId);
    }, []); // The empty dependency array ensures that this effect runs only once on component mount


    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>CountdownCard Title {countdownCardProperties?.electionDate}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <div className="count-down-timer">
                    <p>Countdown to election on</p>
                    <div className="wrapper">
                        <div className="description">
                            <p>Days</p>
                            <p>Hours</p>
                            <p>Minutes</p>
                            <p>Seconds</p>
                        </div>
                        <div className="times">
                            <p>{valueToUpdate}</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                        </div>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default CountdownCard;
