import { Rings } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.spin}>
      <Rings height="70" width="70" color="orange" ariaLabel="loading" />
    </div>
  );
}
