import React, { useState, useEffect } from "react";

const url = "https://api.exchangerate.host/latest";

function Currency() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amount, setAmount] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(1);
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [showCurrency,setShowCurrency] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);
let toAmount, fromAmount;
  const currencyConverting = () => {
    // Currency conversion logic
    fromAmount = amount;
    toAmount = amount * exchangeRate;

    setShowCurrency(toAmount)

  };

  return (
    <div className="container">
      <div>
        <h4>Currency Converter</h4>
        <div className="showCurrency">
          <h4>{showCurrency}</h4>
        </div>
        <input
          type="number"
          placeholder="Enter Amount"
          className="textInput"
          onChange={(e) => setAmount(e.target.value)}
        />{" "}
        <br />
        <select className="selectCurrency"
                 onChange={(e)=> setFromCurrency(e.target.value)}
        > 
          {currencyOptions.map((option) => (
            <option >{option}</option>
          ))}
        </select>
        <select className="selectCurrency" 
        id="selectedFromCurrency"
        onChange={(e)=> setToCurrency(e.target.value)}>
          {currencyOptions.map((option) => (
            <option >{option}</option>
          ))}
        </select>{" "}
        <button onClick={currencyConverting}>Converter</button>
      </div>
    </div>
  );
}

export default Currency;
