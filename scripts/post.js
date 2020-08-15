// Posts exercise

function postExercise() {

    let name = document.getElementById("inputName").value;

    let category = document.getElementById("inputCategory").value;

    let muscle = document.getElementById("inputMuscle").value;

    let steps = document.getElementById("inputSteps").value;

    let repetition = document.getElementById("inputRepetition").value;

    let sets = document.getElementById("inputSets").value;

    let rest = document.getElementById("inputRest").value;

    let user = firebase.auth().currentUser.uid;

    let myUrl = "";

    //=========================== adds video ======================= 

    let selectedFile = document.getElementById("customFile").files[0];


    //================== form input validation =====================

    if (name=="" || category=="Select category" || muscle=="" || steps=="" || repetition=="" 
        || sets=="" || rest=="" || typeof(selectedFile)=="undefined") {

        window.alert("Please fill out complete form");
    }
    else {

        document.getElementById("post").innerHTML = `
        <span class="spinner-border spinner-border-sm"></span> Posting...`;

        document.getElementById("myProgress").innerHTML = " Posting your excercise... please wait";


    let fileName = selectedFile.name;

    document.getElementById("chooseFile").innerHTML = fileName;

    // Create a root reference
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child('exercises/' + fileName);

    fileRef.put(selectedFile).then(function(snapshot) {

        fileRef.getDownloadURL().then(function(url) {
            myUrl = url;
            console.log("video added successfully");
        })
        .then(function() {
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
                document.getElementById("myProgress").innerHTML = " Exercise successfully posted";
                window.alert("Exercise successfully posted");
                document.getElementById("post").innerHTML = "Post";
                window.location.reload();
            })
            .catch(function(error) {
                alert("Fail");
                console.log("Error: " + error);
            })   

        })
        .catch(function(error) {
            console.log(error);
        })   

    })
    .catch(function(error) {
        console.log("Error in laoding: " + error);
    })

    }
   
}


$('#customFile').on('change', function(event) {
    
    let selectedFile = document.getElementById("customFile").files[0];
    let fileName = selectedFile.name;
    document.getElementById("chooseFile").innerHTML = fileName;

})   

function resetFile() {
    document.getElementById("chooseFile").innerHTML = "Choose file";
}