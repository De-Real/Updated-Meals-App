import classes from "./LoadingRequest.module.css";

const LoadingRequest = () => {
  return (
    <div className={classes.loading}>
      <img
        src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
        alt="loading-gif"
      ></img>
    </div>
  );
};

export default LoadingRequest;
