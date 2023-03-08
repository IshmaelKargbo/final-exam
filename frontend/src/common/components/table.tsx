import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

interface prop {
  columns: ColumnsType<any>;
  rows: any[];
  loading?: boolean;
  scroll?: { x: number; y: number };
  key?: string;
}

export const AppTable = ({ columns, rows, loading, key, scroll }: prop) => {
  return (
    <div className="bg-white px-2">
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        pagination={{ pageSize: 20 }}
        scroll={scroll}
        loading={loading}
        rowKey={key}
        columns={columns}
        dataSource={rows}
      />
    </div>
  );
};
