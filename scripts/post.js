function postExercise() {
    console.log("in post");

    let name = document.getElementById("inputName").value;
    console.log(name);

    let category = document.getElementById("inputCategory").value;
    console.log(category);

    let muscle = document.getElementById("inputMuscle").value;
    console.log(muscle);

    let steps = document.getElementById("inputSteps").value;
    console.log(steps);

    let repetition = document.getElementById("inputRepetition").value;
    console.log(repetition);

    let sets = document.getElementById("inputSets").value;
    console.log(sets);

    let rest = document.getElementById("inputRest").value;
    console.log(rest);

    let user = firebase.auth().currentUser.uid;
    console.log(user);

    
    
    db.collection("exercises").add({
        name: name,
        category: category,
        targetMuscle: muscle,
        steps: steps,
        repetition: repetition,
        sets: sets,
        rest: rest,
        videoUrl: myUrl,
        user: user
    })
    .then(function(docRef) {
        alert("success");
        console.log("Success: " + docRef);
    })
    .catch(function(error) {
        alert("Fail");
        console.log("Error: " + error);
    })   // add another then statement to forward to exercise page
}

var myUrl = "";

$('#customFile').on('change', function(event) {
    console.log("in change file");

    let selectedFile = event.target.files[0];

    let fileName = selectedFile.name;
    // Create a root reference
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child('exercises/' + fileName);

    fileRef.put(selectedFile).then(function(snapshot) {
        console.log("File being uploaded");
        console.log("Uloaded file");

        fileRef.getDownloadURL().then(function(url) {
            console.log("Video url" + url);
            myUrl = url;
        })
        .catch(function(error) {
            console.log(error);
        })   

    })
    .catch(function(error) {
        console.log("Error in laoding: " + error);
    })

  /*  fileRef.getDownloadURL().then(function(url) {
        console.log("Video url" + url);
        myUrl = url;
    })
    .catch(function(error) {
        console.log(error);
    })    */
})