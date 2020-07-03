// show exercises

console.log("i m in exercise page");
var stru = decodeURIComponent(window.location.search); 
console.log("Struu:" + stru);

var category = stru.substring(10);
console.log(category);                         // right

categoryFinal = category.substring(0, 1).toUpperCase() + category.substring(1);
console.log(categoryFinal); 

$('#heading').append(`<h2>${categoryFinal} category</h2>`);

db.collection("exercises").where("category", "==", category)
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id);
        let myDoc = doc.data();
        console.log(myDoc);
        console.log("Name: " + `${myDoc.name}`);

        let myHtml = `
        <br>
        <a href="individualEx.html?individual=${doc.id}">
            <div class="card" style="max-width: 1000px;">
                <div class="row no-gutters">
                    <div class="col-sm-5" style="background: whitesmoke;">

                        <video class="card-img-top h-100" controls>
                            <source class="card-img-top h-100" src="${myDoc.videoUrl}" type="video/mp4">
                            <source class="card-img-top h-100" src="${myDoc.videoUrl}" type="video/ogg">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="col-sm-7">
                        <div class="card-body">
                            <h6>Name: ${myDoc.name}</h6>
                            <h6>Category: ${myDoc.category}</h6>
                            <h6>Target Muscle/Body Part: ${myDoc.targetMuscle}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        `;

        $('#exerciseList').append(myHtml);
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});