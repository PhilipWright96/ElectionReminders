import { ElectionBackendData, ElectionData } from "../components/CountryElections/types";
import { ElectionSuggestion } from "../components/EnterElectionSuggestion/types";
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http';
import dummyElectionData from "../dummyData/dummyElectionData.json";
import { enableBackendTesting } from "../assets/config.json";

const
    domainName = "electionreminders.space",
    springAppPort = "443",
    backendUrl = `https://${domainName}:${springAppPort}`,
    backendUrlWithoutPort = `https://${domainName}`;

export async function getDataFromBackend() {
    const rest = await fetch(`${backendUrl}/test`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
    console.log(rest);
}

export async function getElectionDataFromBackend(countryName: string): Promise<ElectionData[] | void> {
    console.log("Retrieving election data");
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return mapBackendDataToFrontEndData(dummyElectionData);
    }
    // Below code is just for testing. If you are calling the domain name, you shouldn't need the below hack. 
    // await HTTP.setServerTrustMode("nocheck");
    const urlSearchParams = new URLSearchParams({ countryName: countryName }),
        url = `${backendUrlWithoutPort}/electionsForCountry?${urlSearchParams.toString()}`,
        headers = {
            "Content-Type": "application/json",
        },
        resultsFromBackend: HTTPResponse = await HTTP.get(url, {}, headers);

    if (resultsFromBackend.error) {
        throw new Error(`Error retrieving data: ${resultsFromBackend.status} ${resultsFromBackend.error}`);
    }

    if (!resultsFromBackend.data) {
        throw new Error("No data returned from backend");
    }

    const mappedBackendData: ElectionData[] = mapBackendDataToFrontEndData(resultsFromBackend.data);

    return mappedBackendData;
}

export async function getElectionResultsBasedOnCountry(searchTerm: String): Promise<ElectionData[] | void> {
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return mapBackendDataToFrontEndData(dummyElectionData);
    }
}

export async function getElectionResultsBasedOnRegion(searchTerm: String): Promise<ElectionData[] | void> {
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return mapBackendDataToFrontEndData(dummyElectionData);
    }
}

export async function getElectionResultsBasedOnCity(searchTerm: String): Promise<ElectionData[] | void> {
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return mapBackendDataToFrontEndData(dummyElectionData);
    }
}

export async function getElectionResultsBasedOnOrganization(searchTerm: String): Promise<ElectionData[] | void> {
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return mapBackendDataToFrontEndData(dummyElectionData);
    }
}

export async function getElectionResults(searchTerm: String): Promise<ElectionData[] | void> {
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return mapBackendDataToFrontEndData(dummyElectionData);
    }
}


export async function sendElectionSuggestion(electionSuggestion: ElectionSuggestion): Promise<void> {
    console.log("Sending election suggestion");
    console.log(JSON.stringify(electionSuggestion));

    if (!enableBackendTesting) {
        console.log("Backend testing switched off - making no real call");
        return;
    }

    const
        url = `${backendUrlWithoutPort}/electionSuggestions`,
        response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([electionSuggestion])
        });
    console.log("Response is ");
    console.log(JSON.stringify(response));
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

function mapBackendDataToFrontEndData(backendData: ElectionBackendData[]): ElectionData[] {
    const backendDataToMap: ElectionBackendData[] = typeof backendData === "string"
        ? JSON.parse(backendData)
        : backendData;

    console.log(`attempting to map results`);
    console.log(backendDataToMap);
    const frontendResults = backendDataToMap.map((backendDataEntry) => ({
        ...backendDataEntry,
        electionPollsOpenDateTime: new Date(backendDataEntry.electionPollsOpenDateTime),
        electionPollsCloseDateTime: new Date(backendDataEntry.electionPollsCloseDateTime)
    }));
    console.log("front end results are ");
    console.log(JSON.stringify(frontendResults));
    return frontendResults
}