import needle from "needle";
const csvParser = require("csv-parser");

export const extract = async (): Promise<any[]> => {
  const sources = [
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Sierra%20Leone.csv",
    "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Guinea.csv",
    'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Liberia.csv'
  ];

  const fetchPromiseData = Promise.all(
    sources.map(url => fetchCSV(url))
  )

  console.log(`Extract all data`);
  return fetchPromiseData;
};

const fetchCSV = (url: string) => {
  const records: Array<any> = [];

  return new Promise((resolve, reject) => {
    return needle
      .get(url)
      .pipe(csvParser())
      .on("data", (row: any) => {
        records.push(row);
      })
      .on("done", (err: any) => {
        if (err) reject(err);
        else resolve(records);
      });
  });
};
