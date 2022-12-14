const view = {};

var dataUserName = ''
view.dataUser = (dataUser) => {
    dataUserName = dataUser
}

 view.avatar = ()=>{
        if (auth.currentUser.photoURL==null) {
            auth.currentUser.photoURL = "./image/avatar-null.png"
            avartar.src = "./image/avatar-null.png"
        }else{
            avartar.src = auth.currentUser.photoURL
        }
    }
view.showError = (classItem) => {
    document.querySelector(`.${classItem} small`).style.visibility = 'visible'
};
view.showMessageError = (classItem, message) => {
    document.querySelector(`.${classItem} small`).innerHTML = message;
};
view.offError = (classItem) => {
    document.querySelector(`.${classItem} small`).style.visibility = 'hidden'
};
view.logOut = () => {
    document.getElementById('logout').addEventListener('click', () => {
        document.getElementById('user').innerHTML = ''
        avartar.src = "./image/avatar-null.png"
        admin.style.visibility='hidden'
        firebase.auth().signOut();
    });
};
view.logOut();

// them the khi nguoi dung nhap vao
view.addUserMessage = (message) => {
    let layOut = document.createElement('div')
    layOut.innerHTML= `<div class = "box box1">
                    <p class="user">${message}</p><img src="${auth.currentUser.photoURL}" id='img-user'>
                </div>`
    document.getElementsByClassName('content')[0].appendChild(layOut)
}

// the khi nguoi thu2 nhap vao
view.addBotMessage = (message,url) => {
    let layOut = document.createElement('div')
    layOut.innerHTML= ` <div class = "box box2">
    <img src="${url}" id='img-user'><p class="bot">${message}</p>
        </div>`
    document.getElementsByClassName('content')[0].appendChild(layOut)
};
// ham show gia tien trong checkout
view.totalCheckOut = (value)=>{
    let valueCheckOut = document.querySelector('h3 span')
    valueCheckOut.innerHTML = value
}

let value 
//ham click thanh search
let search = document.getElementById('search')
search.addEventListener("click",(e)=>{
    e.preventDefault();
    hideNav()
    document.querySelector(".search-form").classList.toggle("active")
})

//bat su kien click qua tao
let apple = document.getElementsByClassName("fa-brands")[0]
apple.addEventListener('click', ()=>{
    view.setScreenAtive('slide')
})
//su kien click iphone
    iphone.addEventListener('click',()=>{
        view.setScreenAtive('home')
    })

// funct tao giao dien cho trang show info
view.showInfoPage = (classitem,value)=>{
    document.querySelector(`.${classitem} p`).innerHTML  = value;
};
view.showInfoName = (classitem,value)=>{
    document.querySelector(`.${classitem} h4`).innerHTML  = value;
}
// ham lay anh de apdate avatar
view.updateAvatar = ()=>{
    let avatarUrl = document.querySelector('.img-user')
    avatarUrl.src = auth.currentUser.photoURL; 
}
view.admin = ()=>{
    let admin = document.querySelector('.admin')
    
    if(auth.currentUser.email=="manhchienltpt@gmail.com"){
        
        admin.style.visibility='visible'
    }else{
        admin.style.visibility = 'hidden'
    }
}
// ham view render comment
view.renderComment =(data,value)=>{
    let layoutComment = document.getElementById('cmt');
    const cmt_layout = document.createElement('div');
    cmt_layout.innerHTML = `<img src="${value}" alt="">
    <p>${data}</p> `
    cmt_layout.classList.add('comment-text')
    layoutComment.prepend(cmt_layout)
     
}
// bat su kien addmin icon
admin.addEventListener('click' ,()=>{
    view.setScreenAtive('adminchat')
    model.getMessageValue() 
    model.getUserInChatApp()
})
// render danh sach nguoi dung khi cvao boxchat admin
view.UserOfAdminPage = (url,name,id)=>{
    return `<div class = 'list-user' id ="${id}">
        <img class = "img-adminChat" src=${url} alt="">
        <h2>${name}</h2>
        <h3>
            <span class="status orange"></span>
            offline
        </h3> 
    </div>`
}
// render danh sach nguoi dung trong admin page 
view.renderUserChatAdmin = (value)=>{
    let layout = document.querySelector("aside ul li")
    let listUser = document.createElement('div');
    listUser.innerHTML =value;
    layout.appendChild(listUser)
}
// click hien thong tin nguoi dung tren admin page
view.headerAdminPage =(link,name,id)=>{
    if(link==null){
        link= 'https://firebasestorage.googleapis.com/v0/b/appbanhang-4d425.appspot.com/o/manhchienltpt%40gmail.com%2Fanh-gai-xinh-cute-50.jpeg?alt=media&token=069f32f4-bc5f-4243-b899-8a0f57d62a3c'
    }
    document.querySelector('header img').src = link
    document.querySelector('header h2').innerHTML = `Chat with ${name}`
    document.querySelector('header h2').id = id
}


