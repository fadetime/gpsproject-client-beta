export default (to, from, next) => {
    // setTimeout(()=>{
      if(localStorage.drivertoken){
        next()
      } else {
        next('/login')
      }
    // },20)
  }