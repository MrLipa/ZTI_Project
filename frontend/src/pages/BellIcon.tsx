
import React, { useState,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { OverlayPanel } from 'primereact/overlaypanel';

const MyDataTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(100);
  const [data, setData] = useState([
    { notification: 'john@example.com' },
    { notification: 'jane@example.com' },
    { notification: 'john@example.com' },
    { notification: 'john@example.com' },
    { notification: 'jane@example.com' },
    { notification: 'john@example.com' },
  ]);

  const onPageChange = (event) => {
    setCurrentPage(event.first);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage;
    const endIndex = startIndex + 3; // Ilość rekordów na stronę ograniczona do 3

    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <DataTable value={getPaginatedData()}>
        <Column field="notification" />
      </DataTable>
      <Paginator
        first={currentPage}
        rows={3} // Ilość rekordów na stronę ograniczona do 3
        totalRecords={data.length}
        onPageChange={onPageChange}
        pageLinkSize={3} // Zmieniona liczba stron na 2
      />
    </div>
  );
};


const BellIcon = ({ icon, value }) => {
    const op = useRef(null);
  
    return (
      <div>
        <i className={`pi pi-${icon} p-overlay-badge`} style={{ fontSize: '2rem' }} onClick={(e) => op.current.toggle(e)}>
          {value && <Badge value={value}></Badge>}
        </i>
        <OverlayPanel ref={op} id={`${icon}-menu`} showCloseIcon={false} dismissable={true}>
          <MyDataTable/>
        </OverlayPanel>
      </div>
    );
};
  
export default BellIcon;
