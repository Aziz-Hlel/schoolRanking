import { countries, languages } from 'country-data-list';

const allCountriesRecord = countries.all.reduce((acc, country) => {
  acc[country.alpha2] = country;
  return acc;
}, {});

export const AllCountiresRecord = Object.freeze({
  allCountriesRecord,
}).allCountriesRecord;

const allLanguagesRecord = languages.all.reduce((acc, language) => {
  acc[language.alpha2] = language;
  return acc;
}, {});

export const AllLanguagesRecord = Object.freeze({
  allLanguagesRecord,
}).allLanguagesRecord;
