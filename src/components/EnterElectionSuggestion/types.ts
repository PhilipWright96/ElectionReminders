export interface ElectionSuggestion {
    electionName: string,
    electionType: string,
    electionArea: string,
    electionDetails: string | null | undefined,
    electionStartDate: Date,
    electionEndDate: Date,
}