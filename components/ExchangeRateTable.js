import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExchangeRateTable = ({ data }) => {
    const rowData = data.dates.map((date, index) => ({
        date,
        cad: data.cad[index],
        eur: data.eur[index],
    }));

    const columnDefs = useMemo(() => [
        { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
        { headerName: 'CAD', field: 'cad', filter: 'agNumberColumnFilter' },
        { headerName: 'EUR', field: 'eur', filter: 'agNumberColumnFilter' },
    ], []);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    );
};

export default ExchangeRateTable;
