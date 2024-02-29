import '../CountdownCard/CountdownCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';

interface CountdownCard {
    countdownCardProperties: {
        electionDate: Date,
    }
}

const CountdownCard: React.FC<CountdownCard> = ({ countdownCardProperties }) => {
    const [dayValue, setDayValueToUpdate] = useState(0),
        [hourValue, setHourValueToUpdate] = useState(0),
        [minuteValue, setMinuteValueToUpdate] = useState(0),
        [secondValue, setSecondValueToUpdate] = useState(0),
        targetTime: any = countdownCardProperties.electionDate.getTime(),
        numberOfMillisecondsInDay = 1000 * 60 * 60 * 24,
        timeToResetTimeValuesInMilliseconds = 1000;

    let date = new Date(), now = date.getTime(),
        differenceBetweenGoalTimeAndNow: any = null;

    useEffect(() => {
        const intervalId = setInterval(() => {
            resetTimeValuesForCountdown()
        }, timeToResetTimeValuesInMilliseconds);
        return () => clearInterval(intervalId);
    }, []); // The empty dependency array ensures that this effect runs only once on component mount

    function resetTimeValuesForCountdown() {
        date = new Date();
        now = date.getTime();
        if (differenceBetweenGoalTimeAndNow) {
            setDayValueToUpdate(Math.floor(differenceBetweenGoalTimeAndNow));
        }
        setHourValueToUpdate(23 - date.getHours());
        setMinuteValueToUpdate(60 - date.getMinutes());
        setSecondValueToUpdate(60 - date.getSeconds());

        differenceBetweenGoalTimeAndNow = targetTime - now;
        differenceBetweenGoalTimeAndNow = differenceBetweenGoalTimeAndNow / numberOfMillisecondsInDay;
    }

    return (
        <IonCard>
            <IonCardContent>
                <div className="count-down-timer">
                    <p>Countdown to election on {countdownCardProperties?.electionDate.toDateString()}</p>
                    <div className="wrapper">
                        <div className="description">
                            <p>Days</p>
                            <p>Hours</p>
                            <p>Minutes</p>
                            <p>Seconds</p>
                        </div>
                        <div className="times">
                            <p>{dayValue}</p>
                            <p>{hourValue}</p>
                            <p>{minuteValue}</p>
                            <p>{secondValue}</p>
                        </div>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default CountdownCard;
