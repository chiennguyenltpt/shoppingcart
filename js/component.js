const component = {};

// giao dien trang tru

const listData = [
    {name:'Iphone1',price:'$799'},
    {name:'Iphone12',price:'$599'},
    {name:'Iphone11',price:'$699'},
    {name:'Iphone17',price:'$899'},
    {name:'Iphone13',price:'$999'},
    {name:'Iphone15',price:'$399'},
    {name:'Iphone19',price:'$299'},
    {name:'Iphone20',price:'$499'},
    {name:'Iphone11',price:'$567'},

]
let layout = ''
for (let i=0;i<listData.length;i++ ){
    layout+=` <div class="card">
            <div class="basicInfo">
                <div class="title">
                    <div class="category">Đột phá công nghê</div>
                    <div class="name">${listData[i].name}</div>
                    <div class="info">GOLD</div>

                </div>
                <div class="img">
                    <div class="item">
                        <input type="radio" name="color" id="green" checked>
                        <img src="../image/green.png" alt="">
                    </div>
                </div>
                <div class="colors">
                    <label for="green">
                        <div class="ellipse" style="background-color: rgb(233, 147, 161);"></div>
                    </label>
                    <label for="black">
                        <div class="ellipse" style="background-color: rgb(228, 208, 211);"></div>
                    </label>
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

component.home =`
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
        <li id="change-password ">Change Password</li>
        <li id="update-account ">Update Acount</li>
        <li id="update-avatar">Update Avatar</li>
    </div>

    `
component.register =`
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

component.login =`
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
    
    </div>
    </div>
    </form>
`

component.purchase =`
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
                    <input type="text" name=""  id='name' placeholder="Enter name">
                    Email
                    <input type="text" name="" id ='email' placeholder="Enter email">
    
                    Address
                    <input type="text" name="" placeholder="Enter address">
                    
                    City
                    <input type="text" name="" placeholder="Enter City">
                    <div id="zip">
                        <label>
                            State
                            <select>
                                <option>Choose State..</option>
                                <option>Rajasthan</option>
                                <option>Hariyana</option>
                                <option>Uttar Pradesh</option>
                                <option>Madhya Pradesh</option>
                            </select>
                        </label>
                            <label>
                            Zip code
                            <input type="number" name="" placeholder="Zip code">
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
                <input type="text" name="" placeholder="Enter card number"><br>
                    
                    Exp month<br>
                    <input type="text" name="" placeholder="Enter Month"><br>
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
                            <input type="number" name="" placeholder="CVV">
                        </label>
                    </div>
                </form>
                <h3>total : <span>$400</span></h3>
                <input type="submit" name="" value="Proceed to Checkout">
            </div>
        </div>
    </header>
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
    
    


