import React, { Component, Fragment, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import Select from "react-select";
import requestApi from "../../utils/axios";
import "../Inventory/inventory.css";

const ChartExample = ({ data, height, width }) => {
  const [options, setOptions] = useState({
    data: data,
    width: width,
    height: height,

    series: [
      {
        type: "radial-bar",
        radiusKey: "quarter",
        angleKey: "software",
        angleName: "Available Qunatity",
      },
      {
        type: "radial-bar",
        radiusKey: "quarter",
        angleKey: "hardware",
        angleName: "Total Quantity",
      },
    ],
    axes: [
      {
        type: "angle-number",
        startAngle: 270,
        endAngle: 450,
      },
      {
        type: "radius-category",
        positionAngle: 270,
      },
    ],
    legend: { enabled: false },
  });

  return <AgChartsReact options={options} />;
};

class AvailableDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelData: [],
      categories: [],
      selectedCategory: null,
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    requestApi("GET", `/api/structure/category`)
      .then((response) => {
        const categories = response.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  fetchItemNames = (categoryId) => {
    requestApi("GET", `/api/structure/item-name?category=${categoryId}`)
      .then((response) => {
        const items = response.data;
        const itemOptions = items.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        this.setState({ items: itemOptions });
      })
      .catch((error) => {
        console.error("Error fetching item names:", error);
      });
  };

  handleCategoryChange = (selectedOption) => {
    this.setState({ selectedCategory: selectedOption });
    this.fetchItemNames(selectedOption.value);
  };

  handleItemChange = (selectedOption) => {
    this.setState({ selectedItem: selectedOption });
    this.fetchModelData(selectedOption.value);
  };

  fetchModelData = (itemId) => {
    requestApi("GET", `/api/stock/model-dashboard?item_name=${itemId}`)
      .then((response) => {
        const modelData = response.data;
        this.setState({ modelData });
      })
      .catch((error) => {
        console.error("Error fetching model data:", error);
      });
  };

  render() {
    const { modelData, categories, items } = this.state;

    return (
     
              <div className="total-container">
                <div className="dropdown-container">
                  <Select
                    options={categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    onChange={this.handleCategoryChange}
                    placeholder="Select Category"
                  />
                  <Select
                    options={items}
                    onChange={this.handleItemChange}
                    placeholder="Select Item"
                  />
                </div>
                <div className="twobytwo1">

                {modelData.map((item, index) => (
                    <div key={index} className="model-card">
                      <div>
                        <h5>Model: {item.model_name}</h5>
                      </div>
                      <div id={`chart-${index}`} className="model-chart">
                        <ChartExample
                          data={[
                            {
                              quarter: "Available",
                              software: parseInt(item.available_quantity),
                              hardware: 0,
                            },
                            {
                              quarter: "Total",
                              software: 0,
                              hardware: parseInt(item.total_quantity),
                            },
                          ]}
                          height={200} // Set your desired height
                          width={250}
                        />
                      </div>
                    </div>
                  
                ))}
                </div>
              </div>
          
    );
  }
}

export default AvailableDashboard;
