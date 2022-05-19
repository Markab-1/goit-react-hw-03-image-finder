import s from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button className={s.btn} type="button" onClick={onLoadMore}>
      Show more
    </button>
  );
};

export default Button;
