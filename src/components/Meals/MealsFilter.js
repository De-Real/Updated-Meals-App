import Card from "../UI/Card";
import classes from "./MealsFilter.module.css";

const MealsFilter = ({ value, changeValue }) => {
  return (
    <Card isMargin="marginned">
      <div className={classes["meals-filter"]}>
        <h2> Menu </h2>
        <div className={classes["meals-filter__filter"]}>
          <p> Filter </p>
          <select value={value} onChange={changeValue}>
            <option value="meat"> Meat </option>
            <option value="sushi"> Sushi </option>
            <option value="pizza"> Pizzas </option>
            <option value="burger"> Burgers </option>
            <option value="dessert"> Desserts </option>
            <option value="beverage"> Beverages </option>
          </select>
        </div>
      </div>
    </Card>
  );
};

export default MealsFilter;
