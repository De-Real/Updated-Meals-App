import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import MealsFilter from "./MealsFilter";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Talking Pork!",
//     description: "Just deluxe meat, nothing more",
//     price: 35.99,
//     type: "meat",
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 25.59,
//     type: "meat",
//   },
//   {
//     id: "m3",
//     name: "Barbecue Kebab",
//     description: "Amazing chicken meat cooked on the grill!",
//     price: 19.99,
//     type: "meat",
//   },
//   {
//     id: "m4",
//     name: "Meat grill mix",
//     description: "Unforgettable 6 kinds of meat! Must taste!",
//     price: 45.99,
//     type: "meat",
//   },
//   {
//     id: "m5",
//     name: "Beef with vegetables",
//     description: "Finest meat and veggies! It's really big 0_0 ",
//     price: 40.99,
//     type: "meat",
//   },
//   {
//     id: "s1",
//     name: "Green Dragon",
//     description: "Finest eel and veggies! Most tasty... Mmmm...",
//     price: 15.99,
//     type: "sushi",
//   },
//   {
//     id: "s2",
//     name: "Fire dragon",
//     description: "Finest salmon, vegetables and perfect souce.",
//     price: 14.99,
//     type: "sushi",
//   },
//   {
//     id: "s3",
//     name: "California roll with salmon",
//     description: "Classic rollwith a salmon",
//     price: 12.69,
//     type: "sushi",
//   },
//   {
//     id: "s4",
//     name: "California roll with salmon and caviar",
//     description:
//       "Just take clasicc roll and sprinkle a lot of caviar... Unbelievable!",
//     price: 14.29,
//     type: "sushi",
//   },
//   {
//     id: "s5",
//     name: "Mango sush",
//     description: "Nice sushi with mango and no more...",
//     price: 22.99,
//     type: "sushi",
//   },
//   {
//     id: "p1",
//     name: "Margarita",
//     description: "Classic pizza, just tomaty and cheesy!",
//     price: 14.99,
// 	 type:"pizza",
//   },
//   {
//     id: "p2",
//     name: "BBQ Pizza",
//     description: "Just meat mix, onion and perfect souce",
//     price: 19.99,
// 	 type:"pizza",
//   },
//   {
//     id: "p3",
//     name: "7 cheeses",
//     description: "Nothing to tell - finger-lickin' good.",
//     price: 22.49,
// 	 type:"pizza",
//   },
//   {
//     id: "p4",
//     name: "Meaty pizza",
//     description: "Too much meat! Much...",
//     price: 22.99,
// 	 type:"pizza",
//   },
//   {
//     id: "b1",
//     name: "Chicken Burger",
//     description: "Classic chicken burget, nothing to add",
//     price: 7.99,
// 	 type:"burger",
//   },
//   {
//     id: "b2",
//     name: "American burger",
//     description: "Beef meat, a lot of vegetables! American taste!",
//     price: 10.49,
// 	 type:"burger",
//   },
//   {
//     id: "b3",
//     name: "Double burger",
//     description: "Two kinds of meat. Perfecto..",
//     price: 12.99,
// 	 type:"burger",
//   },
//   {
//     id: "d1",
//     name: "Cheescake",
//     description: "Cheesy enough, perfect taste",
//     price: 6.99,
// 	 type:"dessert",
//   },
//   {
//     id: "d2",
//     name: "Apple cake",
//     description: "Simple. Taste.",
//     price: 5.49,
// 	 type:"dessert",
//   },
//   {
//     id: "bev1",
//     name: "Coke",
//     description: "Classic cola",
//     price: 1.99,
// 	 type:"beverage",
//   },
//   {
//     id: "bev2",
//     name: "Lemonade",
//     description: "Made by ourselves. Nice teste",
//     price: 3.49,
// 	 type:"beverage",
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [changedMeals, setChangedMeals] = useState(meals);
  const [mealsFilter, setMealsFilter] = useState("meat");

  const getMeals = async () => {
    const response = await fetch(
      "https://react-meals-d80c0-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    );
    if (response.ok) {
      const results = await response.json();
      const [key, value] = Object.entries(results)[0];
      setMeals(value);
    } else {
      console.log("everything is bad");
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  const onMealsFilterChange = (event) => {
    setMealsFilter(event.target.value);
  };

  useEffect(() => {
    setChangedMeals(
      meals.filter((meal) => {
        return meal.type === mealsFilter;
      })
    );
  }, [mealsFilter, meals]);

  const mealsList = changedMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <MealsFilter value={mealsFilter} changeValue={onMealsFilterChange} />
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
