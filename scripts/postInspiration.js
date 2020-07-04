function postIns() {
    console.log("Post clicked");

    let caption = document.getElementById("inputCaption").value;
    console.log(caption);

    let user = firebase.auth().currentUser.uid;
    console.log(user);

    let selectedFile = document.getElementById("customFile").files[0];

    if(typeof(selectedFile)=="undefined") {
        console.log("Please select picture");
        window.alert("Please select picture");
    } else {
        document.getElementById("postBtn").innerHTML = `
        <span class="spinner-border spinner-border-sm"></span> Posting...`;

        let fileName = selectedFile.name;

        let storageRef = firebase.storage().ref();
        let fileRef = storageRef.child('inspiration/' + fileName);

        let myUrl = "";

        fileRef.put(selectedFile).then(function(snapshot) {
    
            fileRef.getDownloadURL().then(function(url) {
                console.log("Image url" + url);
                myUrl = url;
                document.getElementById("myImage").src = url;
                console.log("image added successfully");
            })
            .then(function() {
                db.collection("inspiration").add({
                    videoUrl: myUrl,
                    caption: caption,
                    user: user
                })
                .then(function(docRef) {
                    console.log("Success in adding document " + docRef);
                    document.getElementById("postBtn").innerHTML = "Post";
                    document.getElementById("myForm").reset();
                    document.getElementById("myImage").src = "../images/imageIcon.png";
                    window.alert("Successfully posted");
                })
                .catch(function(error) {
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
            console.log("Error in posting: " + error);
        })

    }
}

$('#customFile').on('change', function () {
    console.log(URL.createObjectURL(event.target.files[0]));
    $('#myImage').attr('src', URL.createObjectURL(event.target.files[0]));
});