import React, { useState } from "react";
import './table_content.css'
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import CategoryTable from "./category_table";
import ItemTable from "./item_table";
import BrandTable from "./brand_table";
import SubTable from "./sub_table";
import ModalTable from "./modal_table";
import ColorTable from "./color_table";
import SizeTable from "./size_table";

export default function Table() {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'Category':
                return <CategoryTable />;
            case 'item':
                return <ItemTable/>
            case 'Sub-Category':
                return <SubTable />;
            case 'brand':
                return <BrandTable/>
            case 'model':
                return <ModalTable/>
            case 'color':
                return <ColorTable/>
            case 'size':
                return <SizeTable/>
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <HorizontalNavbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <div className="dashboard-body">
                    <div className="table-content">
                        <div className="table-button" onClick={() => setActiveComponent('Category')}>Category</div>
                        <div className="table-button" onClick={() => setActiveComponent('item')}>Item</div>
                        <div className="table-button" onClick={() => setActiveComponent('Sub-Category')}>Sub-Category</div>
                        <div className="table-button" onClick={() => setActiveComponent('brand')}>Brand</div>
                        <div className="table-button" onClick={() => setActiveComponent('model')}>Model</div>
                        <div className="table-button" onClick={() => setActiveComponent('color')}>Color</div>
                        <div className="table-button" onClick={() => setActiveComponent('size')}>Size</div>



                    </div>
                    {renderActiveComponent()}
                </div>
            </div>
        </div>
    );
}
