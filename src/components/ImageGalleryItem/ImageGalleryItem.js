import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, setActiveIdx }) => {
  return (
    <li className={s.item} onClick={setActiveIdx}>
      <img className={s.img} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
};
