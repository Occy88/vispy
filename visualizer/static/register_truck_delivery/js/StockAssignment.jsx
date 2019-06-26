import '../css/RegisterDelivery.css'
import en from "../../../../static/js/common/lang_en";
import React from "react";
import StockList from '../../../../knn_backend/static/knn_backend/js/StockList.jsx'
import CompanyList from '../../../../company_manager/static/company_manager/js/ModelList.jsx'
import ProductList from "../../../../product_manager/static/product_manager/js/ProductList.jsx";
import QrRead from "../../../../static/js/common/QrRead.jsx";
import StockGridView from "../../../../knn_backend/static/knn_backend/js/StockGridView.jsx";
import DeliveryList from "../../../../delivery_manager/static/delivery_manager/js/ModelList.jsx";
import ProductService from "../../../../product_manager/static/product_manager/js/ProductService.jsx";
import audio from '../media/successful.mp3';

const lang = en;
const au = new Audio(audio);
/**
 * This module assigns a selected set or individual product to a selected stock
 * If a scanner is used, it should be automatic and multiple scans of the same object should be fine.
 * Product should be selected (filtered) by:
 * id => direct access to a given producty
 * delivery => access to set of products given a delivery id
 * stock => products residing in a given stock location (movement of product form a stock to another)
 */
export default class StockAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delivery: null,
            company: "",
            stock_to: null,
            stock_from: null,
            products: null
        };


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
            stock_to: object
        })
    }

    setStockFrom(object) {
        this.setState({
            stock_from: object
        })
    }

    setDelivery(object) {
        this.setState({
            delivery: object
        })
    }

    setProducts(object) {
        this.setState({
            products: object
        })
    }

    handleScan(data) {
        let product = {};
        product["id"] = data;
        product["stock"] = this.state.stock_to.id;
        product["product_owner"] = this.state.company.id;


        ProductService.updateProduct(product, this.state.company.id, data).then(d => {
            au.play();
            alert("logged");
        });
    }

    submit() {
        //set the new id for each element to be updated
        let data = this.state.products;
        for (let i = 0; i < data.length; i += 1) {
            data[i]["stock"] = this.state.stock_to.id
        }
        ProductService.updateBulkProduct(data, this.state.company.id).then(d => {
            alert(d);
        })
    }

    render() {
        return (
            <div>
                <CompanyList changeCompany={this.setCompany.bind(this)}/>

                <div className={"register_app"}>
                    <h2>Stock Map (click to select)</h2>
                    <h3>Selected Stock: </h3>
                    <input readOnly value={this.state.stock_to ? this.state.stock_to.code : "N/A"}></input>
                    <StockGridView selected_stock={this.state.stock_to}
                                   stock_holder={this.state.company ? this.state.company.id : null}
                                   changeStock={this.setStock.bind(this)}/>
                </div>
                <h2>Choose Products to transfer to stock</h2>
                <StockList stock_holder={this.state.company ? this.state.company.id : null}
                           changeStock={this.setStockFrom.bind(this)}/>
                <DeliveryList delivery_for={this.state.company ? this.state.company.id : null}
                              changeDelivery={this.setDelivery.bind(this)}/>
                <ProductList product_owner={this.state.company ? this.state.company.id : null}
                             delivery={this.state.delivery ? this.state.delivery.id : null}
                             stock={this.state.stock_from ? this.state.stock_from.id : null}
                             changeProduct={this.setProducts.bind(this)}/>
                <button className={"submit"} onClick={this.submit.bind(this)}>Submit</button>

                <div className={"register_app"}>
                    <h2>Scan product for transfer (auto)</h2>
                    <QrRead handleScan={this.handleScan.bind(this)}/>
                </div>


                {/*add multi select printable plastic list?*/}
            </div>
        )
    }
}

