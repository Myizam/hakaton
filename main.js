
// data start
let users = [
    {
      name: "Myizam", //имя пользователя
      password: "0505", //пароль от аккаунта
      age: "21", //возраст пользователя
      isLogin: false, //авторизован/неавторизован
      getMessages: [], //полученные сообщения(которые будут отправлять пользователю)
      sendMessages: [], //отправленные сообщения(которые будет отправлять сам
    },
  ];
  // data end
  
  //users script start
  // create logic
  
  function checkUniqueUserName(userName) {
    return users.some((item) => item.name === userName);
  }
  function checkPassword(pass, passConfirm) {
    return pass === passConfirm;
  }
  function createUser() {
    let userName = prompt("Enter UserName");
    if (checkUniqueUserName(userName)) {
      alert("User already exists!");
      return;
    }
    let pass = prompt("Enter password");
    let passConfirm = prompt("Enter password confirmation");
    if (!checkPassword(pass, passConfirm)) {
      alert("Passwords don`t match");
      return;
    }
    let age = +prompt("Enter age");
    let userObj = {
      name: userName,
      password: pass,
      age: age,
      isLogin: false,
      getMessages: [],
      sendMessages: [],
    };
    users.push(userObj);
    alert("Create Seccessfully");
    console.log(users);
  }
  
  let inSystem = "";
  function changeInSystemUser(userName = "") {
    inSystem = userName;
    let h3 = document.querySelector("h3");
    inSystem
      ? (h3.innerText = `user: ${inSystem} in system`)
      : (h3.innerText = "No users in system");
  }
  
  //login logic
  
  function getUserObj(userName) {
    return users.find((item) => item.name === userName);
  }
  function checkUserPassword(userName, pass) {
    let user = getUserObj(userName);
    return user.password === pass;
  }
  
  function loginUser() {
    let userName = prompt("Enter user name");
    if (!checkUniqueUserName(userName)) {
      alert("User not found");
      return;
    }
    let pass = prompt("Enter password");
    if (!checkUserPassword(userName, pass)) {
      alert("Password doesn`t match this acount");
      return;
    }
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
  }
  
  function logoutUser() {
    let user = getUserObj(inSystem);
    user.isLogin = false;
    changeInSystemUser("");
  }
  //message logic
  function createMessage() {
    if (!inSystem) {
      alert("Only aurorized users can send message");
      return;
    }
    let from = prompt("Enter recipient");
    let message = prompt("Enter message");
    searchUser(from);
    function searchUser(from) {
      for (i of users) {
        if (i.name == from) {
          i.getMessages.push(message);
          alert("Successfuly created");
        }
      }
    }
    for (i of users) {
      if (inSystem == i.name) {
        i.sendMessages.push(message);
      }
    }
    console.log(users);
  }
  
  // delete logic
  function deleteUser() {
    if (!inSystem) {
      alert("Only aurorized users can send message");
      return;
    }
    let conf = confirm("Are you sure?");
    if (conf) {
      users = users.filter((accounts) => accounts.name != inSystem);
      changeInSystemUser("");
      console.log(users);
    }

// update logic
  }
  function update() {
    if (!inSystem) {
        alert('You are not authorized')
        return
    }
    let user = getUserObj(inSystem);
    let choice = prompt(' What do you want to change - name, password or age?');
    if (choice.toLowerCase() == 'name') {
        let newUsername = prompt('Enter a new name');
        if (checkUniqUsername(newUsername)) {
            alert('Name a busy')
            return
        }
        user.name = newUsername;
        changeInSystemUser(newUsername)
        alert('Name changed')
        console.log(users)
        return
    }
    if (choice.toLowerCase() == 'password') {
        let oldPassword = prompt('Enter a old password')
        if (!checkPassword(inSystem, oldPassword)) {
            alert('Wrong old password')
            return
        }
        let newPassword = prompt('Enter a new password');
        user.password = newPassword;
        alert('Password changed')
        console.log(users)
        return
    }
    if (choice.toLowerCase() == 'age') {
        let newAge = prompt('');
        user.age = newAge;
        alert('Age changed')
        console.log(users)
        return
    }
}

function checkIdMs(id){
    return (users.some(item => item.sentMessage.some(item1 => item1.id === id)) || users.some(item => item.getMessage.some(item1 => item1.id === id)));
}  

 
function checkUserIdMs(userName,id){
        let user = getUserObj(userName);
        return (user.sentMessage.some(item =>item.id === id) || user.getMessage.some(item =>item.id === id));
}  

function getMessageObj(userName,id){
    let obj = getUserObj(userName);
    return (obj.sentMessage.find(item =>item.id === id) || obj.getMessage.find(item =>item.id === id));
}

function messageFindSent(obj1,obj2){
    return obj1.sentMessage.some(item => item === obj2);
}
function messageFindGet(obj1,obj2){
    return obj1.getMessage.some(item => item === obj2);
}


function deleteMessage(){
    if (!inSystem){
        alert('Пользователь не авторизован');
        return;
    }
    let idMessage = +prompt("Введите Id сообщения, который  хотите удалить");
    if(!checkIdMs(idMessage)){
        alert('Сообщение с таким Id не существует');
        return;
    }
    if(!checkUserIdMs(inSystem,idMessage)){
        alert("Не принадлежит сообщение");
        return;
    }
    let  userObj = getUserObj(inSystem);
    let messageObj = getMessageObj(inSystem,idMessage);
    console.log(messageObj);

    if(messageFindSent(userObj,messageObj)){
     userObj.sentMessage.splice(userObj.sentMessage.indexOf(messageObj),1);
     alert("Успешно удалено!");
    }
    else if(messageFindGet(userObj,messageObj)) {
        userObj.getMessage.splice(userObj.getMessage.indexOf(messageObj),1);
        alert("Успешно удалено!");
    }
 
    console.log(users)
}