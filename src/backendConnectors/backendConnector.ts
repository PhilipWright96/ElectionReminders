import { ElectionData } from "../components/CountryElections/types";
import { ReminderData } from "../components/ReminderCard/types";

const laptopIpAddress = "192.168.178.35",
    springAppPort = "8080",
    backendUrl = `http://${laptopIpAddress}:${springAppPort}`;

export async function getDataFromBackend() {
    const rest = await fetch(`${backendUrl}/test`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
    console.log(rest);
}

export async function getElectionDataFromBackend(): Promise<ElectionData[]> {
    const testCountryName = "Germany",
        urlSearchParams = new URLSearchParams({ countryName: testCountryName }),
        url = `${backendUrl}/electionsForCountry?${urlSearchParams.toString()}`;

    const electionResultsFromBackend = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
    return await electionResultsFromBackend;
}

export async function getReminderDataFromBackend(): Promise<ReminderData[]> {
    const testUserId = "123",
        urlSearchParams = new URLSearchParams({ userId: testUserId }),
        url = `${backendUrl}/remindersForUser?${urlSearchParams.toString()}`;

    const reminderResultsFromBackend = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
    return await reminderResultsFromBackend;
}


export async function postDataToBackend() {
    const rest = await fetch(`${backendUrl}/testPOST`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            testProperty: "testValue"
        })
    });
    console.log(rest);
}