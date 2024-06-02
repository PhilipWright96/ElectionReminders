import { ElectionData } from "../components/CountryElections/types";

export async function getDataFromBackend() {
    const rest = await fetch("http://localhost:8080/test", {
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
        url = `http://localhost:8080/electionsForCountry?${urlSearchParams.toString()}`;

    const electionResultsFromBackend = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
    return await electionResultsFromBackend;
}

export async function postDataToBackend() {
    const rest = await fetch("http://localhost:8080/testPOST", {
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