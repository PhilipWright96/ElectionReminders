export interface FilterFields {
    NAME: string,
    DATE: string,
}

export interface ElectionData {
    electionName: string,
    electionDate: string,
    electionSummary: string,
    isRepeating: boolean,
    repeatingEvery: string
}