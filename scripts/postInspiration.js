//===== Adds post to database =====

function postIns() {

    let caption = document.getElementById("inputCaption").value;

    let user = firebase.auth().currentUser.uid;

    let selectedFile = document.getElementById("customFile").files[0];

    if(typeof(selectedFile)=="undefined") {
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
                    document.getElementById("postBtn").innerHTML = "Post";
                    document.getElementById("myForm").reset();
                    document.getElementById("myImage").src = "../images/imageIcon.png";
                    window.alert("Successfully posted");
                })
                .catch(function(error) {
                    console.log("Error: " + error);
                })   
          
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
    $('#myImage').attr('src', URL.createObjectURL(event.target.files[0]));
});