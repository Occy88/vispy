import '../css/RegisterDelivery.css'
import en from "../../../../static/js/common/lang_en";
import React from "react";
import RegisterDeliveryForm from '../../../../delivery_manager/static/delivery_manager/js/RegisterDeliveryForm.jsx'
import RegisterProductForm from '../../../../product_manager/static/product_manager/js/RegisterProductForm.jsx'
import RegisterSupplierForm from '../../../../supplier_manager/static/supplier_manager/js/RegisterSupplierForm.jsx'
import RegisterShipmentSiteForm
    from '../../../../supplier_manager/static/supplier_manager/js/RegisterShipmentSiteForm.jsx'
import RegisterStock from '../../../../knn_backend/static/knn_backend/js/RegisterStock.jsx'
import StockList from '../../../../knn_backend/static/knn_backend/js/StockList.jsx'
import CompanyList from '../../../../company_manager/static/company_manager/js/ModelList.jsx'
import ProductList from "../../../../product_manager/static/product_manager/js/ProductList.jsx";
import QrRead from "../../../../static/js/common/QrRead.jsx";
import StockAssignment from "./StockAssignment.jsx";
import ProductLabelGenerator from "../../../../product_manager/static/product_manager/js/ProductLabelGenerator.jsx";
import DeliveryList from "../../../../delivery_manager/static/delivery_manager/js/ModelList.jsx";

const lang = en;

class TestStuff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: null,
            company: "",
            stock: null,
            products: null,
            products_with_relations: []
        }

    }

    deliveryNotRegistered(error_m) {
        alert(lang.fail + " : " + error_m)
    }

    deliveryRegistered(delivery_object) {
        alert(lang.success + " : " + delivery_object.id)

    }


    setCompany(object) {
        this.setState({
            company: object
        })

    }

    setStock(object) {
        this.setState({
            stock: object
        })
    }

    setProducts(object) {
        this.setState({
            products: object
        })
    }
    setDelivery(object) {
        this.setState({
            delivery: object
        })
    }

    handleScan(data) {

        alert(data)
    }

    setProductsWithRelations(object) {
        this.setState({
            products_with_relations: object
        })
    }

    render() {
        return (
            <div>
                <div className={"register_app"}>
                    {lang.success}
                    <RegisterDeliveryForm onFailure={this.deliveryNotRegistered.bind(this)}
                                          onSuccess={this.deliveryRegistered.bind(this)}/>
                </div>
                <div className={"register_app"}>
                    <RegisterProductForm/>
                </div>
                <div className={"register_app"}>
                    <h2>Add Supplier</h2>
                    <RegisterSupplierForm/>
                </div>
                <div className={"register_app"}>
                    <h2>Add ShipmentSite</h2>
                    <RegisterShipmentSiteForm/>
                </div>
                <div className={"register_app"}>
                    <h2>Register Stock</h2>
                    <RegisterStock/>
                </div>
                <div className={"register_app"}>
                    <h2>Stock List</h2>
                    <CompanyList changeCompany={this.setCompany.bind(this)}/>
                    <StockList changeStock={this.setStock.bind(this)}
                               stock_holder={this.state.company ? this.state.company.id : null}/>
                </div>
                <div className={"register_app"}>
                    <h2>Product List</h2>
                    <CompanyList changeCompany={this.setCompany.bind(this)}/>
                    <ProductList product_owner={this.state.company ? this.state.company.id : null}
                                 changeProduct={this.setProducts.bind(this)}/>
                </div>

                <div className={"register_app"}>
                    <h2>Stock Assignment</h2>
                    <StockAssignment/>
                </div>
                <div className={"register_app"}>
                    <h2>Print Labels</h2>
                    <CompanyList changeCompany={this.setCompany.bind(this)}/>
                    <DeliveryList delivery_for={this.state.company?this.state.company.id:null} changeDelivery={this.setDelivery.bind(this)}/>
                    <StockList stock_holder={this.state.company ? this.state.company.id : null} changeStock={this.setStock.bind(this)}/>
                    <ProductList with_relations={true}
                                 product_owner={this.state.company ? this.state.company.id : null}
                                 delivery={this.state.delivery ? this.state.delivery.id : null}
                                 stock={this.state.stock ? this.state.stock.id : null}
                                 changeProduct={this.setProductsWithRelations.bind(this)}/>
                    <ProductLabelGenerator product_list={this.state.products_with_relations}/>

                </div>
            </div>
        )
    }
}

export default TestStuff