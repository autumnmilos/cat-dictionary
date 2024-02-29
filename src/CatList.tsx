import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CatImage, fetchCatImages, fetchCatName } from './api';

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
        <Link key={catImage.id} to={`/cat/${catImage.id}/${encodeURIComponent(catImage.url)}`}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={catImage.url}
              alt={`Cat-${catImage.id}`}
              style={{ width: '500px', height: '500px', margin: '5px', objectFit: 'cover' }}
            />
            <p>{catNames[catImage.id]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CatGrid;
