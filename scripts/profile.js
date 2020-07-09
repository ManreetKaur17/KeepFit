function showProfile() {

    firebase.auth().onAuthStateChanged(function(user) {

        db.collection("users").doc(user.uid)
        .get()
        .then(function(doc) {
            let myUser = doc.data();
            console.log(myUser.email);
            console.log(myUser.name);

            let age = 0;
            console.log(typeof(myUser.age) == "undefined");
            if(typeof(myUser.age) != "undefined") {
                age = myUser.age;
            }

            let height = 100;
            if(typeof(myUser.height) != "undefined") {
                height = myUser.height;
            }

            let weight = 50;
            if(typeof(myUser.weight) != "undefined") {
                weight = myUser.weight;
            }


            document.getElementById("name").innerHTML = myUser.name;            


            let data =
            `
             <form>
                <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputName" value="${myUser.name}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail" value="${myUser.email}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAge" class="col-sm-2 col-form-label">Age</label>
                    <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" id="inputAge" value=${age}>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputHeight" class="col-sm-2 col-form-label">Height (in cm)</label>
                    <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" id="inputHeight" value=${height}>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputWeight" class="col-sm-2 col-form-label">Weight (in kg)</label>
                    <div class="col-sm-10">
                        <input type="number" min="0" class="form-control" id="inputWeight" value=${weight}>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputGender" class="col-sm-2 col-form-label">Gender</label>
                    <div class="col-sm-10">
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" name="gender" id="male" checked>
                            <label class="custom-control-label" for="male">Male</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" name="gender" id="female">
                            <label class="custom-control-label" for="female">Female</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" name="gender" id="other">
                            <label class="custom-control-label" for="other">Other</label>
                        </div>
                    </div>
                </div>

            <!--    <div class="form-group row">
                    <label for="inputTrainer" class="col-sm-2 col-form-label">Wanna be a Personal Trainer</label>
                    <div class="col-sm-10">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="trainer">
                            <label class="custom-control-label" for="trainer">Turn on</label>
                        </div>
                    </div>
                </div>    -->

                <div class="form-group row">
                    <div class="col-sm-10 offset-sm-2">
                        <button type="button" id="update" class="btn btn-success">Update</button>
                    </div>
                </div>    

             </form>

             `;

            $('#profileData').append(data);

            if(typeof(myUser.gender) != "undefined") {
                console.log("gender is not undefined");
                if(myUser.gender == "male") {
                    document.getElementById('male').checked = true;
                } else if (myUser.gender == "female") {
                    document.getElementById('female').checked = true;
                } else {
                    document.getElementById('other').checked = true;
                }
                console.log("gender is not undefined 2222");
            }

            if(typeof(myUser.personalTrainer) != "undefined") {
                console.log("Trainer is not undefined");
                if(myUser.personalTrainer == "yes") {
                    document.getElementById('trainer').checked = true;
                }
            }

            document.getElementById('update').onclick = updateFun;

            function updateFun() {

                let myGender = "male";
            if(document.getElementById('female').checked == true) {
                myGender = "female";                        // add to database on clicking update button
            } else if (document.getElementById('other').checked == true) {
                myGender = "other";
            }

            let pTrainer = "no";
            if(document.getElementById('trainer').checked == true) {
                console.log("Trainer yes");
                pTrainer = "yes";
            }

                console.log("in updateFun");
                db.collection("users").doc(user.uid)
                .set({
                    name: document.getElementById('inputName').value,
                    email: document.getElementById('inputEmail').value,
                    age: document.getElementById('inputAge').value,
                    height: document.getElementById('inputHeight').value,
                    weight: document.getElementById('inputWeight').value,
                    gender: `${myGender}`,
                    personalTrainer: `${pTrainer}`
                })
                .then(function() {
                    console.log("Successfully updated");
                    window.alert("Successfully updated");
                })
                .catch(function(error) {
                    console.log("Error in updating data: " + error);
                });
            }

            


        })
        .catch(function(error) {
            console.log(`Error getting data: ${error}`);
        });
    });
}

