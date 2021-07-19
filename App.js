import './App.css';
import Product from "./Product";
import moment from "moment";
import React from "react";
import axios from "axios";

class App extends React.Component {
    state = {
        products: [{
            name: "My Way",
            price: 300,
            category: "Food",
            region: "South",
            phone: "0502433259",
            forAdults:"No"
        }, {
            name: "Queen Of Shvea",
            price: 6500,
            category: "Vacation",
            region: "South",
            forAdults:"Adults"
        }, {
            name: "Hotel Rimonim",
            price: 3400,
            category: "Vacation",
            region: "South",
            forAdults:"Adults"
        }, {
            name: "Club Hotel",
            price: 3500,
            category: "Vacation",
            region: "North",
            forAdults:"Adults"
        }, {
            name: "Orient Jerusalem",
            price: 6700,
            category: "Vacation",
            region: "Central",
            forAdults:"Adults"
        }, {
            name: "Dead Sea Hotel",
            price: 100,
            category: "Vacation",
            region: "East",
            forAdults:"No"
        }, {
            name: "H&M",
            price: 30,
            category: "Clothing",
            region: "South",
            forAdults:"No"
        }, {
            name: "2C",
            price: 600,
            category: "Food",
            region: "Central",
            forAdults:"Adults"
            }],
        selectedCategory: "All",
        categories: ["Vacation", "Food", "Clothing"],
        selectedRegion: "All",
        regions: ["South", "North", "East", "West","Central"],
        selectedPriceRange:"All",
        priceRange:["100","300","600"],
        currentCurrency:"EUR",
        currencySign:["USD","ILS","GBP"],
        result:"",
        dateCreate: moment().format("YYYY-MM-DD"),
        nameFilter:"",
        radioFilter:"All"
    }

    categoryChange = (event) => {
        const value = event.target.value;
        this.setState({
            selectedCategory: value
        })
    }

    regionChange = (event) => {
        const value = event.target.value;
        this.setState({
            selectedRegion: value
        })
    }
    priceRangeChange = (event) => {
        const value = event.target.value;
        this.setState({
            selectedPriceRange: value
        })
    }
    convertOption=(event)=>{
        const value = event.target.value;
        this.setState({
            currentCurrency: value,
        })}
    doConversion=()=>{
        axios.get("http://data.fixer.io/api/"+this.state.dateCreate+"?access_key=31ac57b1c066ae6c762417e3a95af060&symbols="+this.state.currentCurrency).then(
            (response) => {
                const value = response.data.rates[this.state.currentCurrency];
                this.setState({
                    result:value
                })
                const tempProducts=this.state.products
                tempProducts.map(product=>{
                    return(
                        product.price=(product.price*value).toFixed(3)
                        )
                })
                this.setState({
                    products:tempProducts
                })
            })
    }
    filter = () => {
        const filtered = this.state.products.filter(product => {
            return (this.state.selectedCategory == "All" || product.category == this.state.selectedCategory)
                &&(this.state.selectedRegion == "All" || product.region == this.state.selectedRegion)
                &&(this.state.selectedPriceRange=="All"|| product.price <= this.state.selectedPriceRange)
                &&(product.name.includes(this.state.nameFilter))
            &&(this.state.radioFilter=="All"|| product.forAdults==this.state.radioFilter)
        })
        return filtered;
    }
    inputChange=(event)=>{
        let value =event.target.value;
        this.setState({
            nameFilter:value
        })
    }
    radioCheck=(event)=>{
        const value=event.target.value
        this.setState({
            radioFilter:value
        })
    }
    render() {
        return (
            <div className="All">
            <div className="Title">
                Welcome To Best Gift
            </div>
            <div className="Sort">
                Category:
                <select value={this.state.selectedCategory} onChange={this.categoryChange} >
                    <option value={"All"}>
                        All
                    </option>
                    {
                        this.state.categories.map(category => {
                            return (
                                <option value={category}>
                                    {category}
                                </option>
                            )
                        })
                    }
                </select>
                Region:
                <select value={this.state.selectedRegion} onChange={this.regionChange}>
                    <option value={"All"}>
                        All
                    </option>
                    {
                        this.state.regions.map(region => {
                            return (
                                <option value={region}>
                                    {region}
                                </option>
                            )
                        })
                    }
                </select>
                Price:
                <select value={this.state.selectedPriceRange} onChange={this.priceRangeChange}>
                    <option value={"All"}>
                        All
                    </option>
                    {
                        this.state.priceRange.map(price => {
                            return (
                                <option value={price}>
                                    {price}
                                </option>
                            )
                        })
                    }
                </select>
                <br></br>
                <div className="Conversion">
                Show Price In Currency :
                <select value={this.state.currentCurrency} onChange={this.convertOption}>
                    <option value={"EUR"}> EUR </option>
                    {
                        this.state.currencySign.map(currency => {
                            return (
                                <option value={currency}>
                                    {currency}
                                </option>
                            )
                        })
                    }
                </select>
                    <br/>
                    <button onClick={this.doConversion}>Change Prices</button>
                    <div>Today's Value is : {this.state.result} </div>
            </div>
                <div style={{textAlign:"left"}}>
                    <input type="radio" value="All" name="adults" defaultChecked={true} onClick={this.radioCheck}/> All
                    <input type="radio" value="Adults" name="adults" onClick={this.radioCheck}/> Adults Only
                </div>
                <div style={{textAlign:"left"}}>Search By Name: <input value={this.state.nameFilter} onChange={this.inputChange}/></div>
            </div>
                <div className="products">
                {
                    this.filter().map(product => {
                        return (
                            <Product data={product}/>
                        )
                    })
                }
                </div>
            <div style={{textAlign:"right",fontSize:"8px"}} >(The prices are shown in {this.state.currentCurrency} currency)</div>
            </div>

        );
    }
}
export default App;
