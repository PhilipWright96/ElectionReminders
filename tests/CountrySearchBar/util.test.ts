import { countryMatchesSearchTerm } from '../../src/components/CountrySearchBar/utils';

test('Search term Ger true for country Germany', () => {
    // Given
    const searchTerm = "Ger", countryName = "Germany";

    // When
    const result = countryMatchesSearchTerm(searchTerm, countryName);
    // Then
    expect(result).toBe(true);
});

test('Search term G true for country Germany', () => {
    // Given
    const searchTerm = "G", countryName = "Germany";

    // When
    const result = countryMatchesSearchTerm(searchTerm, countryName);
    // Then
    expect(result).toBe(true);
});

test('Search term g true for country Germany', () => {
    // Given
    const searchTerm = "G", countryName = "Germany";

    // When
    const result = countryMatchesSearchTerm(searchTerm, countryName);
    // Then
    expect(result).toBe(true);
});

test('Search term F false for country Germany', () => {
    // Given
    const searchTerm = "F", countryName = "Germany";

    // When
    const result = countryMatchesSearchTerm(searchTerm, countryName);
    // Then
    expect(result).toBe(false);
});

test('Search term e true for country Germany', () => {
    // Given
    const searchTerm = "e", countryName = "Germany";

    // When
    const result = countryMatchesSearchTerm(searchTerm, countryName);
    // Then
    expect(result).toBe(true);
});