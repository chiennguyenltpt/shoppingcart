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
const database = firebase.database();
const storage = firebase.storage();

model.register = async (data) => {

    try {
        await auth.createUserWithEmailAndPassword(data.email, data.password);
        auth.currentUser.sendEmailVerification();
        ShowSuccessToast('Success')
        await db.collection('user').doc(auth.currentUser.uid).set(
            data
        )
        view.setScreenAtive('login')
    } catch (error) {
        ShowErrorToast(error.message)
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
        console.log(auth.currentUser.emailVerified);
        if (auth.currentUser.emailVerified == true && response) {
            ShowSuccessToast("Login Success")
            view.admin()
            view.dataUser(auth.currentUser.displayName)
            view.setScreenAtive('home')

        };

        await auth.currentUser.updateProfile({
            displayName: username,
        })
        return;
    } catch (error) {
        alert(error.message)
    }
};







model.chatapp = async (data) => {
    try {
        let response = await db.collection('chatapp').doc(auth.currentUser.uid).get()
        if (response.exists == false) {
            db.collection('chatapp').doc(auth.currentUser.uid).set({
                message: [{
                    name: auth.currentUser.email,
                    message: data.message,
                    "time": new Date().toLocaleString()
                }]
            })
        } else {
            await db.collection('chatapp').doc(auth.currentUser.uid).update({
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

model.getMessageValue = async () => {
    try {
        let response = await db.collection("chatapp").doc(auth.currentUser.uid).get()
        let result = response.data().message
        for (i in result) {
            let userInfo = await db.collection('user').get()
            if (result[i].name == auth.currentUser.email ){
                view.addUserMessage(result[i].message)
            }else {
                    for( let j in userInfo.docs){                
                    if(result[i].name==userInfo.docs[j].data().email){
                        var url = userInfo.docs[j].data().link
                    }
                }
                view.addBotMessage(result[i].message,url)
            }
            
        }
        
    } catch (error) {
        console.log(error.message);
    }
};

// bat snapshot tin nhn cuoi
model.snapShotLastMsgUser = async()=>{
    try {
       
        var userInfo = await db.collection('user').get()
        await db.collection("chatapp").doc(auth.currentUser.uid).onSnapshot((data=>{
            data =data.data().message
            let lastMessage = data[data.length-1]
            console.log(lastMessage)
            let   valueUser;
            if(lastMessage.name != auth.currentUser.email){
                valueUser = userInfo.docs.filter((item)=>{
                  return  lastMessage.name == item.data().email
                })
                
            }   
            view.addBotMessage(lastMessage.message,valueUser[0].data().link)    
        }))

    } catch (error) {
        
    }
};
// hien am thanh tren thong bao nguoi dung
model.notifyMessageAudio = async()=>{
    let audio = new Audio('../audio/Nhac-chuong-tin-nhan-1-tieng-www_tiengdong_com.mp3')
    await db.collection('chatapp').doc(auth.currentUser.uid).onSnapshot(data=>{
        data = data.data().message;
        console.log(data);
        let lastMessage = data[data.length-1];
        if(lastMessage!=data[data.length] && lastMessage.name != auth.currentUser.email){
            audio.play()
        }
    })
}

// ham ben trong chat app admin
model.getUserInChatApp = async () => {
    let responseUserChatApp = await db.collection('chatapp').get()
    for (let i in responseUserChatApp.docs) {
        let userInfo = await db.collection('user').get()
        for (let j in userInfo.docs) {
            if (userInfo.docs[j].id == responseUserChatApp.docs[i].id) {
                let listUserHtml = view.UserOfAdminPage(userInfo.docs[j].data().link, userInfo.docs[j].data().name, responseUserChatApp.docs[i].id)
                view.renderUserChatAdmin(listUserHtml)

            }
        }
        await db.collection('chatapp').doc(responseUserChatApp.docs[i].id).onSnapshot(value => {
            value = value.data().message;
            let lastMessage = value[value.length - 1]
            if (lastMessage.name != "manhchienltpt@gmail.com") {
                view.renderMessageUser("you", lastMessage.name, lastMessage.time, lastMessage.message)
                chat.scrollTop = chat.scrollHeight
            }

        })
    }
    let listUserRender = document.getElementsByClassName('list-user');
    let link = document.querySelectorAll(".list-user img");
    let nameUserClick = document.querySelectorAll('.list-user h2')
    for (let i = 0; i < listUserRender.length; i++) {
        listUserRender[i].addEventListener('click', async () => {
            let id = listUserRender[i].getAttribute('id')
            view.headerAdminPage(link[i].src, nameUserClick[i].innerHTML, id)
            chat.innerHTML = ''
            model.adminChat(id)
        })
    }

}

// lay du lieu tren firebase chat de render ra admin chat
model.adminChat = async (id) => {
    let responseData = await db.collection('chatapp').doc(id).get()
    let result = responseData.data().message

    for (let i = 0; i < result.length; i++) {
        if (result[i].name == "manhchienltpt@gmail.com") {
            view.renderMessageAdmin('me', 'Admin', result[i].time, result[i].message)
        } else {
            view.renderMessageUser("you", result[i].name, result[i].time, result[i].message)
        }
    }
}
// day du lieu chat trong page admin
model.pushMessageAdmin = async (id, message) => {
    console.log(id, message);
    try {
        await db.collection('chatapp').doc(id).update({
            message: firebase.firestore.FieldValue.arrayUnion({
                name: 'manhchienltpt@gmail.com',
                message: message,
                "time": new Date().toLocaleString()
            })
        })
    } catch (error) {

    }
}




















// model day du lieu cua card
model.pushValueCard = async (data) => {

    try {
        let response = await db.collection('shopping').doc(auth.currentUser.email).get()
        if (response.exists == false || response.data().product.length == 0) {
            await db.collection('shopping').doc(auth.currentUser.email).set({
                product: [{
                    name: data.name,
                    price: data.price,
                    total: 1,
                    sum: data.price
                }]
            })


        } else {
            let value = response.data().product;
            for (let x in value) {
                if (value[x].name == data.name) {
                    value[x].total += 1
                    var priceTotal = Number(value[x].total) * Number(data.price.replace('$', ''))
                    value[x].sum = '$' + priceTotal.toString()
                    await db.collection('shopping').doc(auth.currentUser.email).update({
                        product: value
                    })
                    // ShowSuccessToast('add cart success')
                    break
                } else {
                    await db.collection('shopping').doc(auth.currentUser.email).update({
                        product: firebase.firestore.FieldValue.arrayUnion({
                            name: data.name,
                            price: data.price,
                            total: 1,
                            sum: data.price
                        })
                    })
                }
            }
        }
        ShowSuccessToast('add cart success')
    } catch (error) {
        //  ShowErrorToast('add cart not success')
    }
};
model.pushValueCard()

// update   du lieu  so luong shopping
model.quantity = async (data) => {
    try {
        await db.collection('shopping').get()
        let response = await db.collection('shopping').doc(auth.currentUser.email).get()
        var result = response.data().product;
        for (let i = 0; i < result.length; i++) {
            if (result[i].name == data.name) {
                result[i].total = Number(data.total)
                result[i].sum = '$' + (Number(data.total) * Number(result[i].price.replace("$", ''))).toString()
                await db.collection('shopping').doc(auth.currentUser.email).update({
                    product: result
                })
            }
        }

    } catch (error) {

    }
}
model.quantity()

model.getShoppingValue = async (data) => {
    try {
        await db.collection('shopping').get()
        let response = await db.collection('shopping').doc(auth.currentUser.email).get()
        var result = response.data().product;
        // view.showCard(result)
        // controller.totalPrice(result)
        await db.collection("shopping").doc(auth.currentUser.email)
            .onSnapshot(doc => {
                let result = doc.data().product;

                view.showCard(result);
                controller.totalPrice(result)
            });

    } catch (error) {
        alert('wrong')
    }
}
// lay du lieu theo thoi gian thuc
model.realTimeCard = async (data) => {
    try {
        await db.collection('shopping').get()
        await db.collection("shopping").doc(auth.currentUser.email)
            .onSnapshot(doc => {
                controller.totalPrice(doc.data().product)
                var suorce = doc.metadata.hasPendingWrite ? "Local" : "Server"
                includeMetadataChanges: 'true'
                let result = [...doc.data().product]
                for (let i = 0; i < result.length; i++) {
                    if (result[i].name == data.name) {
                        view.changValuePrice(i, result[i].sum)
                    }
                }
            })
    } catch (error) {

    }
}
// model delet card
model.deleteCard = async (data) => {
    try {
        await db.collection('shopping').get()
        await db.collection("shopping").doc(auth.currentUser.email)
            .onSnapshot(doc => {
                let result = doc.data().product;
                includeMetadataChanges: 'true'
                for (let i = 0; i < result.length; i++) {
                    if (result[i].name == data.name) {
                        result.splice(i, 1);
                        db.collection('shopping').doc(auth.currentUser.email).update({
                            product: result,
                        })
                        controller.totalPrice(result)
                    }
                }
            });
        ShowSuccessToast("remove success");
    } catch (error) {
        ShowErrorToast(error.message)
    }
}

// get realtime total 
model.realTimeTotal = async (data) => {
    try {
        await db.collection('shopping').get()
        await db.collection("shopping").doc(auth.currentUser.email)
            .onSnapshot(doc => {
                let result = doc.data().product
                controller.quantity(result)
            })
    } catch (error) {

    }
}
model.realTimeTotal()

// model reset lai mat khau
model.resetEmail = (data) => {
    firebase.auth().sendPasswordResetEmail(data)
        .then(() => {
            ShowSuccessToast("please check your email")
            view.setScreenAtive('login')
        })
        .catch((error) => {
            ShowErrorToast("Email is not avaiable")
        });
}
// model lay du lieu ten cac tinh thanh pho viet nam
model.getApiCity = async (data) => {
    await fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')

        .then(function (response) {
            return response.json()
        })
        .then(function (post) {
            data = post.reduce((acc, item) => {
                return [...acc, item.Name]
            }, [])
            return data
        }).then((data) => {
            let province = document.getElementsByClassName('province');
            let sumHtml = ''
            for (let i = 0; i < data.length; i++) {
                sumHtml += `<option>${data[i]}</option> <br>`
            }
            province[0].innerHTML = sumHtml
        })
}

model.pushValueUserBank = async (data) => {
    try {
        let response = await db.collection('UserBank').doc(auth.currentUser.email).get()
        if (response.exists == false) {
            db.collection('UserBank').doc(auth.currentUser.email).set({
                message: [data]
            })
        } else {

            await db.collection('UserBank').doc(auth.currentUser.email).update({
                message: firebase.firestore.FieldValue.arrayUnion(data)
            })
        }
        ShowSuccessToast("You Payed success")

    } catch (error) {
        console.log(error.message);
    }
}


model.getPriceTotal = async () => {
    try {
        await db.collection('shopping').get()
        await db.collection("shopping").doc(auth.currentUser.email)
            .onSnapshot(doc => {
                let result = doc.data().product;
                let sum = 0;
                for (let i of result) {
                    sum += Number(i.sum.replace("$", ''))
                }
                let total = '$' + sum.toString()
                view.totalCheckOut(total)
            });

    } catch (error) {
        ShowErrorToast(error.message)
    }
}
model.updateShopBecomeEmty = async () => {
    await db.collection('shopping').doc(auth.currentUser.email).update({
        product: []
    })
}
// dang nhap bang goole
var ggProvider = new firebase.auth.GoogleAuthProvider();
model.getTokenGoogle = () => {
    firebase.auth().signInWithPopup(ggProvider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
    }).catch(function (error) {
        console.log(error);
    });

}
// dang nhap bang facebôk
var provider = new firebase.auth.FacebookAuthProvider()
model.getTokenFacebook = () => {
    // fbProvider.addScope( "email")
    // console.log(fbProvider,'aa');
    // firebase.auth().signInWithPopup(fbProvider).then(function(result) {
    // var credential = result.credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // console.log(credential,111);
    // console.log(user,22);
    // }).catch(function (error) {
    //     console.log(error);
    // });

    console.log(provider);
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(auth.currentUser, 'auth');
            console.log(result, 'result');
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            console.log(user);
            view.setScreenAtive('home')
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;
            console.log(accessToken, "44444444");
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });
};

// model update password 
model.updatePassword = async (data) => {

    let response = await db.collection('user').doc(auth.currentUser.uid).get()
    if (data.oldPassword == response.data().password) {

        let user = auth.currentUser
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, data.oldPassword)
            .then(function (user) {
                firebase.auth().currentUser.updatePassword(data.newPassword)
                    .then(function () {
                        ShowSuccessToast("You change password success")
                        view.setScreenAtive('home')
                    })
                    .catch(function (err) {
                        ShowErrorToast("change password not success")
                    });
            })
            .catch(function (err) {
                alert(err.message)
            })
        await db.collection('user').doc(auth.currentUser.uid).update({
            password: data.newPassword
        })
    } else {
        view.showError('old-password')
        view.showMessageError('old-password', 'password is wong!!')
        setTimeout(() => view.offError('old-password'), 2000)
    }
};

// model showinfo
model.showInfo = async () => {
    try {
        await db.collection('user').get()
        await db.collection("user").doc(auth.currentUser.uid)
            .onSnapshot(doc => {
                let result = doc.data()
                view.updateAvatar()
                view.showInfoPage("mail", result.email);
                view.showInfoName('left', result.name);
                view.showInfoPage("phone", result.phone)
                view.showInfoPage('gender', result.gender);
                view.showInfoPage('national', result.national);
                view.showInfoPage('age', result.age);
                view.showInfoPage('birthday', result.birthday);
                view.showInfoPage('left', result.job);
                // view.updateAvatar()
            })
    } catch (error) {
        ShowErrorToast(error.message)
    }
}
// model update lai thong tin user
model.updateCollectionUser = async (data) => {
    try {
        await db.collection('user').doc(auth.currentUser.uid).update(data)
        ShowSuccessToast('Update success')
        view.setScreenAtive("home")
    } catch (error) {
        ShowErrorToast("Update fail")
    }
}
// model day anh len storeage
model.pushValueImgToStorage = async (data) => {
    let ref = storage.ref(auth.currentUser.email)
    let metadata = {
        contentType: data.type,
    }
    let nameFile = data.name
    let uploadImg = ref.child(nameFile).put(data, metadata);
    await uploadImg
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            db.collection('user').doc(auth.currentUser.uid).update({ link: url })
            auth.currentUser.updateProfile({
                photoURL: url
            });
            view.updateAvatar();
        })
        .catch(console.error)
}

