// var wine = require('./couponDetails.js')

// wine.sync({force:true})

// User.hasMany(Note);
// /*
// * Note的实例对象将拥有getUser、setUser、createUser方法
// */
// Note.belongsTo(User);

var coupon = require('./coupon.js')
var couponDetails = require('./couponDetails.js')

// coupon.sync({force:true})
coupon.hasMany(couponDetails)
couponDetails.belongsTo(coupon)
// coupon.hasMany(couponDetails,{as:'Cou'})
// couponDetails.belongsTo(coupon,{as:'Coupon',foreignKey:'coupon_id'});

// couponDetails.belongsTo(coupon,{as:'coupon',foreignKey:'coupon_id'})
// coupon.hasMany(couponDetails,{as:'couponDetails',foreignKey:'coupon_id'})

coupon.sync({force:true})
.then(()=>{
    couponDetails.sync({force:true})
})




