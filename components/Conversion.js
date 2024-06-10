import TextField from "@mui/material/TextField";
import styles from "./Conversion.module.css";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SouthIcon from '@mui/icons-material/South';

const Conversion = ({ baseCurrency }) => {
    const [amount, setAmount] = useState("");
    const [conversionResults, setConversionResults] = useState({});
    const [ratesData, setRatesData] = useState([]);
    const [error, setError] = useState("");

    const fetchLatestRates = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/exchange-rate-data");
            const result = await res.json();
            setRatesData(result.data);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
        }
    };

    useEffect(() => {
        fetchLatestRates();
    }, []);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const getRates = () => {
        const rateObj = ratesData.find((item) => item[baseCurrency]);
        return rateObj ? rateObj[baseCurrency] : null;
    };

    useEffect(() => {
        if (amount !== "" && isNaN(amount)) {
            setError("Amount must be a numeric value");
            setConversionResults({});
        } else {
            setError("");
            const rates = getRates();
            if (rates) {
                const amountNum = parseFloat(amount);
                const results = Object.keys(rates).reduce((acc, key) => {
                    if (key !== 'date') {
                        acc[key] = (amountNum * rates[key]).toFixed(3);
                    }
                    return acc;
                }, {});
                setConversionResults(results);
            }
        }
    }, [amount, baseCurrency, ratesData]);

    return (
        <div className={styles.conversionWrapper}>
            <div className={styles.conversionField}>
                <TextField
                    label="Amount to convert"
                    variant="standard"
                    size="medium"
                    value={amount}
                    onChange={handleAmountChange}
                    color={error.length !== 0 && "error"}
                    helperText={error.length !== 0 && error}
                />
                <Typography variant="body2" color="black">
                    {baseCurrency}
                </Typography>
            </div>
            <SouthIcon fontSize="large" sx={{ color: "black", fontSize: 40 }} />
            {
                error.length === 0 && amount !== "" && (
                    <>
                        {Object.keys(conversionResults).map(key => (
                            <Typography key={key} variant="body2" color="black">{`${conversionResults[key]} ${key}`}</Typography>
                        ))}
                        <Typography color="black" variant="caption">Based on the latest quote</Typography>
                    </>
                )
            }
        </div>
    );
};

export default Conversion;