// truong hop cac man hinh
view.setScreenAtive = (screenName) => {
    switch (screenName) {
        case 'home':
            let app = document.getElementById('app');
            
            
            document.getElementById('user').innerHTML = auth.currentUser.displayName;
            app.innerHTML = component.home;
            
            // click hien thi chat boxx
            model.realTimeTotal()
            if(auth.currentUser.email == "manhchienltpt@gmail.com"){
                document.getElementsByClassName('message-icon')[0].style.display = 'none'
            }
            // goi am tham khi icon message o trang thai an
            if (document.getElementsByClassName('chatapp')[0].className.indexOf('hide-chatapp') != -1) {
                model.notifyMessageAudio()
            }
            document.getElementsByClassName('message-icon')[0].addEventListener('click', () => {
                if (document.getElementsByClassName('chatapp')[0].className.indexOf('hide-chatapp') != -1) {
                    document.getElementsByClassName('chatapp')[0].classList.toggle('hide-chatapp')
                    document.getElementsByClassName('chatapp')[0].classList.toggle('show-chatapp')
                    model.getMessageValue()
                    model.snapShotLastMsgUser()
                } else {
                    document.getElementsByClassName('chatapp')[0].classList.toggle('hide-chatapp')
                    document.getElementsByClassName('chatapp')[0].classList.toggle('show-chatapp')
                    content.innerHTML = ''
                }
            })
            // hien ten nguoi dung tren box chat
            document.getElementsByClassName('title-chatapp')[0].innerHTML += auth.currentUser.displayName
            var content_chatapp = document.getElementById('content')
            // an enter viet chu
            document.querySelector('.sendmessage input').addEventListener('keydown', (e) => {
                if (e.key == 'Enter') {
                    let inputValue = document.querySelector('.sendmessage input');
                    controller.chatValue(inputValue.value);
                    view.addUserMessage(inputValue.value);
                    inputValue.value = ''
                    content_chatapp.scrollTop = content_chatapp.scrollHeight;
                }

            });

            let card = document.getElementsByClassName('card');
            let addCard = document.getElementsByClassName('addCard');
            let name = document.getElementsByClassName('name');
            let price = document.getElementsByClassName('price');
            for (let i = 0; i < card.length; i++) {
                addCard[i].addEventListener('click', (e) => {
                    e.preventDefault()
                    document.querySelector('.menu ul li span').style.visibility = 'visible'
                    const dataCard = {
                        name: name[i].innerHTML,
                        price: price[i].innerHTML,
                    }
                    document.querySelector('.menu ul li span').innerHTML = Number(document.querySelector('.menu ul li span').innerHTML) + 1
                    controller.card(dataCard);
                })
            }
            // an hien thanh thong bao
            let user = document.getElementById('user');
            let notice = document.getElementById('notice');
            user.addEventListener('click', () => {
                if (notice.style.visibility == 'hidden') {
                    notice.style.visibility = "visible"
                } else {
                    notice.style.visibility = 'hidden'
                }
            });
            // hien ra shopping  cart 
            let cart = document.getElementsByClassName('fa-cart-shopping')[0]
            cart.addEventListener('click', (e) => {
                e.preventDefault()
                view.setScreenAtive("purchase");
            }); 

            // su kien click changepassword
            changePassword.addEventListener('click',()=>{
                view.setScreenAtive('changepassword')
            })

            // bat su kien chuyen tran show info;
            showInfo.addEventListener('click',()=>{
                view.setScreenAtive('showInfo')
                
            })

            document.getElementById('logout').addEventListener('click', () => {
                document.getElementById('user').innerHTML = ''
                firebase.auth().signOut();
                window.onload();
            });

            //bat su kien click anh chuyen trang
            let Img = document.querySelectorAll('.item img')
            for(let i=0;i<Img.length;i++){
                Img[i].addEventListener('click',()=>{

                    let dataDetail = {
                        name:name[i].innerHTML,
                        price: price[i].innerHTML,
                        img:listData[i].img,
                    }

                    view.setScreenAtive('commentPage')
                    view.renderDetailProduct(dataDetail)
                    model.getValueComment(dataDetail.name)
                })
            }
            break;

        // man dang ky
        case 'register':
            document.getElementById('app').innerHTML = component.register;
            let result = document.getElementById('register');
            result.addEventListener('submit', (e) => {
                e.preventDefault();
                const dataUser = {
                    name: result.name.value,
                    email: result.email.value,
                    password: result.password.value,
                    confirmPassword: result.confirmPassword.value,
                }
                controller.register(dataUser);
            });
            document.getElementById('login').addEventListener('click', () => {

                view.setScreenAtive('login');
            });

            break;
        case 'login':
            document.getElementById('app').innerHTML = component.login;
            document.querySelector('.menu ul li span').innerHTML = 0

            let data = document.getElementById('login');
            data.addEventListener('submit', (e) => {
                e.preventDefault();
                const dataLogin = {
                    email: data.email.value,
                    password: data.password.value
                }
                controller.login(dataLogin)
            });

            document.getElementById('signup').onclick = () => {
                view.setScreenAtive('register')
            }
            // chuyen sang trang quen mat khau
            let forgotPassword = document.getElementById('forgot-password')
            forgotPassword.addEventListener('click', () => {
                view.setScreenAtive('resetpassword')
            })

            // bat su kien click google
            google.addEventListener('click',()=>{
                model.getTokenGoogle()
            })
            // bat su kien dang nhap bang facebook
            facebook.addEventListener('click' ,()=>{
                model.getTokenFacebook()
            })
            break;

        case 'purchase':
            document.getElementById('app').innerHTML = component.purchase;
            model.getShoppingValue()
            view.showCard = (data) => {
                console.log(data);
                let layout = ''
                for (i = 0; i < data.length; i++) {
                    layout += ` <div class="cart-row cart-hidden">
                    <div class="cart-item cart-column">
                    <img class="cart-item-image" src="./image/green.png" width="100" height="100">
                        <span class="cart-item-title">${data[i].name}</span>
                    </div>
                    <span class="cart-price cart-column price">${data[i].sum}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="${data[i].total}">
                        <button class="btn btn-danger remove" type="button">REMOVE</button>
                    </div>
                    </div>`

                }
                let sumLayOut = layout
                let layoutCartItem = document.getElementsByClassName('cart-items')[0]
                layoutCartItem.innerHTML = sumLayOut

                // lay du lieu tu the
                let inputValue = document.getElementsByClassName('cart-quantity-input')
                let nameValue = document.getElementsByClassName('cart-item-title')
                let priceValue = document.getElementsByClassName('price')

                let cartRow = document.getElementsByClassName('cart-hidden')
                for (let i = 0; i < inputValue.length; i++) {
                    inputValue[i].addEventListener('change', () => {
                        let data = {
                            name: nameValue[i].innerHTML,
                            total: inputValue[i].value,
                            sum: priceValue[i].innerHTML
                        }
                        model.quantity(data)
                        model.realTimeCard(data)
                    })
                }

                // su kien click remove
                let remove = document.getElementsByClassName('remove');
                // let cartRow = document.getElementsByClassName('cart-hidden')

                for (let i = 0; i < remove.length; i++) {
                    remove[i].addEventListener('click', () => {
                        let data = {
                            name: nameValue[i].textContent,

                        }
                        view.removeCart(i);
                        model.deleteCard(data)
                    })
                }
                view.changValuePrice = (position, value) => {
                    let priceValue = document.getElementsByClassName('price')[position];
                    priceValue.innerHTML = value;
                }

                // hien tong tien
                view.totalPrice = (value) => {
                    let total = document.getElementsByClassName('cart-total-price')[0];
                    total.innerHTML = value
                }
                // xoa remove

            }
            let cartRow = document.getElementsByClassName('cart-hidden')

            let layoutCartItem = document.getElementsByClassName('cart-items')[0]

            view.removeCart = (position) => {
                layoutCartItem.removeChild(cartRow[position])
            }
            let purchase = document.getElementsByClassName('btn-purchase')[0]
            purchase.addEventListener('click', () => {
                view.setScreenAtive('payment')
            })

            break;
        // trang thanh toan 

        case "payment":
            document.getElementById('app').innerHTML = component.payment;
            let email = document.getElementById("email");
            let nameUser = document.getElementById("name");
            let btn_checkout = document.querySelector("#btn")
            email.setAttribute('value', `${auth.currentUser.email}`);
            nameUser.setAttribute("value", `${auth.currentUser.displayName}`);
            model.getApiCity();
            model.getPriceTotal()
            btn_checkout.addEventListener('click', () => {
                const infoUser = document.getElementsByClassName("infoUser");
                const dataUser = {
                    name: infoUser[0].value,
                    email: infoUser[1].value,
                    address: infoUser[2].value,
                    city: infoUser[3].value,
                    cardNumber: infoUser[5].value,
                    expCard: infoUser[6].value,
                }
                controller.getValueCard(dataUser)
                
                
            })



            break;
        case 'slide' :
            document.getElementById('app').innerHTML = component.slide;
            document.getElementById("next").onclick = function(){
                let lists = document.querySelectorAll('.item-slide')
                document.getElementById("slide").appendChild(lists[0])
            }
            document.getElementById("prev").onclick = function(){
                let lists = document.querySelectorAll('.item-slide')
                document.getElementById("slide").prepend(lists[lists.length - 1])
            }
            break;
        case 'changepassword':
            document.getElementById('app').innerHTML = component.changepassword;
            let oldPassword = document.querySelector('.old-password input');
            let newPassword = document.querySelector('.new-password input');
            let confirmPassword = document.querySelector('.comfirm-password input');
            let btnChangePassword = document.querySelector('button')
            btnChangePassword.addEventListener('click',()=>{
                const dataChangePassWord = {
                    oldPassword:oldPassword.value,
                    newPassword:newPassword.value,
                    confirmPassword:confirmPassword.value
                }
                controller.changePassword(dataChangePassWord)
            })

            
            break
        case 'showInfo' :
            document.getElementById("app").innerHTML = component.showInfo;
            view.updateAvatar()
                model.showInfo()
                let btn_update =document.getElementById('btn-update')
                btn_update.addEventListener('click',()=>{
                    view.setScreenAtive('updateInfo')
                })
            break;
// case cap nhat
        case 'updateInfo':
            console.log(auth.currentUser.photoURL);
            document.getElementById("app").innerHTML= component.updateInfo;
            let job = document.querySelector('.job');
            let phone = document.querySelector('.phone');
            let birthday = document.querySelector("#birthday")
            let age = document.querySelector('.age');
            let national = document.querySelector(".national");
            let address = document.querySelector('.address');
            let gender = document.querySelector('.gender');
            let image = document.querySelector('.imgUser')
            let btn_updateAvatar = document.getElementById('btn-updateAvatar');
            let btn_info = document.querySelector(".btn-info button");
            btn_info.addEventListener('click' , ()=>{
                
                const valueInfoUser = {
                    job:job.value,
                    phone:phone.value,
                    birthday:birthday.value,
                    age:age.value,
                    national:national.value,
                    address:address.value,
                    gender:gender.value,    
                }
                controller.getValueUpdateInfoPage(valueInfoUser)
                model.pushValueImgToStorage(image.files[0])
            })
            // bat su kien click update avatar
            btn_updateAvatar.addEventListener('click',()=>{
                model.pushValueImgToStorage(image.files[0])
                view.setScreenAtive('home')
                window.onload()
            })
            break;
        case 'resetpassword':
            document.getElementById('app').innerHTML = component.resetEmail;
            let btn = document.querySelector('button')
            let valueInput = document.querySelector('.main-content input');
            btn.addEventListener('click', () => {
                
                let resultValue = valueInput.value;
                controller.resetEmail(resultValue)
            })
            break;
        case "commentPage":
                document.getElementById('app').innerHTML =component.commentPage;
                let mainImg = document.querySelector('.img-container img')
                let mainName = document.querySelector('.product-name')
                let mainPrice = document.querySelector('.product-price')
                view.renderDetailProduct = (data)=>{
                    mainImg.src = data.img;
                    mainName.innerHTML =data.name;
                    mainPrice.innerHTML = data.price
                }
                // su kien click vao add to c???rt
                let addCart = document.querySelector('.add-cart-btn')
                addCart.addEventListener('click',()=>{
                    let valueProductCommentPage = {
                        name:mainName.innerHTML,
                        price:mainPrice.innerHTML
                    }
                    model.pushValueCard(valueProductCommentPage);
                })
                // bat su kien buy now
                let buyNow = document.querySelector('.buy-now-btn');
                buyNow.addEventListener('click',()=>{
                    view.setScreenAtive('payment')
                    let valueProductCommentPage = {
                        name:mainName.innerHTML,
                        price:mainPrice.innerHTML
                    }
                    model.pushValueCard(valueProductCommentPage);
                })
                // su kien comment here;
                let comment = document.querySelector('.commet-page input')
                let btn_send = document.querySelector(".commet-page button");
                btn_send.addEventListener('click',()=>{
                    let dataPushCommentValue = {
                        comment:comment.value,
                        name:mainName.innerHTML,
                    }
                    controller.commentValue(dataPushCommentValue)
                    
                    
                    comment.value = ''
                   
                })

            break;
        case 'adminchat':
            document.getElementById('app').innerHTML = component.adminChat;
            
            view.renderMessageAdmin = (classname,name,time,message)=>{
            let layoutComment = document.getElementById('chat');
            const cmt_layout = document.createElement('li');
            cmt_layout.innerHTML = `    <li>
            <div class="entete">
                <h3>${time}</h3>
                <h2>${name}</h2>
                <span class="status blue"></span>
            </div>
            <div class="triangle"></div>
            <div class="message">
            ${message}
            </div>
                </li> `
            cmt_layout.classList.add(classname)
            layoutComment.appendChild(cmt_layout)
            }

            view.renderMessageUser =(classname,name,time,message)=>{
                let layoutComment = document.getElementById('chat');
                const cmt_layout = document.createElement('li');
                cmt_layout.innerHTML = `<li>
                <div class="entete">
                <span class="status green"></span>
                <h2>${name}</h2>
                    <h3>${time}</h3>
                </div>
                <div class="triangle"></div>
                <div class="message">
                    ${message}
                </div>
                    </li> `
                cmt_layout.classList.add(classname)
                layoutComment.appendChild(cmt_layout)
            }
            textArea.addEventListener('keydown',(e)=>{
                if(e.key=="Enter"){
                    let id = document.querySelector('header h2').getAttribute('id')
                    if(textArea.value!=""){
                       
                        view.renderMessageAdmin('me',"Admin",new Date().toLocaleString(),textArea.value)
                        model.pushMessageAdmin(id,textArea.value)
                        textArea.value=""
                        chat.scrollTop = chat.scrollHeight
                    }
                }
            })


            
    
            
                
            break
            default:

            break;
    }
}




















































