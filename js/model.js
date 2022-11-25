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
     await   db.collection('user').doc(auth.currentUser.uid).set(
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
        if (auth.currentUser.emailVerified ==true && response) {
            ShowSuccessToast("Login Success")
            //  view.dataUser(auth.currentUser.displayName)
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
        let response = await db.collection('chatapp').doc('chatbox').get()
        if (response.exists == false) {
            db.collection('chatapp').doc('chatbox').set({
                message: [{
                    name: auth.currentUser.email,
                    message: data.message,
                    "time": new Date().toLocaleString()
                }]
            })
        } else {

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
        let response = await db.collection("chatapp").doc("chatbox").get()
        let userInfo = await db.collection('user').get()
        let valueSum = userInfo.docs
        let result = response.data().message
        for (i in result) {
            if (auth.currentUser.email == result[i].name) {
                view.addUserMessage(result[i].message)
            } else {
                if (i == result.length - 1) {
                    break
                } else {
                    for(let j =0;j<valueSum.length;j++){
                        if(valueSum[j].data().email==result[i].name){
                            view.addBotMessage(result[i].message,valueSum[j].data().link)
                        }
                    }
                }
            }
        }
        await db.collection("chatapp")
            .onSnapshot((value) => {
                let message = value.docs.map((doc) => ({ ...doc.data() }))
                let messageValue = message[0].message
                let lastMessage = messageValue[messageValue.length - 1]
                if (auth.currentUser.email != lastMessage.name) {
                    // view.addBotMessage(lastMessage.message)
                    for(let j =0;j<valueSum.length;j++){
                        if(valueSum[j].data().email==lastMessage.name){
                            view.addBotMessage(lastMessage.message,valueSum[j].data().link)
                        }
                    }
                }
            });
    } catch (error) {
        console.log(error.message);
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
model.getTokenFacebook = ()=>{
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


    firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
        console.log(result , 'result');
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;
        console.log(user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
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
}

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
             db.collection('user').doc(auth.currentUser.uid).update({link:url})
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