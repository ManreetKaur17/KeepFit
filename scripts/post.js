function postExercise() {
    console.log("in post");
    console.log("Posting your exercise");


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

    let myUrl = "";

    

    //=========================== adds video ======================= 

    let selectedFile = document.getElementById("customFile").files[0];


//================== form input validation ==========================
    if (name=="" || category=="Select category" || muscle=="" || steps=="" || repetition=="" 
        || sets=="" || rest=="" || typeof(selectedFile)=="undefined") {
        console.log("Please fill out complete form");
        window.alert("Please fill out complete form");
    }
    else {

        document.getElementById("post").innerHTML = `
        <span class="spinner-border spinner-border-sm"></span> Posting...`;

        console.log("Posting your excercise... please wait");
    document.getElementById("myProgress").innerHTML = " Posting your excercise... please wait";


    let fileName = selectedFile.name;
  //  console.log("Filename: " + fileName);
    document.getElementById("chooseFile").innerHTML = fileName;

    // Create a root reference
    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child('exercises/' + fileName);

    fileRef.put(selectedFile).then(function(snapshot) {
        console.log("Video being uploaded");

        fileRef.getDownloadURL().then(function(url) {
            console.log("Video url" + url);
            myUrl = url;
            console.log("video added successfully");
    //        document.getElementById("myProgress").innerHTML = "Video successfully added";
     //       console.log("TEEEESSSSSSTTTTTTTTT-- I SHOULD COME AFTER video successfully added");
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
                console.log("Success in adding document " + docRef);
                document.getElementById("post").innerHTML = "Post";
             //   document.getElementById("myForm").reset();
                window.location.reload();
            })
            .catch(function(error) {
                alert("Fail");
                console.log("Error: " + error);
            })   
            // TODO: decide where to redirect or not redirect
            // add another then statement to forward to exercise page

        /*    .then(function() {
                window.location.href = "exercise.html?category=" + `${category}`;
            })    */
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


  /*  fileRef.getDownloadURL().then(function(url) {
        console.log("Video url" + url);
        myUrl = url;
    })
    .catch(function(error) {
        console.log(error);
    })  */  
})   


function resetFile() {
    document.getElementById("chooseFile").innerHTML = "Choose file";
}