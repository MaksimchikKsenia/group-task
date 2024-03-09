import "./error.css";
import errorGif from "./errorGif.gif";
const Error = () => {
  return (
    <div className="wrapper-error">
      <img className='error-img' src={errorGif} alt="Error!" />
      <p className="blinking-text text">
        Ошибка! Проверьте Интернет-подключение и перезагрузите страницу!
      </p>
    </div>
  );
};

export default Error;
