const model = {};
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyACC__xCvITZ0yVgkMghFzM4yihdgtYVg4",
    authDomain: "appbanhang-4d425.firebaseapp.com",
    databaseURL: "https://appbanhang-4d425-default-rtdb.firebaseio.com",
    projectId: "appbanhang-4d425",
    storageBucket: "appbanhang-4d425.appspot.com",
    messagingSenderId: "997603000545",
    appId: "1:997603000545:web:bb0bac87f34ad07bad77a0"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

model.register = async (data) => {

    try {
        await auth.createUserWithEmailAndPassword(data.email, data.password);
        view.setScreenAtive('login');
        await auth.currentUser.sendEmailVerification();
        db.collection('user').doc(auth.currentUser.uid).set(
            data
        )
    } catch (error) {
        alert(error.message)
    }
};


model.login = async (data) => {
    try {
        let infoDb = await db.collection("user").get()
        let username;
        infoDb.docs.filter((doc) => {
            if ((doc.data().email == data.email)) {
                username = doc.data().name
            }
        });
        let response = await auth.signInWithEmailAndPassword(data.email, data.password);
        await auth.currentUser.updateProfile({
            displayName: username,
        })
        if (response && auth.currentUser.emailVerified) {
            view.dataUser(auth.currentUser.displayName)
            view.setScreenAtive('home')

        };
    } catch (error) {
        alert(error.message)
    }
};

model.chatapp = async (data) => {
    try {
        let response =  await db.collection('chatapp').doc('chatbox').get()
        if(response.exists==false){
            db.collection('chatapp').doc('chatbox').set({
                message:[{
                name: auth.currentUser.email,
                message: data.message,
                "time": new Date().toLocaleString()
                }]
        })
        }else{
            
         await db.collection('chatapp').doc('chatbox').update({
            message: firebase.firestore.FieldValue.arrayUnion({
                name: auth.currentUser.email,
                message: data.message,
                "time": new Date().toLocaleString()
            })
        })
        }
    } catch (error) {
        console.log(error.message);
    }
}
model.chatapp()

model.getMessageValue = async (data) => {
    try {
        let response = await  db.collection("chatapp").doc("chatbox").get()
        let result = response.data().message
             for(i in result) {
                if (auth.currentUser.email==result[i].name) {
                    view.addUserMessage(result[i].message)
                }else {
            if (i==result.length-1) {
                break
            } else{
                view.addBotMessage(result[i].message)
            }        
        }
    }
    await db.collection("chatapp")
    .onSnapshot((value)=>{
        let message = value.docs.map((doc)=>({...doc.data()}))
        let messageValue = message[0].message
        let lastMessage = messageValue[messageValue.length-1]
        if(auth.currentUser.email!=lastMessage.name){
            view.addBotMessage(lastMessage.message)
        }
    });         
    } catch (error) {
        console.log(error.message);
    }
}
// model day du lieu cua card
model.pushValueCard = async (data)=>{
try {
    let response =  await db.collection('shopping').doc(auth.currentUser.email).get()
        if(response.exists==false || response.data().product.length ==0){
           await db.collection('shopping').doc(auth.currentUser.email).set({
                    product:[{
                    name: data.name,
                    price: data.price,
                    total:1,
                    sum:data.price
                }]
            })
        } else {
            let value = response.data().product;
            for (let x in value){
                if(value[x].name==data.name){
                    value[x].total+=1
                    var priceTotal = Number(value[x].total)*Number(data.price.replace('$',''))
                    value[x].sum = '$' + priceTotal.toString()
                 await   db.collection('shopping').doc(auth.currentUser.email).update({
                        product:value
                    })
                    break;
                }else {
                  await  db.collection('shopping').doc(auth.currentUser.email).update({
                        product:firebase.firestore.FieldValue.arrayUnion({
                            name: data.name,
                            price: data.price,
                            total:1,
                            sum:data.price
                        })                 
                })
                }
            }
        }
        // alert('thanh cong r')
    }catch (error) {
        console.log(error.message);
    }
};
model.pushValueCard()

