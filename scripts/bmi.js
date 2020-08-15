//==== Calculates and displays BMI 

function calculateBMI() {

    let weight = document.getElementById("inputWeight").value;
    let height = document.getElementById("inputHeight").value;

    if (weight == "" || height == "") {
        window.alert("Please enter weight and height");
    } else {
        let bmi = weight / (height * height);
        bmi = bmi.toFixed(1);

        let range;

        if (bmi < 18.5) {
            range = "Underweight";
        } else if (bmi <= 24.9) {
            range = "Normal";
        } else if (bmi <= 29.9) {
            range = "Overweight";
        } else {
            range = "Obese";
        }

        let myAns = `
            <h5>Your Body Mass Index (BMI) is <b>${bmi}</b>.</h5>
            <h5>This is considered <b>${range}</b>.</h5>
        `;

        document.getElementById("answer").innerHTML = myAns;

    }
}