// show individual exercise

console.log("i m in individual exercise page");
var myDoc = decodeURIComponent(window.location.search); 
console.log(myDoc);

myDoc = myDoc.substring(12);
console.log("Individual document id: " + myDoc);                         // right



function showIndividualEx() {

    db.collection("exercises").doc(myDoc)
    .get()
    .then(function(doc) {
        let exDoc = doc.data();
        console.log(exDoc);

        let myHtml =
        `
        <h4>Name: ${exDoc.name}</h4>
        <video class="card-img-top h-100" controls>
            <source src="${exDoc.videoUrl}" type="video/mp4">
            <source src="${exDoc.videoUrl}" type="video/ogg">
            Your browser does not support the video tag.
        </video>
        <h6>Target Muscle/Body Part: ${exDoc.targetMuscle}</h6>
        <h6>Steps: ${exDoc.steps}</h6>
        <h6>Repetition: ${exDoc.repetition}</h6>
        <h6>Sets: ${exDoc.sets}</h6>
        <h6>Rest Period: ${exDoc.rest}</h6>
        `;

        $('#myExercise').append(myHtml);

    })
    .catch(function(error) {
        console.log("Error getting document " + error);
    });

    
}