// update   du lieu  so luong shopping
model.quantity = async(data)=>{
    try{
        await db.collection('shopping').get()
        let response = await db.collection('shopping').doc(auth.currentUser.email).get()
        var result=  response.data().product;
        for(let i =0; i<result.length; i++){
            if(result[i].name==data.name){
                result[i].total =Number(data.total)
                result[i].sum = '$' + (Number(data.total) *Number(result[i].price.replace("$",''))).toString()
                await   db.collection('shopping').doc(auth.currentUser.email).update({
                    product:result
                })
            }
        } 
         
    }catch (error){

    }   
} 
model.quantity()

model.getShoppingValue =async (data)=>{
    try {
        await db.collection('shopping').get()
        let response = await db.collection('shopping').doc(auth.currentUser.email).get()
        var result=  response.data().product;
        view.showCard(result)
        // controller.totalPrice(result)
        await db.collection("shopping").doc(auth.currentUser.email)
        .onSnapshot(doc => {
            let result = doc.data().product;
            
            // view.showCard(result);
            controller.totalPrice(result)
        });
        
    } catch (error) {
        alert('wrong')
    }   
}
// lay du lieu theo thoi gian thuc
model.realTimeCard = async (data)=>{
    try {
        await db.collection('shopping').get()
        await db.collection("shopping").doc(auth.currentUser.email)
            .onSnapshot(doc => {
                controller.totalPrice(doc.data().product)
                var suorce = doc.metadata.hasPendingWrite ? "Local" : "Server"
                includeMetadataChanges: 'true'
                let result = [...doc.data().product]
                for (let i =0 ;i<result.length;i++){
                    if (result[i].name== data.name){ 
                        view.changValuePrice(i,result[i].sum)
                    }
                }
            })
    } catch (error) {
        
    }
}
// model delet card
model.deleteCard = async (data)=>{
    try {
        await db.collection('shopping').get()
        await db.collection("shopping").doc(auth.currentUser.email)
        .onSnapshot(doc => {
            let result = doc.data().product;
            includeMetadataChanges: 'true'
            for (let i =0 ;i<result.length;i++){
                if (result[i].name== data.name){ 
                    result.splice(i,1);
                    // view.removeCart(i);
                }
            }
        });
        // update lai database
        let response = await db.collection('shopping').doc(auth.currentUser.email).get()
        var result=  response.data().product;
        for(let i =0; i<result.length; i++){
            if(result[i].name==data.name){
                result.splice(i,1);
                await   db.collection('shopping').doc(auth.currentUser.email).update({
                    product:result,
                })
            
                }
            } 
            controller.totalPrice(result)
        } catch (error) {
        console.log(error.message);
    }
}



// model reset lai mat khau
model.resetEmail = (data)=>{
    firebase.auth().sendPasswordResetEmail(data)
            .then(() => {
              alert('please check your Email')
              view.setScreenAtive('login')
            })
            .catch((error) => {
              alert("email is not avaible!!")
            });
}
// update lai showcard 
// model.updateShoppingRemove = async (data)=>{
//     let response = await db.collection('shopping').doc(auth.currentUser.email).get()
//         var result=  response.data().product;
//         for(let i =0; i<result.length; i++){
//             if(result[i].name==data.name){
//                 result.splice(i,1);
//                 await   db.collection('shopping').doc(auth.currentUser.email).update({
//                     product:result,
//                 })
//             }
//             view.removeCart(i);
//         } 
//         // view.showCard(result)
//         controller.totalPrice(result)
// }

// const solution = function(nums,target) {
//     for (let x=0 ;x < nums.length;x++){
//         if (nums[x] ==target) {
//             let output = x
//              console.log(output);
//         }else {
//             nums[x+1]=target
//             nums.sort((a,b)=>{ return a-b})
//             for (let j in nums){
//                 if (nums[j]==target)
//                 console.log(j);
//             }
                
//         }
//     }
// }
// let arr = [1,3,4,6,7]
// let target = 5
// solution(arr,target)
