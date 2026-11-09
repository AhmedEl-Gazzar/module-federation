import React from 'react';
import './index.css';
import type { Data } from './index.data';

type ProviderProps = {
  mfData?: Data;
};

const Provider: React.FC<ProviderProps> = ({ mfData }) => {
  return (
    <div className="container">
      
      <h1 className="title">Data Fetching Test</h1>
      <p className="data-line">
        {mfData
          ? `${mfData.message} (loaded at ${mfData.fetchedAt})`
          : 'Rendered without mfData'}
      </p>
      {mfData?.params && (
        <pre className="data-params">
          loader params: {JSON.stringify(mfData.params)}
        </pre>
      )}
    </div>
  );
};

export default Provider;
