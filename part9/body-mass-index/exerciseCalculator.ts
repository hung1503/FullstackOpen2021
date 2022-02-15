interface ExerciseCalculator {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;    
}
const calculateExercises = (day: number[], target: number) : ExerciseCalculator => {
    let trainingDays = 0;
    let total = 0;
    let average = 0;
    let rating = 0;
    let ratingDescription = "";
    let success = false;

    for( let i = 0; i < day.length; i++) {
        if(day[i] > 0) {
            trainingDays++;
        }
        total += day[i];
    }
    average = total / 7;

    if(average < 1) {
        rating = 1;
        ratingDescription = "Don't be lazy! Don't give up!";
    } else if(average < 1.5 && average >= 1) {
        rating = 2;
        ratingDescription = "You can do better!";
    } else if(average < 2 && average >= 1.5) {
        rating = 3;
        ratingDescription = "Not too bad but could be better";
    } else {
        rating = 4;
        ratingDescription = "You are doing great! Keep it up!";
    }

    return {
        periodLength: day.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    console.log(calculateExercises([3, 2, 0, 3, 2, 2, 0], 2));
} catch(e) {
    console.log(e)
}