import { ColumnType } from "antd/es/table";
import { useVaccinationFindQuery } from "./vaccination.service";

export const useListVaccination = () => {
  const { data: res, isLoading: loading, error } = useVaccinationFindQuery();
  const rows: any = res || [];

  console.log(error);

  return { loading, rows, error };
};

export const useVaccinations = () => {
  const { rows, loading, error } = useListVaccination();

  const columns: ColumnType<any>[] = [
    {
      title: "Date",
      dataIndex: "date",
      width: 200,
      fixed: "left",
    },
    {
      title: "Country",
      render: (value) => value.name,
      dataIndex: "country",
      width: 200,
    },
    { dataIndex: "vaccine", title: "Vaccine", width: 200, ellipsis: true },
    {
      dataIndex: "totalVaccinations",
      title: "Total Vaccinations",
      width: 200,
      align: "center",
    },
    {
      dataIndex: "peopleVaccinated",
      title: "People Vaccinated",
      width: 200,
      align: "center",
    },
    {
      dataIndex: "fullyVaccinated",
      title: "Fully Vaccinated",
      align: "center",
      width: 200,
    },
    {
      dataIndex: "totalBoosters",
      title: "Total Boosters",
      align: "center",
      width: 200,
    },
    { dataIndex: "source", title: "Source", ellipsis: true, width: 200 },
  ];

  return {
    columns,
    rows,
    loading,
    error,
  };
};
