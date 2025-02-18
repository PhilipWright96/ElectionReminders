import { ElectionData } from "../components/CountryElections/types";
import { HTTP } from '@awesome-cordova-plugins/http';
import dummyElectionData from "../dummyData/dummyElectionData.json";
import { enableBackendTesting } from "../assets/config.json";

const laptopIpAddress = "192.168.178.35",
    springAppPort = "8443",
    backendUrl = `https://${laptopIpAddress}:${springAppPort}`;

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
    console.log("Retrieving election data");
    if (!enableBackendTesting) {
        console.log("Backend testing switched off - returning front end dummy data");
        return dummyElectionData;
    }
    // Below code is just for testing until we have SSL properly set up
    await HTTP.setServerTrustMode("nocheck");
    const testCountryName = "Germany",
        urlSearchParams = new URLSearchParams({ countryName: testCountryName }),
        url = `${backendUrl}/electionsForCountry?${urlSearchParams.toString()}`,
        headers = {
            "Content-Type": "application/json",
        };

    const electionResultsFromBackend = HTTP.get(url, {}, headers).then((res) => {
        if (res.error) {
            throw new Error(`Error retrieving data: ${res.status} ${res.error}`);
        }
        return res.data;
    }).catch((error) => {
        console.error(`Error retrieving election results from backend ${error}`);
    });

    return await electionResultsFromBackend;
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