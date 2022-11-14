window.onload = async() => {
    firebase.auth().onAuthStateChanged( (user)=> {
        if(user) {
            view.dataUser(auth.currentUser.displayName)
            view.setScreenAtive('purchase')
           
        } else{
            view.setScreenAtive('login');
        }
    })
    
};







