import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, setActiveIdx }) => {
  return (
    <li className={s.item} onClick={setActiveIdx}>
      <img className={s.img} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
