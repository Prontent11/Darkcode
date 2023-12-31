"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { usePagination, useSortBy, useTable } from "react-table";

interface Problem {
  _id: string;
  problem_title: string;
  problem_difficulty: string;
}
interface SolveProblems {
  _id: string;
}
interface ProblemTableProps {
  problems: Problem[];
  solvedProblems?: SolveProblems[];
  onDelete?: () => void;
}

const ProblemTable: React.FC<ProblemTableProps> = ({
  problems,
  solvedProblems,
  onDelete,
}) => {
  console.error = function () {};
  const router = useRouter();
  const columns = React.useMemo(
    () => [
      {
        Header: "Problem Title",
        accessor: "problem_title" as const,
      },
      {
        Header: "Difficulty",
        accessor: "problem_difficulty" as const,
      },
      {
        Header: "Status",
        accessor: "_id" as const,
        Cell: ({ value }: { value: any }) => {
          if (solvedProblems?.includes(value)) {
            return (
              <button
                onClick={() => handleButtonClick(value)}
                className="text-purple-300"
              >
                Solved
              </button>
            );
          }
          return (
            <button onClick={() => handleButtonClick(value)}>Try it!</button>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    state: { pageIndex },
  } = useTable<Problem>(
    { columns, data: problems, initialState: { pageSize: 7 } },
    useSortBy,
    usePagination
  );
  let color: Boolean = true;
  const handleButtonClick = (problemId: string) => {
    router.push(`/problems/${problemId}`);
    console.log(`Button clicked for problem with ID: ${problemId}`);
    // Implement your logic for handling button click
  };

  return (
    <>
      <div>
        <button disabled={!canPreviousPage} onClick={previousPage}>
          ◀️
        </button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button disabled={!canNextPage} onClick={nextPage}>
          ▶️
        </button>
      </div>
      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
        className="text-left"
      >
        <thead className="text-xl">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ borderBottom: "2px solid black", padding: "8px" }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            color = !color;
            prepareRow(row);
            return (
              <tr className="text-md " {...row.getRowProps()}>
                {}
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      className={`py-3 pl-4 text-left ${
                        color ? "bg-[#2A2A2A]" : "bg-[#1A1A1A]"
                      }
                      ${
                        cell.column.id === "problem_difficulty"
                          ? cell.value === "Hard"
                            ? "text-red-600"
                            : cell.value === "Medium"
                            ? "text-yellow-500"
                            : cell.value === "Easy"
                            ? "text-green-500"
                            : {}
                          : {}
                      }
                      `}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProblemTable;
