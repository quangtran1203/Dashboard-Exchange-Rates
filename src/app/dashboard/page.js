"use client";
import React, { useEffect, useState } from "react";
import ExchangeRateChart from "../../../components/ExchangeRateChart";
import styles from "./dashboard.module.css";
import { Typography, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@mui/material";
import ExchangeRateTable from "../../../components/ExchangeRateTable";

const App = () => {
    const [data, setData] = useState({ dates: [], cad: [], usd: [], eur: [] });
    const [baseCurrency, setBaseCurrency] = useState("USD");

    const fetchExchangeRates = async (baseCurrency) => {
        try {
            const response = await fetch(
                `https://api.frankfurter.app/2022-06-08..?from=${baseCurrency}&to=USD,CAD,EUR`
            );
            const result = await response.json();

            const dates = [];
            const cad = [];
            const eur = [];
            const usd = [];

            for (const [date, rates] of Object.entries(result.rates)) {
                dates.push(date);
                rates.CAD && cad.push(rates.CAD);
                rates.EUR && eur.push(rates.EUR);
                rates.USD && usd.push(rates.USD);
            }

            setData({ dates, cad, eur, usd });
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    };

    useEffect(() => {
        fetchExchangeRates(baseCurrency);
    }, [baseCurrency]);

    const handleCurrencyChange = (event) => {
        setBaseCurrency(event.target.value);
    }

    return (
        <div className={styles.dashboardWrapper}>
            <Typography variant="h4" color={"black"} gutterBottom>
                Exchange Rate Data{" "}
                <Typography variant="h5" color="black" component="span" gutterBottom>
                    (2-year span)
                </Typography>
            </Typography>

            <div className={styles.chartSelect}>
                <div className={styles.currencySelect}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Base Currency</InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            value={baseCurrency}
                            defaultValue="USD"
                            label="Base Currency"
                            onChange={handleCurrencyChange}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"CAD"}>CAD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                        </Select>
                        <FormHelperText>Convert 1 {baseCurrency} to other currencies</FormHelperText>
                    </FormControl>
                </div>

                <div className={styles.chartWrapper}><ExchangeRateChart data={data} /></div>
            </div>

            <ExchangeRateTable data={data} />
        </div>
    );
};

export default App;
