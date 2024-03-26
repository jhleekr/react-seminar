// Fetch an image from the API and display it
import { useEffect, useState } from "react";

const fetchImage = async () => {
  const res = await fetch("https://nekos.best/api/v2/happy");
  const data = await res.json();
  return data.results[0].url;
};

export const Fetch = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const apiCall = async () => {
      const url = await fetchImage();
      setImageUrl(url);
    };
    apiCall();
  }, []);

  return (
    <>
      <img src={imageUrl} alt="Happy anime character" />
    </>
  );
};
