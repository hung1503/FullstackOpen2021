import React from "react";
import { CoursePart } from "../types";

interface ContentProps {
    courseParts: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part = ({courseParts}: ContentProps) => {
        switch(courseParts.type) {
            case "normal":
                return (
                    <div>
                        <h3>{courseParts.name} {courseParts.exerciseCount}</h3>
                        <i>{courseParts.description}</i>
                    </div>);
            case "groupProject":
                return (
                    <div>
                        <h3>{courseParts.name} {courseParts.exerciseCount}</h3> 
                        <p>Project exercises {courseParts.groupProjectCount}</p>
                    </div>);
            case "submission":
                return (
                    <div>
                        <h3>{courseParts.name} {courseParts.exerciseCount}</h3> 
                        <i>{courseParts.exerciseSubmissionLink}</i>
                        <p>Submit to {courseParts.exerciseSubmissionLink}</p>
                    </div>);
            case "special":
                return (
                    <div>
                        <h3>{courseParts.name} {courseParts.exerciseCount}</h3> 
                        <i>{courseParts.description}</i>
                        <p>Required skills: {courseParts.requirements}</p>
                    </div>);
            default:
                return assertNever(courseParts);
        }
}

export default Part;