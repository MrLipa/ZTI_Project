import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
const flights = [
  {
    id: 1,
    from: {
      city: "New York",
      image: "new_york.jpg",
    },
    to: {
      city: "London",
      image: "london.jpg",
    },
    data: "2023-06-15",
    price: 500,
    class: "Economy",
  },
  {
    id: 2,
    from: {
      city: "Los Angeles",
      image: "los_angeles.jpg",
    },
    to: {
      city: "Tokyo",
      image: "tokyo.jpg",
    },
    data: "2023-07-02",
    price: 1200,
    class: "Business",
  },
  {
    id: 3,
    from: {
      city: "Paris",
      image: "paris.jpg",
    },
    to: {
      city: "Rome",
      image: "rome.jpg",
    },
    data: "2023-06-25",
    price: 800,
    class: "Economy",
  },
  {
    id: 4,
    from: {
      city: "Sydney",
      image: "sydney.jpg",
    },
    to: {
      city: "Dubai",
      image: "dubai.jpg",
    },
    data: "2023-08-10",
    price: 1500,
    class: "First Class",
  }
];

interface Flight {
    id: number;
    from: {
        city: string;
        image: string;
    };
    to: {
      city: string;
      image: string;
    };
    data: string
    price: number;
    class: string;
}

export default function BasicDemo() {
    const [flightData, setFlightData] = useState<Flight[]>([]);
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
      setFlightData(flights);
  }, []);

    const fromTemplate = (rowData: Flight) => {
        return (
            <div className="flex align-items-center gap-2">
                <img src={rowData.from.image} style={{ width: '24px' }} />
                <span>{rowData.from.city}</span>
            </div>
        );
    };

    const toTemplate = (rowData: Flight) => {
      return (
          <div className="flex align-items-center gap-2">
              <img src={rowData.to.image} style={{ width: '24px' }} />
              <span>{rowData.to.city}</span>
          </div>
      );
  };

    const classTemplate = (rowData: Flight) => {
        return <Tag value={rowData.class} severity={getClass(rowData.class)} />;
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
                    sortField="from.city"
                    filter
                    filterField="from.city"
                    filterPlaceholder="Search"
                    style={{ width: '25%' }}
                ></Column>
                <Column
                    header="To"
                    body={toTemplate}
                    sortable
                    sortField="to.city"
                    filter
                    filterField="to.city"
                    filterPlaceholder="Search"
                    style={{ width: '25%' }}
                ></Column>
                <Column field="price" header="Price" sortable filter filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                <Column
                    field="class"
                    header="class"
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
