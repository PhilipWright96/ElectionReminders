import { ElectionData } from "../components/CountryElections/types";

const backendUrl = "http://localhost:8080";

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