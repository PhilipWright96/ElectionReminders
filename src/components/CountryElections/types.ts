export interface FilterFields {
    NAME: string,
    DATE: string,
}

export interface ElectionBackendData {
    electionName: string,
    electionId: string,
    electionDetails: string,
    electionPollsOpenDateTime: string,
    electionPollsCloseDateTime: string,
    electionSummary: string
}

export interface ElectionData {
    electionName: string,
    countryName: string,
    electionId: string,
    electionDetails: string,
    electionPollsOpenDateTime: Date,
    electionPollsCloseDateTime: Date,
    electionSummary: string
}