/* eslint-disable no-unused-expressions */
import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngreadients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngreadients.length === 0) {
    transformedIngreadients = <p>Please start adding ingredients!</p>;
  }

  // MY WAY
  // const ingredientsCount = transformedIncreadients.reduce(
  //   (ingredients, incredient) => ingredients + incredient.length,
  //   0
  // );

  // if (ingredientsCount === 0) {
  //   transformedIncreadients = <p>Please start adding ingredients!</p>;
  // }

  // DEMONSTRATE
  // const burger = props => {
  //   const transformedIncreadients = Object.keys(props.ingredients).map(igKey => {
  //     console.log(props.ingredients[igKey]);
  //     console.log(igKey, [Array(props.ingredients[igKey])]);
  //     console.log('-------------------');
  //     console.log(igKey, [...Array(props.ingredients[igKey])]);

  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       console.log([igKey, i]);
  //       return <BurgerIngredient key={igKey + i} type={igKey} />;
  //     });
  //   });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngreadients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
