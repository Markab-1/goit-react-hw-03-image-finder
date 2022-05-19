import React, { Component } from 'react';
import Notiflix from 'notiflix';

import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    imgName: '',
  };

  handleChange = e => {
    this.setState({ imgName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.imgName.trim() === '') {
      Notiflix.Notify.info('Please, enter what you want to find');
      return;
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.btnLabel}>Search</span>
          </button>

          <input
            className={s.input}
            value={this.state.imgName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
