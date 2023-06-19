import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useFlightQuery } from "./../api/ApiHooks";
import { Flight } from "../typescript/interfaces";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function BasicDemo() {
  const { t } = useTranslation('translations');
  const [flightData, setFlightData] = useState<Flight[]>([]);
  const { data: flights, isLoading, isError } = useFlightQuery();
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const [selectedFlight, setSelectedFlight] = useState<any>(undefined);

  const statuses = [t("Business"), t("First Class"), t("Economy")];

  const getClass = (status: string) => {
    switch (status) {
      case t("Business"):
        return "danger";

      case t("Economy"):
        return "success";

      case t("First Class"):
        return "info";
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
          src={flight.originImage}
          style={{
            width: "60px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <span style={{ marginLeft: "10px" }}>{flight.originCity}</span>
      </div>
    );
  };

  const toTemplate = (flight: Flight) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          src={flight.destinationImage}
          style={{
            width: "60px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <span style={{ marginLeft: "10px" }}>{flight.destinationCity}</span>
      </div>
    );
  };

  const classTemplate = (flight: Flight) => {
    return <Tag value={flight.class} severity={getClass(flight.class)} />;
  };

  const classFilterTemplate = (options: {
    value: any;
    filterCallback: (value: any, index: number) => void;
    index: number;
  }) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={classItemTemplate}
        placeholder={t("Select One")}
        className="p-column-filter"
        showClear
      />
    );
  };

  const classItemTemplate = (option: any) => {
    return <Tag value={option} severity={getClass(option)} />;
  };

  const onGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder={t("Global Search")}
          />
        </span>
        {/* <Button label={t("Shortest Path")} /> */}
      </>
    );
  };

  const header = renderHeader();
  const navigate = useNavigate();
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
        onSelectionChange={(e) => {
          navigate(`/flight/${e.value.id}`);
          setSelectedFlight(e.value);
        }}
        selectionMode="single"
        dataKey="id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage={t("No flights found.")}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header={t("From")}
          body={fromTemplate}
          sortable
          sortField="originCity"
          filter
          filterField="originCity"
          filterPlaceholder={t("Search")}
          style={{ width: "25%" }}
        ></Column>
        <Column
          header={t("To")}
          body={toTemplate}
          sortable
          sortField="destinationCity"
          filter
          filterField="destinationCity"
          filterPlaceholder={t("Search")}
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="price"
          header={t("Price")}
          sortable
          filter
          filterPlaceholder={t("Search")}
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="class"
          header={t("Class")}
          body={classTemplate}
          sortable
          filter
          filterElement={classFilterTemplate}
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
