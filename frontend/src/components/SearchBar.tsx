import React from 'react';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} SearchBarProps
 * @description Props for the SearchBar component.
 */
interface SearchBarProps {}

/**
 * @typedef {Object} SearchBar
 * @description This React component represents a search bar.
 * It renders an input field and a search icon.
 * @param {SearchBarProps} props - The component props.
 */
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { t } = useTranslation('translations');

    return (
        <div className="search-bar-container">
            <InputText type="search" placeholder={t('Search') ?? ''} className="search-input" />
            <i className="pi pi-search search-icon"></i>
        </div>
    );
};

export { SearchBar };
