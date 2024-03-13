import React, { useEffect, useState } from "react";
import requestApi from "../../utils/axios";

function DataConventor() {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await  requestApi("GET",'/api/stock/export-csv?date=2024-03-12&shop_location=2&bill_number=1', {
          
        });
        console.log(response.data);
        setCsvData(response.data);
      } catch (error) {
        console.error("Error fetching CSV:", error);
        // Handle error here
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    if (!csvData) return;

    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map(obj => Object.values(obj).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'exported_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>Data Converter Component</div>
      {csvData && <button onClick={downloadCSV}>Download CSV</button>}
    </div>
  );
}

export default DataConventor;
