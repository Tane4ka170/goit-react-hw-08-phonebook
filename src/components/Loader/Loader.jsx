import { Blocks } from 'react-loader-spinner';
import s from './Loader.module.css';

const Spinner = () => {
  return (
    <div className={s.loaderContainer}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};

export default Spinner;
