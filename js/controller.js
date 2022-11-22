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
    let sumTotal = 0;
    for (i in data){
        sumTotal +=data[i].total; 
    }
    document.querySelector('.menu ul li span').innerHTML = sumTotal
}

// render ra cac tinh thanh

controller.getValueCard = (data)=>{
   
   let re = /^(?:3[47][0-9]{13})$/;

    if(data.address ==''){
        ShowErrorToast("address is not blank")
    };
    if(data.city==''){
        ShowErrorToast("City is not blank")
    };
    if (data.cardNumber=='') {
        ShowErrorToast("cardNumber can not be blank")
    }else if(data.cardNumber.match(re)==false){
        ShowErrorToast('Number is not format')
    }
    
    model.pushValueUserBank(data)
}

// su ly du lieu tran thay doi mat khau
controller.changePassword = (data)=>{
    
    if (data.oldPassword==""){
        view.showError('old-password')
        view.showMessageError('old-password','old-password can not be blank!!')
        setTimeout(()=> view.offError('old-password'),2000)
    }else if(data.oldPassword.length<8) {
        view.showError('old-password')
        view.showMessageError('old-password','old-password must have more than 8 chacarcter!!')
        setTimeout(()=> view.offError('old-password'),2000)
    }

    if (data.newPassword==""){
        view.showError('new-password')
        view.showMessageError('new-password','new-password can not be blank!!')
        setTimeout(()=> view.offError('new-password'),2000)
    }else if(data.newPassword.length<8) {
        view.showError('new-password')
        view.showMessageError('new-password','new-password must have more than 8 chacarcter!!')
        setTimeout(()=> view.offError('new-password'),2000)
    }

    if (data.confirmPassword==""){
        view.showError('comfirm-password')
        view.showMessageError('comfirm-password','comfirm-password can not be blank!!')
        setTimeout(()=> view.offError('comfirm-password'),2000)
    }else if(data.confirmPassword.length<8) {
        view.showError('comfirm-password')
        view.showMessageError('comfirm-password','comfirm-password must have more than 8 chacarcter!!')
        setTimeout(()=> view.offError('comfirm-password'),2000)
    }else if(data.newPassword!=data.confirmPassword){
        view.showError('comfirm-password')
        view.showMessageError('comfirm-password','comfirm-password is not the same new password!!')
        setTimeout(()=> view.offError('comfirm-password'),2000)
    }

    if(data.oldPassword.length>8 && data.newPassword.length>8 &&data.newPassword==data.confirmPassword){
        model.updatePassword(data)
    }
}



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


// lay gia tri tu trang reset ;
controller.resetEmail = (data)=>{
    
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

// check validate cua trang update info
controller.getValueUpdateInfoPage = (data)=>{
    let re = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    if(data.job==""){
        view.showError('job-detail')
        view.showMessageError('job-detail','it can not be blank!!')
        setTimeout(()=> view.offError('job-detail'),2000)
    }
    if(data.phone==""){
        view.showError('phone-user')
        view.showMessageError('phone-user','it can not be blank!!')
        setTimeout(()=> view.offError('phone-user'),2000)
    }else if (!re.test(data.phone)){
        view.showError('phone-user')
        view.showMessageError('phone-user','format is wrong!!')
        setTimeout(()=> view.offError('phone-user'),2000)
    }
    if(data.birthday==""){
        view.showError('birthday-user')
        view.showMessageError('birthday-user','it can not be blank!!')
        setTimeout(()=> view.offError('birthday-user'),2000)
    };
    if(data.age==""){
        view.showError('age-user')
        view.showMessageError('age-user','it can not be blank!!')
        setTimeout(()=> view.offError('age-user'),2000)
    };
    if(data.national==""){
        view.showError('national-user')
        view.showMessageError('national-user','it can not be blank!!')
        setTimeout(()=> view.offError('national-user'),2000)
    }
    if(data.address==""){
        view.showError('address-user')
        view.showMessageError('address-user','it can not be blank!!')
        setTimeout(()=> view.offError('address-user'),2000)
    }
    if(data.gender==""){
        view.showError('gender-user')
        view.showMessageError('gender-user','it can not be blank!!')
        setTimeout(()=> view.offError('gender-user'),2000)
    }
    if(data.img==""){
        view.showError('img-user')
        view.showMessageError('img-user','it can not be blank!!')
        setTimeout(()=> view.offError('img-user'),2000)
    }
    if(data.job!="" && data.phone!="" && data.birthday!='' && data.age!="" && data.national!=""
    && data.address!="" && data.gender!="" && data.img!="" && re.test(data.phone)){

        model.updateCollectionUser(data) 
      
    }


}


