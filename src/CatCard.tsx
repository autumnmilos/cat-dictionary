import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCatDetails, CatDetails } from './api'; 

const CatCard: React.FC = () => {
const { id, url } = useParams<{ id: string; url: string }>();
const [catDetails, setCatDetails] = useState<CatDetails | null>(null);

useEffect(() => {
    const fetchData = async () => {
        const details = await fetchCatDetails(id ?? '');

        setCatDetails(details || null);
    };

    fetchData();
}, [id]);

  return (
    <div>
      <h1>Cat Card</h1>
      <img
        src={url}
        alt={`Cat-${id}`}
        style={{ width: '500px', height: '500px', margin: '5px', objectFit: 'cover' }}
      />

      {catDetails && (
        <div>
            <p>Name: {catDetails.name}</p>
            <p>Origin: {catDetails.origin}</p>
            <p>Temperament: {catDetails.temperament}</p>
            <p>Life Span: {catDetails.life_span}</p>
            <p>Weight: {catDetails.weight.imperial} lbs</p>
            <p>Description: {catDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default CatCard;
