const view = {};

var dataUserName=''
view.dataUser = (dataUser)=>{
    dataUserName = dataUser
}
view.showError =(classItem)=>{
    document.querySelector(`.${classItem} small`).style.visibility ='visible'
};
view.showMessageError = (classItem,message)=>{
    document.querySelector(`.${classItem} small`).innerHTML=message;
};
view.offError = (classItem)=>{
    document.querySelector(`.${classItem} small`).style.visibility ='hidden'
};
view.logOut = ()=>{
document.getElementById('logout').addEventListener('click',()=>{
        document.getElementById('user').innerHTML = ''
        firebase.auth().signOut()
    })
};
view.logOut();

// them the khi nguoi dung nhap vao
view.addUserMessage = (message)=>{
    var html = `<div class=" box box1">
                    <p class="user">${message}</p><img src="./image/avatar.jpeg" id='img-user'>
                </div>`
    document.getElementsByClassName('content')[0].innerHTML+=html
}

// the khi nguoi thu2 nhap vao
view.addBotMessage = (message)=>{
    var html = ` <div class="box box2">
                    <img src="./image/anhcho.jpeg" id='img-user'><p class="bot">${message}</p>
                </div>
                `
    document.getElementsByClassName('content')[0].innerHTML+=html
};




// truong hop cac man hinh
view.setScreenAtive =(screenName)=>{
    switch (screenName) {
        case 'home':
            let app = document.getElementById('app');
            document.getElementById('user').innerHTML=dataUserName;
            app.innerHTML=component.home;
            // click hien thi chat boxx
            
            document.getElementsByClassName('message-icon')[0].addEventListener('click',()=>{
                if(document.getElementsByClassName('chatapp')[0].style.visibility == 'hidden'){
                    document.getElementsByClassName('chatapp')[0].style.visibility = 'visible'
                    model.getMessageValue()

                } else{
                    document.getElementsByClassName('chatapp')[0].style.visibility = 'hidden'
                }
            })
            // hien ten nguoi dung tren box chat
            document.getElementsByClassName('title-chatapp')[0].innerHTML += auth.currentUser.displayName
            var content_chatapp = document.getElementById('content')
            content_chatapp.scrollTop = content_chatapp.scrollHeight
            // an enter viet chu
            document.querySelector('.sendmessage input').addEventListener('keydown' ,(e)=>{
                if(e.key=='Enter'){
                    let inputValue = document.querySelector('.sendmessage input');
                    controller.chatValue(inputValue.value);
                    view.addUserMessage(inputValue.value);
                    inputValue.value = ''
                }
                
            });

            let card = document.getElementsByClassName('card');
            let addCard = document.getElementsByClassName('addCard');
            let name = document.getElementsByClassName('name');
            let price = document.getElementsByClassName('price');
            for (let i = 0 ; i<card.length;i++ ){
            addCard[i].addEventListener('click',(e)=>{
                e.preventDefault()
                document.querySelector('.menu ul li span').style.visibility = 'visible'
                const dataCard = {
                    name:name[i].innerHTML,
                    price:price[i].innerHTML,
                }
                document.querySelector('.menu ul li span').innerHTML=Number(document.querySelector('.menu ul li span').innerHTML)+1
                controller.card(dataCard)
            })
            }
            // an hien thanh thong bao
            let user = document.getElementById('user');
            let notice = document.getElementById('notice');
            user.addEventListener('click' ,()=>{
                if(notice.style.visibility=='hidden'){
                    notice.style.visibility ="visible"
                }else{
                    notice.style.visibility= 'hidden'
                }
            })
            // hien ra shopping  cart 
            let cart = document.getElementsByClassName('fa-cart-shopping')[0]
            cart.addEventListener('click',(e)=>{
                e.preventDefault()
                view.setScreenAtive("purchase");
                // model.getShoppingValue()
                
            })
            break;

            // man dang ky
        case 'register' :
            document.getElementById('app').innerHTML = component.register;
            let result = document.getElementById('register');
            result.addEventListener('submit',(e)=>{
                e.preventDefault();
                const dataUser = {
                    name :result.name.value,
                    email:result.email.value,
                    password:result.password.value,
                    confirmPassword:result.confirmPassword.value,
                }
                controller.register(dataUser);
            })
            document.getElementById('login').addEventListener('click',()=>{
                
                view.setScreenAtive('login')
            });

            break;
        case 'login' :
            document.getElementById('app').innerHTML = component.login;
            let data= document.getElementById('login');
            data.addEventListener('submit',(e)=>{
                e.preventDefault();
                const dataLogin = {
                    email:data.email.value,
                    password:data.password.value
                }
                controller.login(dataLogin)
            });
            document.getElementById('signup').onclick = ()=>{
                view.setScreenAtive('register')
            }
            // chuyen sang trang quen mat khau
            let forgotPassword = document.getElementById('forgot-password')
            forgotPassword.addEventListener('click',()=>{
                view.setScreenAtive('resetpassword')
            })
            // firebase.auth().sendPasswordResetEmail('manhchienltpt@gmail.com')
            // .then(() => {
            //   alert('hih')
            //   // ..
            // })
            // .catch((error) => {
            //   var errorCode = error.code;
            //   var errorMessage = error.message;
            //   alert(errorCode)
            // });

            break;
        
        case 'purchase' :
            document.getElementById('app').innerHTML = component.purchase;
            model.getShoppingValue()
            
            view.showCard = (data)=>{
                let layout = ''
                for (i=0;i<data.length;i++){
                    layout +=` <div class="cart-row cart-hidden">
                    <div class="cart-item cart-column">
                    <img class="cart-item-image" src="./image/green.png" width="100" height="100">
                        <span class="cart-item-title">${data[i].name}</span>
                    </div>
                    <span class="cart-price cart-column price">${data[i].sum}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="${data[i].total}">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>
                    </div>`
    
                }
                let layoutCartItem = document.getElementsByClassName('cart-items')[0]
                layoutCartItem.innerHTML +=layout
                
                // lay du lieu tu the
                let inputValue = document.getElementsByClassName('cart-quantity-input')
                let nameValue = document.getElementsByClassName('cart-item-title')
                let priceValue = document.getElementsByClassName('price')
                let remove = document.getElementsByClassName('btn');
                let cartRow = document.getElementsByClassName('cart-hidden')
                for(let i=0;i<inputValue.length;i++){
                    inputValue[i].addEventListener('change' ,()=>{  
                        let data = {
                            name:nameValue[i].innerHTML,
                            total:inputValue[i].value,
                            sum:priceValue[i].innerHTML
                        }   
                        model.quantity(data) 
                        model.realTimeCard(data)
                    })
                }
                
                // su kien click remove
                for (let i = 0 ; i<remove.length;i++){
                    remove[i].addEventListener('click',()=>{
                        let data = {
                            name: nameValue[i].textContent,
                        }
                        model.deleteCard(data)
                        view.removeCart(i)
                    })
                }
                
                view.changValuePrice = (position,value)=>{
                    let priceValue = document.getElementsByClassName('price')[position];
                    priceValue.innerHTML = value
                }
                
                // hien tong tien
                view.totalPrice = (value)=>{
                    let total = document.getElementsByClassName('cart-total-price')[0];
                    total.innerHTML = value
                }
                // xoa remove
                
            }
            let cartRow = document.getElementsByClassName('cart-hidden')

            let layoutCartItem = document.getElementsByClassName('cart-items')[0]

            view.removeCart = (position)=>{
                // cartRow[position].parentNode.removeChild(cartRow[position])
                layoutCartItem.removeChild(cartRow[position])
                
            }
            break;
        case 'resetpassword' :
            document.getElementById('app').innerHTML = component.resetEmail;
            let btn = document.querySelector('button')
            let valueInput = document.querySelector('input');
            btn.addEventListener('click' ,()=>{
                let resultValue = valueInput.value;
                controller.resetEmail(resultValue)

            })

        default:
            break;
    }
}