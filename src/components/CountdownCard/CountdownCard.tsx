import '../CountdownCard/CountdownCard.css';
import { IonCard, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';

interface CountdownCard {
    countdownCardProperties: {
        countdownDate: Date,
        countdownText: string,
    }
}

const CountdownCard: React.FC<CountdownCard> = ({ countdownCardProperties }) => {
    const [dayValue, setDayValueToUpdate] = useState(0),
        [hourValue, setHourValueToUpdate] = useState(0),
        [minuteValue, setMinuteValueToUpdate] = useState(0),
        [secondValue, setSecondValueToUpdate] = useState(0),
        numberOfMillisecondsInDay = 1000 * 60 * 60 * 24,
        timeToResetTimeValuesInMilliseconds = 1000,
        days = "Days",
        hours = "Hours",
        minutes = "Minutes",
        seconds = "Seconds";

    let nowDate: Date = new Date(), now = nowDate.getTime(),
        differenceBetweenGoalTimeAndNow: number | null = null;

    useEffect(() => {
        const targetTime: number = countdownCardProperties.countdownDate.getTime();
        const intervalId = setInterval(() => {
            resetTimeValuesForCountdown(targetTime)
        }, timeToResetTimeValuesInMilliseconds);
        return () => clearInterval(intervalId);
    }, [countdownCardProperties.countdownDate]);

    function resetTimeValuesForCountdown(targetTime: number) {
        nowDate = new Date();
        now = nowDate.getTime();
        if (differenceBetweenGoalTimeAndNow) {
            setDayValueToUpdate(Math.floor(differenceBetweenGoalTimeAndNow));
        }
        // TODO - get times working for countdown 
        setHourValueToUpdate(23 - nowDate.getHours());
        setMinuteValueToUpdate(60 - nowDate.getMinutes());
        setSecondValueToUpdate(60 - nowDate.getSeconds());

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
