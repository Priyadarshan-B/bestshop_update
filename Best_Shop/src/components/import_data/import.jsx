import React, { useState } from "react";
import * as XLSX from "xlsx";

const ImportData = () => {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Convert the JSON data to the desired format
      const formattedData = jsonData.slice(1).map((row) => ({
        category: row[0],
        sub_category: row[1],
        brand: row[2],
        size: row[3],
        model: row[4],
        color: row[5],
        // billdt: row[6],
        item_name: row[7],
        quantity: parseFloat(row[10]),
        // freeqty: parseFloat(row[11]),
        mrp: parseFloat(row[21]),
      }));

      setJsonData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default ImportData;
