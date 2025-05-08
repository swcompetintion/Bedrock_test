import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  CellContext
} from "@tanstack/react-table";

import Dot from "./Dot";
import { Plan } from "../types/plans";
import { TableProps } from "../types/props";
import styles from "../css/Table.module.css";


const Table: React.FC<TableProps> = ({ data }) => {
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const columns = React.useMemo(
    () => [
      { 
        header: 'Title',
        accessorKey: 'title',
        enableSorting: false 
      },
      { 
        header: 'Body',
        accessorKey: 'body',
        enableSorting: false 
      },
      { 
        header: 'D-day',
        accessorKey: 'dDay',
        cell: (info: CellContext<any, number>) => {
          const val = info.getValue();
          return val < 0 ? '' : val;
        }
      },
      { 
        header: 'Importance',
        accessorKey: 'importance',
        cell: (info: CellContext<any, number>) => {
          const val = info.getValue();
          return val < 0 ? '' : val;
        }
      }
    ],
    []
  );
  const table = useReactTable(
    {
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: { sorting: sortingState },
      onSortingChange: setSortingState
    }
  );

  const representUnboudedDot = (header: string, data: Plan) => {
    if (header === 'Title' && (data.dDay <= -1 || data.importance <= -1)) {
      return (<Dot plan={data} />);
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>

        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === 'asc' ? ' ∧' : ''}
                  {header.column.getIsSorted() === 'desc' ? ' ∨' : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    {representUnboudedDot(cell.column.columnDef.header as string, row.original)}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default Table;