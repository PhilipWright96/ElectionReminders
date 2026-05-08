import { getElectionResults, getElectionResultsBasedOnCity, getElectionResultsBasedOnCountry, getElectionResultsBasedOnOrganization, getElectionResultsBasedOnRegion } from "../../backendConnectors/backendConnector";
import { ElectionData } from "../CountryElections/types";

export function countryMatchesSearchTerm(searchTerm: string, countryName: string): boolean {
    return countryName.startsWith(searchTerm.toLowerCase())
        || countryName.startsWith(searchTerm.toUpperCase())
        // Includes only works with primitive strings - thats why we have "toString" below
        || countryName.includes(searchTerm.toString())
}

export function retrieveDataFromBackend(searchTerm: string, filterType: string): Promise<ElectionData[] | void> {
    console.log(`Retrieving data from backend - ${searchTerm} and ${filterType}`);
    switch (filterType) {
        case "country":
            console.log("country");
            return getElectionResultsBasedOnCountry(searchTerm);
        case "region":
            console.log("region");
            return getElectionResultsBasedOnRegion(searchTerm);
        case "city":
            console.log("city");
            return getElectionResultsBasedOnCity(searchTerm);
        case "organization":
            console.log("organization");
            return getElectionResultsBasedOnOrganization(searchTerm);
        case "all":
            console.log("all");
            return getElectionResults(searchTerm);
        default:
            console.log("Error - unsupported value");
            return Promise.reject(new Error("Unsupported filter type"));
    }
}