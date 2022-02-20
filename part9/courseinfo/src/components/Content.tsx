import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

interface CourseContent {
    courseParts: CoursePart[];
}

const Content = ({courseParts}: CourseContent) => {
    return (<div>
        {courseParts.map((courseParts, i) => <Part key={i} courseParts={courseParts} />)}
    </div>)
}

export default Content;