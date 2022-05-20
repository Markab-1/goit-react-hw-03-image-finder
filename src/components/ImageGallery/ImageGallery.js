import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetchImg from 'services/api';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal';
import Loader from '../Loader/Loader';

class ImageGallery extends Component {
  state = {
    gallery: [],
    error: null,
    status: '',
    showBtn: false,
    showModal: false,
    activeImgIdx: 0,
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;

    if (prevName !== nextName) {
      this.setState(
        {
          gallery: [],
          showBtn: false,
          status: 'pending',
        },
        () => {
          this.fetchRequest();
        }
      );
    }
  }

  fetchRequest = () => {
    const { pageNumber } = this.state;
    const { imgName } = this.props;

    fetchImg(imgName, pageNumber)
      .then(data =>
        this.setState({
          gallery: [...this.state.gallery, ...data.hits],
          status: 'resolved',
          showBtn: true,
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }));

    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  onLoadMore = () => {
    this.fetchRequest();
  };

  pageCounter = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  setActiveIdx = index => {
    this.setState({ activeImgIdx: index, showModal: true });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { gallery, error, status, showBtn, showModal, activeImgIdx } =
      this.state;

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    return (
      <div>
        <ul className={s.gallery}>
          {gallery.map((hit, index) => (
            <ImageGalleryItem
              key={hit.id}
              webformatURL={hit.webformatURL}
              largeImageURL={hit.largeImageURL}
              setActiveIdx={() => this.setActiveIdx(index)}
            />
          ))}
        </ul>
        {status === 'pending' && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={gallery[activeImgIdx].largeImageURL}
              alt=""
              width="700px"
            />
          </Modal>
        )}
        {showBtn && <Button onLoadMore={this.onLoadMore} />}
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  state: PropTypes.shape({
    gallery: PropTypes.array,
    number: PropTypes.number,
    error: PropTypes.string,
    status: PropTypes.string,
    showBtn: PropTypes.bool,
    showModal: PropTypes.bool,
    activeImgIdx: PropTypes.number,
    pageNumber: PropTypes.number,
  }),
};