// ham lay giu lieu ve
model.getUrlStorage = async () => {
    try {
        let ref = storage.ref()
        await ref.child(auth.currentUser.email).listAll()
            .then(result => result.items)
            .then(data => data.forEach(async (item) => {
                console.log(await item.getDownloadURL());
            }))
    } catch (error) {

    }
}
// day du lieu len tren firebase
model.pushValueComment = async (data) => {
    try {
        let response = await db.collection('comment').doc(data.name).get()
        if (response.exists == false) {
            db.collection('comment').doc(data.name).set({
                comment: [{
                    email: auth.currentUser.email,
                    comment: data.comment,
                    "time": new Date().toLocaleString()
                }]
            })
        } else {
            await db.collection('comment').doc(data.name).update({
                comment: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    comment: data.comment,
                    "time": new Date().toLocaleString()
                })
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}
// lay du lieu comment
model.getValueComment = async (data) => {
    console.log(data);
    let response = await db.collection('comment').get()

    let result = response.docs
    for (let i in result) {
        if (result[i].id == data) {
            let resultName = await db.collection('comment').doc(data).get()
            let commentValue = resultName.data().comment
            for (let j in commentValue) {
                if (commentValue[j].email == auth.currentUser.email) {
                    view.renderComment(commentValue[j].comment, auth.currentUser.photoURL)
                } else {
                    let img = await db.collection('user').get()
                    var link = img.docs
                    for (let i in link) {
                        if (commentValue[j].email == link[i].data().email) {
                            view.renderComment(commentValue[j].comment, link[i].data().link)
                        }
                    }
                }
            }
        }

    }
};