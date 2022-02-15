interface Result {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): Result => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        }
      } else {
        throw new Error('Provided values were not numbers!');
      }
}

const calculatorBmi = (height: number, weight: number) => {
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
    const { height, weight } = parseArguments(process.argv);
    console.log(calculatorBmi(height, weight));
} catch(e) {
    console.log(e);
}


