export interface SearchResult {
    Name: String
}

export interface CountryInformation {
    Name: String
}

export const useDummyApi = () => {
    const data = [{ Name: "EU" }, { Name: "Germany" }];
    return data;
}

