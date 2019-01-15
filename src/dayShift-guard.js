export default (to, from, next) => {
    if(localStorage.drivertoken && localStorage.driverRole === 'dayshift'){
      next()
    } else {
      next('/')
    }
}