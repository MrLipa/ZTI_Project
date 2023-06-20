import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
    const { t } = useTranslation('translations');

    return (
        <div className="search-bar-container">
            <InputText type="search" placeholder={t('Search')??''} className="search-input" />
            <i className="pi pi-search search-icon"></i>
        </div>
    );
};

export default SearchBar;
