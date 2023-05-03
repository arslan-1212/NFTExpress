import React from "react";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ArrowDown from "../../assets/images/ArrowDown.png";

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <>
    <div className="selectPagiMAin">
      <span className="Rowsperpage">Rows per page:</span>{" "}
      <select
        className="form-control"
        value={currSizePerPage}
        onChange={(e) => onSizePerPageChange(e.target.value)}
        style={{
          WebkitAppearance: "none",
          MozAppearance: "none",
          appearance: "none",
          backgroundImage: `url(${ArrowDown})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
          backgroundSize: "18px",
        }}
      >
        {options.map((option) => (
          <option key={option.text} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  </>
);

const ShareTable = ({ columns, Data }) => {
  return (
    <>
      <div className="TableMain">
        <BootstrapTable
          bordered={false}
          bootstrap4
          keyField="id"
          data={Data}
          columns={columns}
          wrapperClasses="table-responsive"
          pagination={paginationFactory({
            sizePerPage: 10,
            showTotal: false,
            showPageListOnly: true,
            sizePerPageRenderer,
          })}
        />
      </div>
    </>
  );
};

export default ShareTable;
