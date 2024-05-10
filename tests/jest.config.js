/** @type {import('ts-jest').JestConfigWithTsJest} */
// Disabling the "no undef" rule for eslint here since our
// tests don't work yet anyway
/* eslint-disable-next-line no-alert, no-undef, semi */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
