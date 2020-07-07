function calculateBMI() {
    console.log("in BMI");

    let weight = document.getElementById("inputWeight").value;
    let height = document.getElementById("inputHeight").value;

    console.log("Weight = " + weight);
    console.log("Height = " + height);

    if (weight == "" || height == "") {
        window.alert("Please enter weight and height");
    } else {
        console.log("Calculating BMI");
        let bmi = weight / (height * height);
        bmi = bmi.toFixed(1);
        console.log("BMI = " + bmi);

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

   //     $('#answer').append(myAns);
        document.getElementById("answer").innerHTML = myAns;

      //  document.getElementById("myForm").reset();
    }
}