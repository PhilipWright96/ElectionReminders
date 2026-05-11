import { getElectionResultsBasedOnCity, getElectionResultsBasedOnCountry, getElectionResultsBasedOnOrganization, getElectionResultsBasedOnRegion } from "../../backendConnectors/backendConnector";
import { ElectionData } from "../CountryElections/types";

export function searchItemMatchesSearchTerm(searchTerm: string, searchItem: string): boolean {
    return searchItem.startsWith(searchTerm.toLowerCase())
        || searchItem.startsWith(searchTerm.toUpperCase())
        // Includes only works with primitive strings - thats why we have "toString" below
        || searchItem.includes(searchTerm.toString())
}

export function retrieveDataFromBackend(searchTerm: string, filterType: string): Promise<ElectionData[] | void> {
    console.log(`Retrieving data from backend - ${searchTerm} and ${filterType}`);
    switch (filterType) {
        case "country":
            return getElectionResultsBasedOnCountry(searchTerm);
        case "region":
            return getElectionResultsBasedOnRegion(searchTerm);
        case "city":
            return getElectionResultsBasedOnCity(searchTerm);
        case "organization":
            return getElectionResultsBasedOnOrganization(searchTerm);
        default:
            console.log("Error - unsupported value");
            return Promise.reject(new Error("Unsupported filter type"));
    }
}