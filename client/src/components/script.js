const axios = require('axios')
var reviews = [];
axios.get(`http://localhost:5050/api/prof/5e86e46976d2883f34851964`)
.then(response => {
    reviews = response.data.reviews
    reviews.map(function(review){
        console.log(review._id)
        axios.delete(`http://localhost:5050/api/review/${review._id}`)
        .then(response=>{
            console.log(response);
        }).catch(function (error) {
            console.log("ERROR LOADING DATA");
            console.log(error);
          });
    })
}).catch(function (error) {
    console.log("ERROR LOADING DATA");
    console.log(error);
});
