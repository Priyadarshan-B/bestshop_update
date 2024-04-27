import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import requestApi from "../../utils/axios";

export default function InventoryDashboard() {
  const [chartData, setChartData] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1); 
  const [categoryOptions, setCategoryOptions] = useState([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await requestApi("GET", "/api/structure/category");
        if (response.success) {
          const options = response.data.map((category) => ({
            value: category.id,
            label: category.name,
          }));
          setCategoryOptions(options);
        } else {
          console.error("Error fetching categories:", response.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestApi(
          "GET",
          `/api/stock/sales-dashboard?category=${selectedCategoryId}`
        );
        if (response.success) {
          setChartData(response.data);
        } else {
          console.error("Error fetching data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCategoryId]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategoryId(selectedOption.value);
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const { item_names, total_quantities, available_quantity } = chartData;

  return (
    <div style={{
      height: "97%",
      width: "96%",
      padding: "10px",
      backgroundColor:"var(--background-1)",
      borderRadius:"5px"
    }}>
      <Select
        options={categoryOptions}
        onChange={handleCategoryChange}
        defaultValue={categoryOptions.find(
          (option) => option.value === selectedCategoryId
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary50: "var(--text)",
            primary: "var(--button)",
            primary25: "var(--button-hover)",
            neutral0: "var(--background)",
            neutral20: "#178a84",
            neutral30: "#82FFE7",
            neutral40: "#CAFFCA",
            neutral50: "#F4FFFD",
            neutral60: "#fff",
            neutral80: "var(--text)",
          },
        })}
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'var(--text)' : 'var(--text)',
            backgroundColor: state.isFocused ? 'var(--background)' : 'var(--button-hover)',
            '&:hover': {
              backgroundColor: 'var(--button)',
            },
          }),
        }}
      />

      <ReactApexChart
        height={"90%"}
        width={"100%"}
        
        options={{
          chart: {
            type: "bar",
            height: 430,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: "1",
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            // position: "top",
            enabled: true,
            offsetX:0,
            offsetY:-15,
            style: {
              fontSize: "10px",
              
              colors: ["var(--text)"],
            },
          },
          fill: {
            colors: ["#4ECDC4", "#2B908F"],
          },
          stroke: {
            show: true,
            width: 1,
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          xaxis: {
            categories: item_names,
            labels: {
              style: {
                fontSize:'9px',
                colors: 'var(--text)'
              },
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: 'var(--text)'
              },
            }
          },
          legend:{
            labels: {
                colors: 'var(--text)'
            },
            markers:{
              fillColors:["#4ECDC4", "#2B908F"]
            }

            
          },
          responsive: [
            {
              breakpoint: 1000,
              options: {
                plotOptions: {
                  bar: {
                    horizontal: true
                  }
                },
                legend: {
                  position: "bottom"
                },
                dataLabels:{
                  offsetX:0,
            offsetY:0,
                }
              }
            }
          ]
          

        }}
        
        series={[
          { name: "Total Quantities", data: total_quantities },
          { name: "Available Quantity", data: available_quantity },
        ]}
        type="bar"
      />
    </div>
  );
}
