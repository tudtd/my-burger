/* eslint-disable no-unused-expressions */
import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIncreadients = Object.keys(props.incredients)
    .map(igKey => {
      return [...Array(props.incredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIncreadients.length === 0) {
    transformedIncreadients = <p>Please start adding incredients!</p>;
  }

  // MY WAY
  // const incredientsCount = transformedIncreadients.reduce(
  //   (incredients, incredient) => incredients + incredient.length,
  //   0
  // );

  // if (incredientsCount === 0) {
  //   transformedIncreadients = <p>Please start adding incredients!</p>;
  // }

  // DEMONSTRATE
  // const burger = props => {
  //   const transformedIncreadients = Object.keys(props.incredients).map(igKey => {
  //     console.log(props.incredients[igKey]);
  //     console.log(igKey, [Array(props.incredients[igKey])]);
  //     console.log('-------------------');
  //     console.log(igKey, [...Array(props.incredients[igKey])]);

  //     return [...Array(props.incredients[igKey])].map((_, i) => {
  //       console.log([igKey, i]);
  //       return <BurgerIngredient key={igKey + i} type={igKey} />;
  //     });
  //   });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIncreadients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
