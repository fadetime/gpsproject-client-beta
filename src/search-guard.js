export default (to, from, next) => {
    if(localStorage.drivertoken && localStorage.driverRole === 'dayshiftLeader'){
      next()
    } else {
      next('/')
    }
}