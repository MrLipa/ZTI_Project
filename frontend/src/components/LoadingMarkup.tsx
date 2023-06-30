import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @typedef {Object} LoadingMarkup
 * @description This React component represents a loading markup.
 * It displays a loading message while content is being loaded.
 */
const LoadingMarkup = () => {
  const { t } = useTranslation('translations');

  return (
    <div className="py-4 text-center">
      <h3>{t('Loading')}</h3>
    </div>
  );
};

export { LoadingMarkup };
