import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCatDetails, CatDetails } from './api'; 
import './CatCard.css';

const CatCard: React.FC = () => {
const { id, url } = useParams<{ id: string; url: string }>();
const [catDetails, setCatDetails] = useState<CatDetails | null>(null);

// Fetch cat details when the component mounts or when 'id' changes
useEffect(() => {
    const fetchData = async () => {
        const details = await fetchCatDetails(id ?? '');

        setCatDetails(details || null);
    };

    fetchData();
}, [id]);

  return (
    <div className='cat-card'>
      {/* Display the cat image */}
      <img
        src={url}
        alt={`Cat-${id}`}
      />

{/* Display cat details if available */}
{catDetails && (
  <div>
  <p>{catDetails.name}</p>
  <p><strong>Origin:</strong> {catDetails.origin}</p>
  <p><strong>Temperament:</strong> {catDetails.temperament}</p>
  <p><strong>Life Span:</strong> {catDetails.life_span}</p>
  <p><strong>Weight:</strong> {catDetails.weight.imperial} lbs</p>
  <p><strong>Description:</strong> {catDetails.description}</p>

  {/* Button to go back to the previous page */}
  <div className="cat-button-container">
    <button className="cat-button" onClick={() => window.history.back()}>
      Back
    </button>
  </div>
</div>
)}
    </div>
  );
};

export default CatCard;
