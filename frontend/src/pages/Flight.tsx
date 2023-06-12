import React from 'react';
import { useParams } from 'react-router-dom';

const Flight = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      Flight ID: {id}
    </div>
  );
};

export default Flight;