import React from 'react';
import { InputText } from 'primereact/inputtext';

const SearchBar = () => {
    return (
        <div style={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '50px' }}>
            <InputText type="search" placeholder="Search" style={{ borderRadius: '50px', width: '100%', paddingLeft: '2.5em', paddingRight: '1em' }} />
            <i className="pi pi-search" style={{ position: 'absolute', left: '0.5em', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5em', color: '#999' }}></i>
        </div>
    );
};

export default SearchBar;
