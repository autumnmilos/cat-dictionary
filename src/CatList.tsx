import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rightArrow from './assets/rightArrow.svg';
import { CatImage, fetchCatImages, fetchCatName } from './api';
import './CatList.css';

const CatGrid: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [catNames, setCatNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      const images = await fetchCatImages();
      setCatImages(images);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNames = async () => {
      const names: Record<string, string> = {};
      await Promise.all(
        catImages.map(async (catImage) => {
          const name = await fetchCatName(catImage.id);
          if (name) {
            names[catImage.id] = name;
          }
        })
      );
      setCatNames(names);
    };

    if (catImages.length > 0) {
      fetchNames();
    }
  }, [catImages]);

  

  return (
    <div className="cat-grid">
      {catImages.map((catImage) => (
        
          <div className='cat-card'>
            <img className='cat-image'
              src={catImage.url}
              alt={`Cat-${catImage.id}`}
            />
            <p>{catNames[catImage.id]}</p>
            <Link key={catImage.id} to={`/cat/${catImage.id}/${encodeURIComponent(catImage.url)}`}>
            <button> <p>Read Breed Profile <img className='arrow' src={rightArrow} alt="Right Arrow" /></p></button>
            </Link>
          </div>
      ))}
    </div>
  );
};

export default CatGrid;
