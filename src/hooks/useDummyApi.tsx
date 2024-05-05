export interface SearchResult {
    Name: string
}

export interface CountryInformation {
    Name: string
}

export const useDummyApi = () => {
    const data = [{ Name: "EU" }, { Name: "Germany" }];
    return data;
}

