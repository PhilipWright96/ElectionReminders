export function countryMatchesSearchTerm(searchTerm: String, countryName: String): boolean {
    return countryName.startsWith(searchTerm.toLowerCase())
        || countryName.startsWith(searchTerm.toUpperCase())
        // Includes only works with primitive strings - thats why we have "toString" below
        || countryName.includes(searchTerm.toString())
}