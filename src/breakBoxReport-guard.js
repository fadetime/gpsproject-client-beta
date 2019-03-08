export default (to, from, next) => {
    if(localStorage.drivertoken && localStorage.driverRole === 'breakbox'){
      next()
    } else {
      next('/')
    }
}