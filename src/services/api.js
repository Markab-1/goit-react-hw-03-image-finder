export default function fetchImg(imgName, pageNumber) {
  const apiKey = '25715190-c3c4d5478cb2124fb43ef72a8';
  const baseUrl =
    'https://pixabay.com/api/?q=' +
    `${imgName}` +
    '&key=' +
    `${apiKey}` +
    '&image_type=photo&orientation=horizontal&per_page=12&page=' +
    `${pageNumber}`;
  return fetch(baseUrl).then(res => {
    if (!res.ok) {
      return Promise.reject(
        new Error(`There is no an image with the name ${imgName}`)
      );
    }
    return res.json();
  });
}
