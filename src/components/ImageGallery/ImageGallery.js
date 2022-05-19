import React, { Component } from 'react';
import { Rings } from 'react-loader-spinner';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    gallery: '',
    total: 0,
    error: null,
    status: '',
    showBtn: false,
    showModal: false,
    activeImgIdx: 0,
    link: '',
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imgName;
    const nextName = this.props.imgName;
    const KEY = '25715190-c3c4d5478cb2124fb43ef72a8';

    if (prevName !== nextName) {
      this.setState(
        {
          gallery: '',
          status: 'pending',
          link:
            'https://pixabay.com/api/?q=' +
            `${nextName}` +
            '&key=' +
            `${KEY}` +
            '&image_type=photo&orientation=horizontal&per_page=12&page=',
        },
        () => {
          setTimeout(() => {
            this.fetchRequest();
          }, 1000);
        }
      );
    }
  }

  fetchRequest = () => {
    const { link, pageNumber } = this.state;
    fetch(link + `${pageNumber}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`There is no an image with the name ${this.props.imgName}`)
        );
      })
      .then(data =>
        this.setState({
          gallery: [...this.state.gallery, ...data.hits],
          status: 'resolved',
          showBtn: true,
          total: data.totalHits,
        })
      )
      .catch(error => this.setState({ error, status: 'rejected' }));

    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  onLoadMore = () => {
    this.compareNumber();
    this.fetchRequest();
  };

  compareNumber = () => {
    const { total, pageNumber } = this.state;
    if (12 * pageNumber > total) {
      this.setState({ showBtn: true });
      return;
    }
    this.setState({ showBtn: false });
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
    console.log(gallery);
    if (status === 'pending') {
      return (
        <div className={s.spin}>
          <Rings height="70" width="70" color="orange" ariaLabel="loading" />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }

    if (status === 'resolved') {
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
}

export default ImageGallery;
