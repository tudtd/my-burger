import React from 'react';

const order = props => {
  const ingredients = [];
  for (let incredient in props.ingredients) {
    ingredients.push({
      name: incredient,
      amout: props.ingredients[incredient]
    });
  }

  const ingredientsOuput = ingredients.map(incredient => {
    return (
      <span key={incredient.name}>
        {incredient.name} ({incredient.amout})
      </span>
    );
  });

  return (
    <div>
      <p>Ingredients: {ingredientsOuput}</p>
      <p>
        Total Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
