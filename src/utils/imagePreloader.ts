const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (images: string[]): Promise<void[]> => {
  const promises = images.map(src => preloadImage(src));
  return Promise.all(promises);
}; 