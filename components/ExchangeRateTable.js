import React, { useMemo, useRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const ExchangeRateTable = ({ data }) => {

    const gridRef = useRef();
    const [gridApi, setGridApi] = useState(null);
    const [columnApi, setColumnApi] = useState(null);

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

    /**
     * Saves grid settings (sorting, filtering, etc) to localStorage any time the grid changes
     */
    const saveGridSettings = () => {
        if (gridApi && columnApi) {
            const filterState = gridApi.getFilterModel();
            const columnState = columnApi.getColumnState();
            localStorage.setItem('filterState', JSON.stringify(filterState));
            localStorage.setItem('columnState', JSON.stringify(columnState));
        }
    }

    /**
     * Restores grid settings from localStorage when the page refreshes
     */
    const restoreGridSettings = () => {
        const filterState = JSON.parse(localStorage.getItem('filterState'));
        const columnState = JSON.parse(localStorage.getItem('columnState'));
        if (filterState) {
            gridApi?.setFilterModel(filterState);
        }
        if (columnState) {
            columnApi?.applyColumnState({ state: columnState, applyOrder: true });
        }
    };

    useEffect(() => {
        if (gridApi && columnApi) {
            restoreGridSettings();
        }
    }, [gridApi, columnApi]);

    const onGridReady = params => {
        setGridApi(params.api);
        setColumnApi(params.api);
        restoreGridSettings();
    };

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={20}
                onGridReady={onGridReady}
                onSortChanged={saveGridSettings}
                onFilterChanged={saveGridSettings}
                onColumnMoved={saveGridSettings}
                onColumnResized={saveGridSettings}
                onColumnPinned={saveGridSettings}
                onColumnVisible={saveGridSettings}
            />
        </div>
    );
};

export default ExchangeRateTable;
