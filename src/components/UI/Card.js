import classes from "./Card.module.css";

const Card = (props) => {
  const styleClasses = `${classes.card} ${
    props.isMargin ? classes[props.isMargin] : ""
  }`;

  return <div className={styleClasses}>{props.children}</div>;
};

export default Card;
