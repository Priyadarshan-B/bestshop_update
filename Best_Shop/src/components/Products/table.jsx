import { useState } from "react";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  RemoveRedEyeRounded,
} from "@mui/icons-material";
import "./style.css";

function CustomTable(props) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const tableData = props.data;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(currentPage * pageSize, tableData.length);

  const visibleData = tableData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(tableData.length / pageSize);

  return (
    <div
      className="custom-table"
      style={{
        border: !props.disableHeader ? "1.2px solid rgb(203, 208, 221)" : null,
      }}
    >
      {!props.disableHeader ? (
        <div className="table-header">
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 500 }}>{props.title}</h2>
            <p style={{ color: "grey", fontSize: 14, marginTop: 8 }}>
              {props.description}
            </p>
          </div>
          <div>
          </div>
        </div>
      ) : null}
      <div
        className="custom-table-body"
        style={{ padding: !props.disableHeader ? 20 : 0,
          overflow:"auto" }}
      >
        <div
          style={{
            border: "0.2px solid rgb(216, 216, 216)",
            borderRadius: 8,
            minWidth: "max-content"
          }}
        >
          <table>
            <thead>
              <tr>
                <td>S.No</td>
                {props.header.map((item, i) => (
                  <td key={i}>{item}</td>
                ))}
                {/* <td style={{ width: 100 }}>Action</td> */}
              </tr>
            </thead>
            <tbody>
              {visibleData.map((row, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  {props.field.map((item, i) => (
                   <td key={i} dangerouslySetInnerHTML={{ __html: row[item] }}></td>

                  ))}
                  {/* <td>
                    <div style={{ cursor: "pointer", width: "max-content" }}>
                     
                        <RemoveRedEyeRounded
                          onClick={() => {
                            if(props.buttonAction!==undefined)
                            props.buttonAction(startIndex + index);
                          }}
                        />

                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <h4 style={{ fontSize: 14, fontWeight: 500 }}>
              Page {currentPage} of {totalPages}
            </h4>
            <div className="pagination-right">
              <h4 style={{ fontSize: 14, fontWeight: 500 }}>Rows per page:</h4>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value, 10));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowBackIosRounded fontSize="sm" />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={endIndex >= tableData.length}
              >
                <ArrowForwardIosRounded fontSize="sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTable;