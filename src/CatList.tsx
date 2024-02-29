import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import rightArrow from './assets/rightArrow.svg';
import { CatImage, fetchCatImages, fetchCatName } from './api';
import './CatList.css';

const CatList: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [catNames, setCatNames] = useState<Record<string, string>>({});

  // Fetch cat images when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const images = await fetchCatImages();
      setCatImages(images);
    };

    fetchData();
  }, []);

  // Fetch cat names corresponding to their IDs when catImages state is updated
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
      {/* Map through cat images to display individual cat cards */}
      {catImages.map((catImage) => (
        <div className='cat-block' key={catImage.id}>
          {/* Display cat image */}
          <img className='cat-image' src={catImage.url} alt={`Cat-${catImage.id}`} />
          {/* Display cat name */}
          <p>{catNames[catImage.id]}</p>
          {/* Link to cat's profile with a button */}
          <Link to={`/cat/${catImage.id}/${encodeURIComponent(catImage.url)}`}>
            <button>
              {/* Button text with an arrow icon */}
              <p>Read Breed Profile <img className='arrow' src={rightArrow} alt="Right Arrow" /></p>
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CatList;
