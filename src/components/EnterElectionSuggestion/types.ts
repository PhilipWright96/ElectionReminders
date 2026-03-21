export interface ElectionSuggestion {
    electionName: string,
    electionType: string,
    electionArea: string,
    electionDetails: string | null | undefined,
    electionPollsOpenDateTime: Date,
    electionPollsCloseDateTime: Date,
}