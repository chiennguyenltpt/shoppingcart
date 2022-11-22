window.onload = () => {
    firebase.auth().onAuthStateChanged( (user)=> {
        if(user) {
            view.dataUser(auth.currentUser.displayName)
            view.setScreenAtive('updateInfo')
               
        } else{
            view.setScreenAtive('login');
        }
    })
    
};







