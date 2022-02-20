import React from "react";

interface TotalProps {
    parts: {
        name: string;
        exerciseCount: number;
    }[];
}

const Total = (props: TotalProps) => {
    return (
        <div>
            <p>
                Number of exercises: {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    );
};

export default Total;