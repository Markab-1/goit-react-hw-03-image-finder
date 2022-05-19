import React, { Component } from 'react';

import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  class Gallery extends Component {
    state = {
      imgName: '',
    };

    handleFormSubmit = imgName => {
      this.setState({ imgName });
    };

    render() {
      const { imgName } = this.state;
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery imgName={imgName} />
        </div>
      );
    }
  }

  return (
    <Container>
      <Gallery />
    </Container>
  );
};
