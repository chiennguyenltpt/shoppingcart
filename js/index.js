window.onload = () => {
    firebase.auth().onAuthStateChanged( (user)=> {
        if(user) {
            const flag = false;
            if(auth.currentUser.emailVerified && flag==false){
                view.setScreenAtive('home')
                view.dataUser(auth.currentUser.displayName)
                view.avatar()
                view.admin()
            }
        } else{
            view.setScreenAtive('login');
        }
    })
    
};







