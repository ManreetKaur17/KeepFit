// show individual exercise

var myDoc = decodeURIComponent(window.location.search); 

myDoc = myDoc.substring(12);

function showIndividualEx() {

    db.collection("exercises").doc(myDoc)
    .get()
    .then(function(doc) {
        let exDoc = doc.data();

        let myHtml =
        `
        <div id="heading">
            <h1 id="name">${exDoc.name}</h1>
        </div>
        <br>
        <video class="card-img-top h-100" controls>
            <source src="${exDoc.videoUrl}" type="video/mp4">
            <source src="${exDoc.videoUrl}" type="video/ogg">
            Your browser does not support the video tag.
        </video>
        <br><br>
        <h5>Target Muscle/Body Part :  <span id="white">${exDoc.targetMuscle}</span></h5>
        <h5>Steps :  <span id="white">${exDoc.steps}</span></h5>
        <h5>Repetition :  <span id="white">${exDoc.repetition}</span></h5>
        <h5>Sets :  <span id="white">${exDoc.sets}</span></h5>
        <h5>Rest Period :  <span id="white">${exDoc.rest}</span></h5><br>
        `;

        $('#myExercise').append(myHtml);

    })
    .catch(function(error) {
        console.log("Error getting document " + error);
    });

    
}