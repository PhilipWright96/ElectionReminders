export interface SearchResult {
    Name: string
}

export interface CountryInformation {
    Name: string
}

export const useDummyApi = () => {
    const data = [{
        "electionName": "a",
        "electionId": "a8e30f6d-788c-4c5a-b941-8d2e7eb248ed",
        "electionDetails": "Election Details for A.",
        "electionPollsOpenDateTime": new Date("2024-03-18T14:25:36"),
        "electionPollsCloseDateTime": new Date("2025-03-18T14:25:36"),
        "electionSummary": "Summary for A",
        "countryName": "Germany",
        "electionType": "COUNTRY"
    }];
    return data;
}

