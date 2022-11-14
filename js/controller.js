const controller ={};
controller.register =(dataUser)=>{
    if(dataUser.name=='') {
        view.showError('name')
        view.showMessageError('name','name can not be blank!!')
        setTimeout(()=> view.offError('name'),2000)
    }else if (dataUser.name.length<=8){
        view.showError('name')
        view.showMessageError('name','name must have more than 8 character!!')
        setTimeout(()=> view.offError('name'),2000)
    };
    if(dataUser.email==''){
        view.showError('email')
        view.showMessageError('email','email can not be blank!!')
        setTimeout(()=> view.offError('email'),2000)
    }else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(dataUser.email)){
        view.showError('email')
        view.showMessageError('email','email is not format')
        setTimeout(()=> view.offError('email'),2000)
    }

    if(dataUser.password=='') {
        view.showError('password')
        view.showMessageError('password','password can not be blank!!')
        setTimeout(()=> view.offError('password'),2000)
    }else if (dataUser.password.length<=8){
        view.showError('password')
        view.showMessageError('password','password must have more than 8 character!!')
        setTimeout(()=> view.offError('password'),2000)
    };
    if(dataUser.confirmPassword=='') {
        view.showError('confirmPassword')
        view.showMessageError('confirmPassword','confirmPassword can not be blank!!')
        setTimeout(()=> view.offError('confirmPassword'),2000)
    }else if (dataUser.confirmPassword.length<=8){
        view.showError('confirmPassword')
        view.showMessageError('confirmPassword','confirmPassword must have more than 8 character!!')
        setTimeout(()=> view.offError('confirmPassword'),2000)
    };

    if(dataUser.name!='' && dataUser.name.length>=8 && ((/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(dataUser.email))
    && dataUser.password !='' && dataUser.password.length>=8 && dataUser.confirmPassword!='' && dataUser.confirmPassword.length>=8 ){
        model.register(dataUser)
    }



}

controller.login = (dataLogin)=>{
    if(dataLogin.email==''){
        view.showError('email')
        view.showMessageError('email','email can not be blank!!')
        setTimeout(()=> view.offError('email'),2000)
    }else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(dataLogin.email)){
        view.showError('email')
        view.showMessageError('email','email is not format')
        setTimeout(()=> view.offError('email'),2000)
    }
    if(dataLogin.password=='') {
        view.showError('password')
        view.showMessageError('password','password can not be blank!!')
        setTimeout(()=> view.offError('password'),2000)
    }else if (dataLogin.password.length<=8){
        view.showError('password')
        view.showMessageError('password','password must have more than 8 character!!')
        setTimeout(()=> view.offError('password'),2000)
    };
    if(dataLogin.email!='' &&(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(dataLogin.email)
    && dataLogin.password!='' && dataLogin.password.length>8) {
        model.login(dataLogin)
    }
};


// controller home
controller.chatValue = (data)=>{
    if (data!= ''){
        const message ={
            name : auth.currentUser.displayName,
            message:data
        }
        model.chatapp(message)
    } else {
        return
    }
}

// data card
controller.card = (data)=>{
    model.pushValueCard(data)
}
// xu ly du lieu tu card lay ve
controller.totalPrice = (data)=>{  
    let sum = 0 ;
        for(let i of data) {
            sum+=Number(i.sum.replace("$",''))
        }
    let total = '$' + sum.toString()
    view.totalPrice(total) 
}
// lay ra tong so luong
controller.quantity = (data)=>{
    console.log(data);
    let sumTotal = 0;
    for (i in data){
        sumTotal +=data[i].total; 
    }
    document.querySelector('.menu ul li span').innerHTML = sumTotal
}

// controller.remakeValueCard()
// var models = [
// 	{ id: 1, name: "samsung", seller_id: 1, count: 56 },
// 	{ id: 1, name: "samsung", seller_id: 2, count: 68 },
// 	{ id: 2, name: "nokia", seller_id: 2, count: 45 },
// 	{ id: 2, name: "nokia", seller_id: 3, count: 49 }
//  ];
 
//  var arr = models.reduce((acc, item) => {
//   let existItem = acc.find(({name}) => item.name === name);
//   if(existItem) {
// 	existItem.count += item.count;
//   } else {
// 	acc.push(item);
//   }
//   return acc;
//  }, []);
 
//  console.log(arr,111);


// lay gia tri tu trang reset;
controller.resetEmail = (data)=>{
    console.log(data);
    if(data==''){
        view.showError('main-content')
        view.showMessageError('main-content','email can not be blank!!')
        setTimeout(()=> view.offError('email'),2000)
    }else if (!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(data)){
        view.showError('main-content')
        view.showMessageError('main-content','email is not format')
        setTimeout(()=> view.offError('main-content'),2000)
    }

    if(data != "" &&(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(data)){
        model.resetEmail(data)
    }
}