// toast
function toast({ title = "", message = "", type = "", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast)
        }, duration);
        const toast = document.createElement("div");
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast)
                clearTimeout(autoRemoveId)
            }

        }
        const icons = {
            success: "fa-solid fa-circle-check",
            info: "fa-solid fa-circle-info",
            error: "fa-solid fa-circle-exclamation"
        }
        const icon = icons[type]
        //   const delay = (duration / 1000).toFixed(2)
        toast.classList.add("toast", `toast--${type}`);
        //   toast.style.animation =` slideInLeft ease .3s ,fadeout linear 1s ${delay}s forwards`;
        toast.innerHTML = `
        
    <div class="toast__icon">
      <i class="${icon}"></i>
    </div>
    <div class="toast__body">
      <h3 class="toast__title">${title}</h3>
      <p class="toast__msg">${message}</p>
    </div>
    <div class="toast__close">
      <i class="fa-solid fa-xmark"></i>
    </div>
  
        `;
        main.appendChild(toast);

    }
}

function ShowSuccessToast(message) {
    toast({
        title: "Success",
        message: message,
        type: "success",
        duration: 4000,
    });
}
function ShowErrorToast(message) {
    toast({
        title: "Error",
        message: message,
        type: "error",
        duration: 4000,
    });
}
function ShowInfoToast(message) {
    toast({
        title: "Th??ng b??o",
        message: message,
        type: "info",
        duration: 4000,
    });
}


// ham click search
function hideNav(){
    let value= document.getElementsByClassName('menu-item')
    for(i=0;i<value.length;i++){
        value[i].classList.toggle('hide-item')
    }
}