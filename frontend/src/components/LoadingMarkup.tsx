import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingMarkup = () => {
  const { t } = useTranslation('translations');

  return (
    <div className="py-4 text-center">
      <h3>{t('Loading')}</h3>
    </div>
  );
};

export default LoadingMarkup;