import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const ExchangeRateTable = ({ data }) => {

    let rowData;
    let columnDefs;
    if (data.usd.length === 0) {
        rowData = data.dates.map((date, index) => ({
            date,
            cad: data.cad[index],
            eur: data.eur[index],
        }));
        columnDefs = [
            { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
            { headerName: 'CAD', field: 'cad', filter: 'agNumberColumnFilter' },
            { headerName: 'EUR', field: 'eur', filter: 'agNumberColumnFilter' },
        ]
    }
    else if (data.cad.length === 0) {
        rowData = data.dates.map((date, index) => ({
            date,
            usd: data.usd[index],
            eur: data.eur[index],
        }));
        columnDefs = [
            { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
            { headerName: 'USD', field: 'usd', filter: 'agNumberColumnFilter' },
            { headerName: 'EUR', field: 'eur', filter: 'agNumberColumnFilter' },
        ]
    }
    else {
        rowData = data.dates.map((date, index) => ({
            date,
            usd: data.usd[index],
            cad: data.cad[index],
        }));
        columnDefs = [
            { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
            { headerName: 'CAD', field: 'cad', filter: 'agNumberColumnFilter' },
            { headerName: 'USD', field: 'usd', filter: 'agNumberColumnFilter' },
        ]
    }


    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
    }), []);

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
            />
        </div>
    );
};

export default ExchangeRateTable;
