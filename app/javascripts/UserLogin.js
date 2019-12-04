class UserLogin {
    //Login Class  

    constructor(args) {

        // the display styles need to be moved to the menu controller
        //this will pass an argument that notifies main controller if the user is logged in
        document.querySelector("#main-menu-bar").style.display= "none";  // hide menu bar
        document.querySelector('#main').style.display = 'block'; // show login
        document.querySelector('#users-div').style.display = 'none'; // show users
        document.querySelector('#user-doodle-list').style.display = 'none'; // hide User Doodle Images Result
        document.querySelector(".item3").style.display = "none"; // draw image not showing

        this.formElement = document.querySelector("#login-form");
        this.formElement.addEventListener("submit", this.onFormSubmit);

        new UserList();
    }

    //this function fixes the piling event listeners from submit
    removeFormEventListener = () => {
        this.formElement.removeEventListener("submit", this.onFormSubmit);
    }

    //Function with fetch to create/post new user
    onFormSubmit = (event) => {
        event.preventDefault();
        console.log("onFormSubmit / FORM SUBMITTED")
            //document.getElementById("#login-form").reset();
        this.removeFormEventListener();
        let usernameValue = event.target.querySelector('input').value

        fetch('http://localhost:3000/doodleusers', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: usernameValue
                })
            })
            .then(response => response.json())
            .then(function(json) {
                console.log(json);
                console.log('%c Database has been Updated with New User', 'color:green')

                new UserImages(json.id);
                // capture this data attribute and have it evaluated by main controller
                document.querySelector(".menu-item2").setAttribute("data-isloggedin", "true");
            })
            .catch(e => {
                debugger
                console.log(e);
            });
    }
}