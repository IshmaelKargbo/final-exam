import { AppTable } from "@components/table";
import React from "react";
import { useVaccinations } from "../logic/hook";

export const VaccinationsModule = () => {
  const { columns, rows, loading } = useVaccinations();

  return (
    <div className="">
      <AppTable
        key="id"
        scroll={{ x: 1500, y: 820 }}
        columns={columns}
        rows={rows}
        loading={loading}
      />
    </div>
  );
};
