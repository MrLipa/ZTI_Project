import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import {useFlightQuery} from './../api/ApiHooks';

interface Flight {
  id: number;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  image: string;
  price: number;
  date: string;
  duration: string;
  airline: string;
  class: string;
  freeSeats: number;
}
export default function BasicDemo() {
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const { data: flights, isLoading, isError } = useFlightQuery();
    const [filters, setFilters] = useState<any>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const [selectedFlight, setSelectedFlight] = useState<any>(undefined);

    const statuses = ['Business', 'First Class', 'Economy'];

    const getClass = (status: string) => {
        switch (status) {
            case 'Business':
                return 'danger';

            case 'Economy':
                return 'success';

            case 'First Class':
                return 'info';
        }
    };

    useEffect(() => {
      if (!isLoading && !isError && flights) {
        setFlightData(flights);
      }
    }, [flights, isLoading, isError]);

    const fromTemplate = (flight: Flight) => {
        return (
        <div className="flex align-items-center gap-2">
            <img 
                src={flight.image} 
                style={{ 
                    width: '60px', 
                    height: '50px', 
                    borderRadius: '50%', // this makes the image round 
                }} 
            />
            <span style={{ marginLeft: '10px' }}>{flight.originCity}</span>
        </div>
        );
    };

    const toTemplate = (flight: Flight) => {
      return (
        <div className="flex align-items-center gap-2">
            <img 
                src={flight.image} 
                style={{ 
                    width: '60px', 
                    height: '50px', 
                    borderRadius: '50%', // this makes the image round 
                }} 
            />
            <span style={{ marginLeft: '10px' }}>{flight.destinationCity}</span>
        </div>
      );
  };

    const classTemplate = (flight: Flight) => {
        return <Tag value={flight.class} severity={getClass(flight.class)} />;
    };

    const classFilterTemplate = (options: { value: any; filterCallback: (value: any, index: number) => void; index: number }) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={classItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const classItemTemplate = (option: any) => {
        return <Tag value={option} severity={getClass(option)} />;
    };

    const onGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
    };

    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Global Search" />
                </span>
                <Button label="Najkrótszą ścieżke" />
            </>
        );
    };

    const header = renderHeader();

    return (
        <div className="card">
            <DataTable
                value={flightData}
                paginator
                rows={5}
                header={header}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                selection={selectedFlight}
                onSelectionChange={(e) => setSelectedFlight(e.value)}
                selectionMode="single"
                dataKey="id"
                stateStorage="session"
                stateKey="dt-state-demo-local"
                emptyMessage="No flights found."
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column
                    header="From"
                    body={fromTemplate}
                    sortable
                    sortField="originCity"
                    filter
                    filterField="originCity"
                    filterPlaceholder="Search"
                    style={{ width: '25%' }}
                ></Column>
                <Column
                    header="To"
                    body={toTemplate}
                    sortable
                    sortField="destinationCity"
                    filter
                    filterField="destinationCity"
                    filterPlaceholder="Search"
                    style={{ width: '25%' }}
                ></Column>
                <Column field="price" header="Price" sortable filter filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                <Column
                    field="class"
                    header="Class"
                    body={classTemplate}
                    sortable
                    filter
                    filterElement={classFilterTemplate}
                    filterMenuStyle={{ width: '14rem' }}
                    style={{ width: '25%' }}
                ></Column>
            </DataTable>
        </div>
    );
}
