import React from "react";

import classes from "./Order.css";

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient],
        });
    }

    const ingredientsOutput = ingredients.map((ingredient) => {
        return (
            <span
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    border: "1px solid #ccc",
                    padding: "5px",
                }}
                key={ingredient.name}
            >
                {ingredient.name} ({ingredient.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>
                Price:{" "}
                <strong>
                    USD {Number.parseFloat(props.totalPrice).toFixed(2)}
                </strong>
            </p>
        </div>
    );
};

export default order;
