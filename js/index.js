window.onload = () => {
    firebase.auth().onAuthStateChanged( (user)=> {
        view.avatar()
        if(user) {
            view.dataUser(auth.currentUser.displayName)
            view.setScreenAtive('home')
            console.log(auth.currentUser.photoURL);
        } else{
            view.setScreenAtive('login');
        }
    })
    
};







