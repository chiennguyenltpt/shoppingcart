window.onload = async() => {
    firebase.auth().onAuthStateChanged( (user)=> {
        if(user) {
            view.dataUser(auth.currentUser.displayName)
            view.setScreenAtive('home') 
        } else{
            view.setScreenAtive('login');
        }
    })
    
};







