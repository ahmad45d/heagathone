var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Function For Displaying Toasts 
function showToast(message,bg) {
    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,

        gravity: "top", // top or bottom
        position: "left", // left, center or right
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bg,
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            fontWeight: "400",
            letterSpacing: "2px"
},
onClick: function () { } 
    }).showToast();
}

// User Login And Registration

let users =  [] // Getting User Data From Local Storage
let loggedInUser;

const toggleName=()=>{
    document.querySelector('.show-email').innerHTML=loggedInUser.email
}

const generateRandomId=()=> Math.random().toString(36).slice(2)

function handleUserRegistration() {
    let registrationEmail = document.getElementById('register-email').value
    if(!re.test(registrationEmail)){
        showToast('Invalid Email',"red")
        return
    }
    let registrationPassword = document.getElementById('register-password').value
        if(registrationPassword.length<6){
            showToast("Password Should Be Greater Than 6 Digits","red")
            return 
        }

    if (registrationEmail === "" || registrationPassword == "") {
        showToast('Please Enter All Credentials',"red")
        return
    }

    let userToLogin = users.find( element =>  {
        if(element.email===registrationEmail){
            showToast("User Already Registered","red")
            return
        }
    }  )

    
    let newUser = {
        email: registrationEmail,
        password: registrationPassword,
        uid: generateRandomId(),
        status:"active",
        createdAt: new Date()
    }

    users.push(newUser)  
    showToast('Registration Successful',"green")
    document.getElementById('REGISTRATION-FORM').style.display = "none"
    document.getElementById('LOGIN-FORM').style.display = "block"
    
    
}

function handleUserLogin() {

    let loginEmail = document.getElementById('login-email').value
    let loginPassword = document.getElementById('login-password').value

    if (loginEmail === "" || loginPassword == "") {
        showToast('Please Enter All Credentials',"red")
        return
    }

    let userToLogin = users.find( element =>  element.email===loginEmail  )

    if(userToLogin==undefined){
        showToast("Invalid Email or Password","red")
    } 
    else if(userToLogin.password==loginPassword){
        loggedInUser=userToLogin;
        // document.getElementById('Login-Registration-Container').style.display="none"
        document.querySelector('.hide-page').style.display="none"
        document.querySelector('body').style.backgroundColor="white"
        toggleName();
        document.getElementById('navbar').style.display="block"
        document.querySelector('.todo-management').style.display="block"
    } 
    else{
        showToast("Incorrect Password","red")
    }

}

// Functions For Handling Todos

let todos=[]

const handleCreateTodo=()=>{
    event.preventDefault();

    let title=document.getElementById("title").value
    let description=document.getElementById("description").value
    let date=document.getElementById("date").value


    

    if (title === "" || description == "" || date== "") {
        showToast('Please Enter All Credentials',"red")
        return
    }
    
    let todo={
        title: title,
        description: description,
        date: date,
        id: generateRandomId(),
        status: "Not Completed",
        createdAt: new Date() ,
        // userId: loggedInUser.uid,
        
    }

    todos.push(todo)
    handlePrintTodo();


    document.getElementById("title").value=""
    document.getElementById("description").value=""
    document.getElementById("date").value=""
    
    showToast("Todo Added Successfully","green")
}

const handleUpdateTodo=()=>{
    let index=+prompt("Enter Index To Update")

    todos=todos.map((element,i)=>{
        if(i===index-1){
            return {...element,status: "Completed"}
        }
        return element
    })
    handlePrintTodo();
}

const handleDeleteTodo=()=>{
    let index=+prompt("Enter Index To Update")

    todos=todos.filter((element,i) => i !== index-1)
    handlePrintTodo();
}

const handlePrintTodo=()=>{
    let srNo=1;


    document.getElementById("show-output").innerHTML=""
    todos.forEach (element => {
        
        document.getElementById("show-output").innerHTML+=<tr><td>${srNo++}</td> <td>${element.title}</td> <td>${element.description}</td> <td>${element.date}</td> <td>${element.status}</td> </tr>})
}

function clearOutput(){
    document.getElementById("show-output").innerHTML=""
}