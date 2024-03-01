export interface CatImage {
    id: string;
    url: string;
  }
  
  export const fetchCatImages = async (): Promise<CatImage[]> => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=true');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cat images:', error);
      return [];
    }
  };
  
  export const fetchCatName = async (catId: string): Promise<string | undefined> => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/${catId}`);
      const data = await response.json();
      return data.breeds[0]?.name;
    } catch (error) {
      console.error(`Error fetching cat name for id ${catId}:`, error);
      return undefined;
    }
  };
  
  export const fetchCatDetails = async (catId: string): Promise<CatDetails | undefined> => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/${catId}`);
      const data = await response.json();
      return data.breeds[0];
    } catch (error) {
      console.error(`Error fetching cat details for id ${catId}:`, error);
      return undefined;
    }
  }
    export interface CatDetails {
        id: string;
        name: string;
        origin: string;
        temperament: string;
        life_span: string;
        weight: {
        imperial: string;
        metric: string;    
        };
        description: string;
    }

    