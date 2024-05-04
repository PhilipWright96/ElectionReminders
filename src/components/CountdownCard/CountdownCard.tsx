import '../CountdownCard/CountdownCard.css';
import { IonCard, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';

interface CountdownCard {
    countdownCardProperties: {
        countdownDate: Date,
        countdownText: String,
    }
}

const CountdownCard: React.FC<CountdownCard> = ({ countdownCardProperties }) => {
    const [dayValue, setDayValueToUpdate] = useState(0),
        [hourValue, setHourValueToUpdate] = useState(0),
        [minuteValue, setMinuteValueToUpdate] = useState(0),
        [secondValue, setSecondValueToUpdate] = useState(0),
        targetTime: number = countdownCardProperties.countdownDate.getTime(),
        numberOfMillisecondsInDay = 1000 * 60 * 60 * 24,
        timeToResetTimeValuesInMilliseconds = 1000,
        days = "Days",
        hours = "Hours",
        minutes = "Minutes",
        seconds = "Seconds";

    let date: Date = new Date(), now = date.getTime(),
        differenceBetweenGoalTimeAndNow: number | null = null;

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
                    <p>{countdownCardProperties?.countdownText} {countdownCardProperties?.countdownDate.toDateString()}</p>
                    <div className="wrapper">
                        <div className="description">
                            <p>{days}</p>
                            <p>{hours}</p>
                            <p>{minutes}</p>
                            <p>{seconds}</p>
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
