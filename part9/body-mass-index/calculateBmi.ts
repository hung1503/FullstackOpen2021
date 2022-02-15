interface Result {
    bmi: number;
    status: string;
}

const calculatorBmi = (height: number, weight: number): Result => {
    const bmi = (weight / (height * height))*10000;
    let status = "";
    if(bmi < 18.5) {
        status = "Underweight (Too skinny)";
    } else if(bmi < 25 && bmi >= 18.5) {
        status = "Normal (Healthy weight)";
    } else if(bmi >= 25) {
        status = "Overweight (Need workout)";
    }
    return {
        bmi,
        status
    }
};

try {
    console.log(calculatorBmi(180, 74));
} catch(e) {
    console.log(e);
}


