// show exercises


var stru = decodeURIComponent(window.location.search); 

var category = stru.substring(10);

categoryFinal = category.substring(0, 1).toUpperCase() + category.substring(1);

$('#categoryDiv').append(`<h2>${categoryFinal} category</h2>`);

db.collection("exercises").where("category", "==", category)
.get()
.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        
        let myDoc = doc.data();

        let myHtml = `
        <a href="individualEx.html?individual=${doc.id}">
            <div class="card" id="oneEx">
                <div class="row no-gutters">
                    <div class="col-sm-5">

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
        <br>
        `;

        $('#exerciseList').append(myHtml);
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});