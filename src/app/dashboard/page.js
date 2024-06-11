"use client";
import React, { useEffect, useState } from "react";
import ExchangeRateChart from "../../../components/ExchangeRateChart";
import styles from "./dashboard.module.css";
import { Typography, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@mui/material";
import ExchangeRateTable from "../../../components/ExchangeRateTable";
import BackdropLoading from "../../../components/Backdrop";
import { formatRequest } from "../../../utils/formatRequest";
import Conversion from "../../../components/Conversion";

const App = () => {
    const [data, setData] = useState({ dates: [], cad: [], usd: [], eur: [] });
    const [baseCurrency, setBaseCurrency] = useState(!localStorage.getItem("baseCurrency") ? "USD" : localStorage.getItem("baseCurrency"));
    const [loading, setLoading] = useState(false);
    const [dataReady, setDataReady] = useState(false);

    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setFullYear(pastDate.getFullYear() - 2);
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const pastDateFormatted = formatDate(pastDate);

    const fetchExchangeRates = async (baseCurrency) => {
        try {
            setLoading(true);
            setDataReady(false);
            const response = await fetch(
                `https://api.frankfurter.app/${pastDateFormatted}..?from=${baseCurrency}&to=USD,CAD,EUR`
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

            // format req body data to make a POST req to backend server
            const formattedData = formatRequest(baseCurrency, { dates, cad, eur, usd }, currentDate.toISOString());
            const resFromBackend = await fetch("https://dashboard-exchange-rates-be.onrender.com/api/exchange-rate-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formattedData)
            });
            const resultFromBackend = await resFromBackend.json();
            console.log(resultFromBackend);

            setLoading(false);
            setDataReady(true);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchangeRates(baseCurrency);
    }, [baseCurrency]);

    const handleCurrencyChange = (event) => {
        setBaseCurrency(event.target.value);
        localStorage.setItem("baseCurrency", event.target.value);
    }

    return (
        <div className={styles.dashboardWrapper}>
            <BackdropLoading open={loading} />
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

                    {
                        dataReady && <Conversion baseCurrency={baseCurrency} />
                    }
                </div>

                <div className={styles.chartWrapper}><ExchangeRateChart data={data} /></div>
            </div>

            <ExchangeRateTable data={data} />
        </div>
    );
};

export default App;
