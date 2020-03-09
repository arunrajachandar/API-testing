let loginDB = [{
    id: 0,
    email: "arunrajachandar@gmail.com",
    password: "adsfr"
},
{
    id: 1,
    email:"Aniruth@gmail.com",
    password: "anirthya"

}]

let userDetails = [{
    id: 0,
    name: "Arun",
    email: "arunrajachandar@gmail.com",
    joined: new Date(),
    role: "Software Engineer"
},
{
    id: 1,
    name: "Anirtuh",
    joined: new Date(),
    email:"Aniruthya@gmail.com",
    role: "Software Engineer II"
}]

const getAllUsers = () =>{
    return userDetails;
}
const getUserById = userId =>{
    return userDetails.filter(e=> e.id === userId);
}
const getAllUsersLoginDet = () =>{
    return loginDB;
}

const userCreation = data => {
   return {
       id: data.id,
       name: data.name,
       email: data.email,
       joined: data.joined,
       role: data.role
   }
}

const loginCreation = data => {
    return {
        id: data.id,
        email:data.email,
        password: data.password
    }
 }
const sufficientData = (db, data)=>{
    return Object.keys(db[0]).every(e=> Object.keys(data).includes(e))
}
 
// console.log(getUserById());
const createUser = data =>{
    
    if(data){
        let maxIdforuser = 0;
        let creNewIDforUserDB = userDetails.forEach(e=>{
            if(e.id>maxIdforuser){
                maxIdforuser=e.id
            }
        })

        data.id = maxIdforuser+1;
        data.joined = new Date();
        if(sufficientData(loginDB,data)&& sufficientData(userDetails,data)){
        loginDB.push(loginCreation(data))
        userDetails.push(userCreation(data))
        return userDetails[userDetails.length-1]

        }else{
            return null;
        }
    
    }

     
    return null;
}


// console.log(createUser({name: 'Manisha',roles:'Analyst'}))

const deleteUser = userId =>{
    if(userId){
        const indexOfUser = loginDB.findIndex(user => user.id === userId);
        if(indexOfUser != -1){
            loginDB.splice(indexOfUser,1);
            return loginDB
        }
        return null;
    }
    return null;
}
// console.log(deleteUser(1));

const updateUser = data =>{
    if(data){
        const indexOfUser = loginDB.findIndex(user => user.id === data.id);
        if(indexOfUser != -1){
            for( let key in data){
                loginDB[indexOfUser][key]= data[key]
            }
             
            return loginDB
        }
        return null;
    }
    return null;
}
// console.log(updateUser({id: 2, name:'Manvi'}));
module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getAllUsers,
    getAllUsersLoginDet
};