function showPosts() {

    db.collection("inspiration")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
       
            let myDoc = doc.data();
            console.log(myDoc);
            console.log("Caption: " + `${myDoc.caption}`);

            db.collection("users").doc("23J28qSTVUXerN8iAigpTBQgtu83")
            .get()
            .then(function(doc) {
                let myUser = doc.data();
                userName = myUser.name;

                let myHtml = `
                <div>
                    <h5>${userName}</h5>
                    <img width="90%" height="90%" src="${myDoc.videoUrl}"> 
                    <h5>${myDoc.caption}</h5>
                
                </div>
                `;

                $('#myDiv').append(myHtml);

            })
            .catch(function(error) {
                console.log("Error in getting user doc" + error);
            });
            
        });
    })
    .catch(function(error) {
        console.log("Errro getting documents: " + error);
    });

}