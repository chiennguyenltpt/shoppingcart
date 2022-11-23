const component = {};

// giao dien trang tru

const listData = [
    { name: 'Iphone1', price: '$599', img: 'image/iphone1.png' },
    { name: 'Iphone2', price: '$699', img: '../image/iphone2-removebg-preview (1).png' },
    { name: 'Iphone3', price: '$799', img: '../image/iphone4-removebg-preview.png' },
    { name: 'Iphone4', price: '$234', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone5', price: '$432', img: '../image/iphone8-removebg-preview.png' },
    { name: 'Iphone6', price: '$456', img: '../image/green.png' },
    { name: 'Iphone7', price: '$787', img: '../image/iphone1.png' },
    { name: 'Iphone8', price: '$974', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone9', price: '$431', img: "../image/iphone4-removebg-preview.png" },
    { name: 'Iphone10', price: '$543', img: 'image/iphone1.png' },
    { name: 'Iphone11', price: '$873', img: '../image/iphone2-removebg-preview (1).png' },
    { name: 'Iphone12', price: '$653', img: '../image/iphone4-removebg-preview.png' },
    { name: 'Iphone13', price: '$874', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone14', price: '$234', img: '../image/iphone8-removebg-preview.png' },
    { name: 'Iphone15', price: '$112', img: '../image/green.png' },
    { name: 'Iphone16', price: '$424', img: '../image/iphone1.png' },
    { name: 'Iphone17', price: '$432', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone18', price: '$432', img: "../image/iphone4-removebg-preview.png" },
    { name: 'Iphone19', price: '$324', img: 'image/iphone1.png' },
    { name: 'Iphone20', price: '$436', img: '../image/iphone2-removebg-preview (1).png' },
    { name: 'Iphone21', price: '$438', img: '../image/iphone4-removebg-preview.png' },
    { name: 'Iphone22', price: '$421', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone23', price: '$432', img: '../image/iphone8-removebg-preview.png' },
    { name: 'Iphone24', price: '$976', img: '../image/green.png' },
    { name: 'Iphone25', price: '$064', img: '../image/iphone1.png' },
    { name: 'Iphone26', price: '$854', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone27', price: '$765', img: "../image/iphone4-removebg-preview.png" },
    { name: 'Iphone28', price: '$799', img: 'image/iphone1.png' },
    { name: 'Iphone29', price: '$976', img: '../image/iphone2-removebg-preview (1).png' },
    { name: 'Iphone30', price: '$868', img: '../image/iphone4-removebg-preview.png' },
    { name: 'Iphone31', price: '$967', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone32', price: '$678', img: '../image/iphone8-removebg-preview.png' },
    { name: 'Iphone33', price: '$399', img: '../image/green.png' },
    { name: 'Iphone34', price: '$299', img: '../image/iphone1.png' },
    { name: 'Iphone35', price: '$678', img: '../image/iphone7-removebg-preview (1).png' },
    { name: 'Iphone36', price: '$868', img: "../image/iphone4-removebg-preview.png" },
]
let layout = ''
for (let i = 0; i < listData.length; i++) {
    layout += ` <div class="card">
            <div class="basicInfo">
                <div class="title">
                    <div class="category">Đột phá công nghê</div>
                    <div class="name">${listData[i].name}</div>
                    <div class="info">GOLD</div>

                </div>
                <div class="img">
                    <div class="item">
                        <input type="radio" name="color" id="green" checked>
                        <img src="${listData[i].img}" alt="">
                    </div>
                </div>
                
            </div>     

                <div class="mores">
                    <div class="price">${listData[i].price}</div>
                    <div class="star">
                            <i class="fa-regular fa-star text-yellow"></i>
                            <i class="fa-regular fa-star text-yellow"></i>
                            <i class="fa-regular fa-star text-yellow"></i>
                            <i class="fa-regular fa-star text-yellow"></i>
                            <i class="fa-regular fa-star"></i>
                    </div>
                </div>
                   <div class="addCard">
                       <label for="openCard">
                           <i class="fa-solid fa-basket-shopping"></i>
                       </label>
                   </div>

                   
        </div> `


}

component.home = `
<div class="content-item"  id ='content-item' ">
        ${layout}
</div> 
<div class="chatapp">
        <div class="title-chatapp">Well come </div>
        <div class="content" id = 'content'>
        </div>
        <div class="sendmessage">
            <input type="text" >
            <ion-icon id='icon-chatapp' name="send-outline"></ion-icon>
        </div>
        </div>   
    <img src="./image/messageicon.png" class = 'message-icon' alt="">

    <div id="notice">
        <li id="changePassword">Change Password</li>
        <li id="showInfo">show Infor</li>
      
    </div>

    `
component.register = `
    <form id='register'>
    <div class="main" >
        
    <div class="register">
        <div class="name item">
            <label for="username">username</label><br>
            <input type="text" name="name" placeholder="username"><br>
            <small>Error</small>
        </div>
        <div class="email item">
            <label for="email">Email</label><br>
            <input type="text" name="email" placeholder="email"><br>
            <small>Error</small>
        </div>
        <div class="password item">
            <label for="password">password</label><br>
            <input type="text" name="password" placeholder="password"><br>
            <small>Error</small>
        </div>
        <div class="confirmPassword item">
            <label for="confirmPassword">confirmPassword</label><br>
            <input type="text" name="confirmPassword" placeholder="confirmPassword"><br>
            <small>Error</small>
        </div>
    
        <p>You have account !! <a id='login'>Sign in</a></p>
        <button type='submit'>SignUP</button>
    
    
    
    
    </div>
    </div>
    </form>
`

component.login = `
    <form id = 'login'>
    <div class="main">
        
    <div class="login">
        
        <div class="email item">
            <label for="email">Email</label><br>
            <input type="text" name="email" placeholder="email"><br>
            <small>Error</small>
        </div>
        <div class="password item">
            <label for="password">password</label><br>
            <input type="text" name="password" placeholder="password" ><br>
            <small>Error</small>
        </div>
    
        <p>You dont have account !! <a id='signup'>Sign up</a></p>
        <p id = 'forgot-password'>forgot password</p>
        <button type='submit'>Sign In</button>
        <div>
            <img id="facebook" src="./image/facebook.webp" alt="">
            <img id="google" src="./image/logoGoogle.png" alt="">
        </div>
    
    </div>
    </div>
    </form>
`

component.purchase = `
<div id="app">
        <section class="container content-section">
            <h2 class="section-header">CART</h2>
            <div class="cart-row">
                <span class="cart-item cart-header cart-column">ITEM</span>
                <span class="cart-price cart-header cart-column">PRICE</span>
                <span class="cart-quantity cart-header cart-column">QUANTITY</span>
            </div>
            <div class="cart-items">
                
               
            </div>
            <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
                <span class="cart-total-price">$39.97</span>
            </div>
            <button class="btn btn-primary btn-purchase" type="button">PURCHASE</button>
        </section>

    </div>`



// trang thanh toan bang the
component.payment = `
<header id= 'payment'>
        <div class="container-payment">
            <div class="left">
                <h3>BILLING ADDRESS</h3>
                <form>
                    Full name
                    <input type="text" name=""  id='name' class= 'infoUser' placeholder="Enter name">
                    Email
                    <input type="text" name="" id ='email' class= 'infoUser'  placeholder="Enter email">
    
                    Address
                    <input type="text" name=""  class= 'infoUser' placeholder="Enter address">
                    
                    City
                    <input type="text" name=""  class= 'infoUser' placeholder="Enter City">
                    <div id="zip">
                        <label>
                            State
                            <select class = 'province'>
                                
                            </select>
                        </label>
                            <label>
                            Zip code
                            <input type="number" name="" class= 'infoUser'  placeholder="Zip code">
                        </label>
                    </div>
                </form>
            </div>
            <div class="right">
                <h3>PAYMENT</h3>
                <form>
                    Accepted Card <br>
                    <img src="../image/card1.png" width="100">
                    <img src="../image/card2.png" width="50">
                    <br><br>
    
                    Credit card number <br>
                <input type="text" name="" class= 'infoUser'  placeholder="Visa card starting with 347, length 13 or 16 digits"><br>
               
                    Exp month<br>
                    <input type="text" name="" class= 'infoUser'  placeholder="Enter Month"><br>
                    <div id="zip">
                        <label>
                            Exp year
                            <select>
                                <option>Choose Year..</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                        </label>
                            <label>
                            CVV
                            <input type="number" class= 'infoUser'  name="" placeholder="CVV">
                        </label>
                    </div>
                </form>
                <h3>total : <span>$0</span></h3>
                <input type="submit" id='btn' name="" value="Proceed to Checkout">
            </div>
        </div>
    </header>
`

// trang silde
component.slide = `  <div class= 'screen-slide'>
<div class="container1">
<div id="slide">
    <div class="item-slide" style="background-image: url(../image/avatar.jpeg)">
        <div class="content1">
            <div class="name-slide">Iphone14 Pro Max</div>
            <div class="text">Dinh cao cong nghe</div>
            <button>See More</button>
        </div>
    </div>
    <div class="item-slide" style="background-image: url(../image/avatar.jpeg)">
        <div class="content1">
            <div class="name-slide">Iphone14 Pro Max</div>
            <div class="text">Dinh cao cong nghe</div>
            <button>See More</button>
        </div>
    </div>
    <div class="item-slide" style="background-image: url(../image/anhcho.jpeg)">
        <div class="content1">
            <div class="name-slide">Iphone14 Pro Max</div>
            <div class="text">Dinh cao cong nghe</div>
            <button>See More</button>
        </div>
    </div>
    
    <div class="item-slide" style="background-image: url(../image/anhcho.jpeg)">
        <div class="content1">
            <div class="name-slide">Iphone14 Pro Max</div>
            <div class="text">Dinh cao cong nghe</div>
            <button>See More</button>
        </div>
    </div>
    <div class="item-slide" style="background-image: url(../image/avatar.jpeg)">
        <div class="content1">
            <div class="name-slide">Iphone14 Pro Max</div>
            <div class="text">Dinh cao cong nghe</div>
            <button>See More</button>
        </div>
    </div>
    <div class="item-slide" style="background-image: url(../image/avatar.jpeg)">
        <div class="content1">
            <div class="name-slide">Iphone14 Pro Max</div>
            <div class="text">Dinh cao cong nghe</div>
            <button>See More</button>
        </div>
</div>
<div class="button">
    <button id="prev"><ion-icon name="arrow-back-outline"></ion-icon> </button>
    <button id="next"><ion-icon name="arrow-forward-outline"></ion-icon></button>
</div>
</div>



</div>
`

component.changepassword = `

<div class="change-password">
    <div class="old-password">
        <input type="password" placeholder="old password"><br>
        <small>erro</small>
    </div>
    <div class="new-password">
        <input type="password" placeholder="new password"><br>
        <small>erro</small>
    </div>
    <div class="comfirm-password">
        <input type="password" placeholder="confirm password"><br>
        <small>erro</small>
    </div>
    <button class="btn-changePassword" >send</button>
</div>
`

// trang reset mat khau
component.resetEmail = `<div class="send-email">
<div class="main-content">
    <label for="" id="text-resetEmail">email</label><br>
    <input type="text" placeholder="your Email">
    <small>error</small><br>
    <button type="button">Send</button>
</div>
</div>`

// trang show thong tin tai khoan
component.showInfo =`
<div class="wrapper">
<div class="left">
    <img class="img-user" src="../image/avatar.jpeg" 
    alt="user" width="200"> 
    <h4>Alexander Dade</h4>
     <p>Anh Công Nhân</p>
</div>
<div class="right">
    <div class="info">
        <h3>Information</h3>
        <div class="info_data">
             <div class="data mail">
                <h4>Email</h4>
                <p>alex@gmail.com</p>
             </div>
                              
             <div class="data phone">
               <h4>Phone</h4>
                <p>0001-213-998761</p>
          </div>
        </div>
    </div>
  
  <div class="projects">
        
        <div class="projects_data">
             <div class="data birthday">
                <h4>Birthday</h4>
                <p>28/11/1995</p>
             </div>
             <div class="data age">
               <h4>Age</h4>
                <p>28</p>
          </div>
        </div>
    </div>
    <div class="projects">
       
        <div class="projects_data">
             <div class="data national">
                <h4>National</h4>
                <p>VietNameses </p>
             </div>
             <div class="data address">
                <h4>Adress</h4>
                <p>Ha Noi</p>
             </div> 
             <div class="data gender">
               <h4>Gender</h4>
                <p>Male</p>
          </div>
        </div>
    </div>
    <div id="btn-update">
        <button>Update</button>     
    </div>
  
    <div class="social_media">
        <ul>
          <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
          <li><a href="#"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#"><i class="fab fa-instagram"></i></a></li>
      </ul>
  </div>
</div>
</div>
`

component.updateInfo = `
<div class="wrapper-info">
<div class="main-info">
    <div class="input-infor job-detail">
        <input type="text" class='job' placeholder="job"><br>
        <small>error</small>
    </div>
    <div class="input-infor phone-user">
        <input type="number" class = 'phone' placeholder="phone"><br>
        <small>error</small>
    </div>
    <div class="input-infor birthday-user">
        <input type="date" id='birthday' placeholder="birthday YYYY-MM-DD"><br>
        <small>error</small>
    </div>
    <div class="input-infor age-user">
        <input type="number" class='age' placeholder="age"><br>
        <small>error</small>
    </div>
    <div class="input-infor national-user">
        <input type="text" class = 'national' placeholder="national"><br>
        <small>error</small>
    </div>
    <div class="input-infor address-user">
        <input type="text" class='address' placeholder="address"><br>
        <small>error</small>
    </div>
    <div class="input-infor gender-user">
        <input type="text" class = 'gender' placeholder="gender"><br>
        <small>error</small>
    </div>
    <div class="input-infor img-user">
        <input type="file" class='imgUser' placeholder="Avarta"><br>
        <small>error</small>
    </div>
    
</div>
<div class="btn-info">
    <button>Update</button>
    <button id='btn-updateAvatar' >Update avarta</button>
</div>

</div>

  

</div>
`
