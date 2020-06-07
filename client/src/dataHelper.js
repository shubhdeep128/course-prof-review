const axios = require('axios');
// const users = [
//     {"_id":{"$oid":"5e4828dcf56ab06faf366602"},"TrustFactor":{"$numberInt":"3"},"Roles":"Admin","Bio":[],"name":"SHUBH DEEP","email":"f20180162@hyderabad.bits-pilani.ac.in","photo":"https://lh5.googleusercontent.com/-SDHqhdNRh_8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcgDCYQsj583Y40zqErgeuiIqmrjA/photo.jpg","__v":{"$numberInt":"0"}},
//     {"_id":{"$oid":"5e4d095e794c8a0d8f36275a"},"TrustFactor":{"$numberInt":"3"},"Roles":"Admin","Bio":[],"name":"HIMANSHU GOYAL","email":"f20180753@hyderabad.bits-pilani.ac.in","photo":"https://lh4.googleusercontent.com/-kNMR8yl9Msk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfMacCj86E68OlluPK7y2TnAlEhhw/photo.jpg","__v":{"$numberInt":"0"}},
//     {"_id":{"$oid":"5e532cff7412cc0022f48a4c"},"TrustFactor":{"$numberInt":"3"},"Roles":"Admin","Bio":[],"name":"Narasimha Bolloju","email":"narsi.bolloju@hyderabad.bits-pilani.ac.in","photo":"https://lh3.googleusercontent.com/a-/AAuE7mB1cqUM-8i73rBsbBkOpmWlK5dRCZ17S0gkVxSmiA","__v":{"$numberInt":"0"}},
//     {"_id":{"$oid":"5edcf7eeeb200d60f8b63a89"},"TrustFactor":{"$numberInt":"3"},"Roles":"Basic","Bio":[],"name":"Shubhdeep Srivastava","email":"shubhdeep41280@gmail.com","photo":"https://lh3.googleusercontent.com/a-/AOh14GhGOMJgGqjKAnwN6ANbiJeCDhNL0bRO1RHWmdZi","created_at":{"$date":{"$numberLong":"1591539694950"}},"updated_at":{"$date":{"$numberLong":"1591539694950"}},"__v":{"$numberInt":"0"}},
// ]
const reviewData = [
    {"Votes":{"up_vote":35,"down_vote":66},"_id":"5e85dc3029af5b249b9df0a1","Parent":"5e85bde0d863511570b28122","Author":"5e85da59fc13ae307f00000b","Time_stamp":"2020-04-02T12:36:00.978Z","Description":"Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet,","Difficulty":1,"Rating":5,"__v":0},
    {"Votes":{"up_vote":41,"down_vote":79},"_id":"5e85ef13e393723553a994e0","Parent":"5e85bde0d863511570b28122","Author":"5e85da59fc13ae307f00000d","Time_stamp":"2020-02-18T13:32:19.000Z","Description":"Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.","Difficulty":8,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e86f58760d14d4226165794","Parent":"5e85bde0d863511570b28122","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-03T08:36:23.252Z","Description":"difficult","Difficulty":10,"Rating":7,"__v":0},{"Votes":{"up_vote":0,"down_vote":0},"_id":"5e86f59d60d14d4226165795","Parent":"5e85bde0d863511570b28122","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-03T08:36:45.232Z","Description":"difficult ","Difficulty":10,"Rating":9,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e872de426339a4b90bb4c9b","Parent":"5e85bde0d863511570b28122","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-03T12:36:52.294Z","Description":"This course is interesting ","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e8765566cfb100aaa6c2124","Parent":"5e85bde0d863511570b28122","Author":"5e4828dcf56ab06faf366602","Time_stamp":"2020-04-03T16:33:26.116Z","Description":"New review","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e8b6be9d789a541be97f4e1","Parent":"5e8a32b45917e023c0019d41","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-06T17:50:33.812Z","Description":"Good Course","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e8d7e5fb4600600229e4b1c","Parent":"5e8a337e5917e023c0019d44","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-08T07:33:51.783Z","Description":"Pheminisht","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e8d7e60b4600600229e4b1d","Parent":"5e8a337e5917e023c0019d44","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-08T07:33:52.944Z","Description":"Pheminisht","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e8d831cb4600600229e4b1f","Parent":"5e8a338f5917e023c0019d45","Author":"5e8d805eb4600600229e4b1e","Time_stamp":"2020-04-08T07:54:04.254Z","Description":"Nice course for A1 A2 A4 A5 peeps! Atleast they will get to sit in placements by this","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e90a610742d57257748bca0","Parent":"5e8d9897fc908d219254b247","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-10T17:00:00.014Z","Description":"Phoda","Difficulty":10,"Rating":5,"__v":0},{"Votes":{"up_vote":0,"down_vote":0},"_id":"5e92235f0511e50022193962","Parent":"5e92233f0511e50022193961","Author":"5e4828dcf56ab06faf366602","Time_stamp":"2020-04-11T20:06:55.030Z","Description":"Heda ki 10 lagi","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e95d7f9d40b45602932b8b6","Parent":"5e90618704acef3e8fdcf57f","Author":"5e4828dcf56ab06faf366602","Time_stamp":"2020-04-14T15:34:17.239Z","Description":"This is a test Review","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e95d806d40b45602932b8b7","Parent":"5e90618704acef3e8fdcf57f","Author":"5e4828dcf56ab06faf366602","Time_stamp":"2020-04-14T15:34:30.264Z","Description":"This is another test review","Difficulty":10,"Rating":3,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e9768cddefaa900228bcc06","Parent":"5e8a240cc9ce53153564022f","Author":"5e92243d0511e50022193963","Time_stamp":"2020-04-15T20:04:29.016Z","Description":"\"It is fairly difficult course. Every bit important for placement in IT companies. The weekly assignments are very good and help to keep a strong grip on the course. Prof. Bhanumurthy is very helpful and his classes are always very interesting. ","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e9768f8defaa900228bcc07","Parent":"5e8a240cc9ce53153564022f","Author":"5e9189fb2cb32b00220b447f","Time_stamp":"2020-04-15T20:05:12.883Z","Description":"One of the most fundamental courses if you want to have a good idea on how to use Data Structures and the various basic algorithms. Also very important from IT placement point of view. A strong hold of DSA is necessary if you are interested in IT placements. The teachers are very helpful and regular assignments make sure that your concepts are clear.","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e976a60defaa900228bcc09","Parent":"5e918c2a2cb32b00220b4480","Author":"5e92243d0511e50022193963","Time_stamp":"2020-04-15T20:11:12.073Z","Description":"\" He is one the most meticulous professor. He completes the syllabus on time and very efficiently with ample amount of problem solving and practical examples. But he is very stringent while grading as well as setting exam papers.\"","Difficulty":10,"Rating":4,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e976a62defaa900228bcc0a","Parent":"5e918c2a2cb32b00220b4480","Author":"5e9189fb2cb32b00220b447f","Time_stamp":"2020-04-15T20:11:14.446Z","Description":"Has a a very deep and strong understanding of his topics as well as those related to his. Pay proper attention to what he says in class and you will find the topics to be easy.","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e976b1adefaa900228bcc0b","Parent":"5e918c2a2cb32b00220b4480","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-04-15T20:14:18.705Z","Description":"The professor has a very good understanding of the subject. His teaching methods are also really proficient. His assignments are a bit tough but they help you in understanding the topic. You are supposed to be regular to his regulars as he takes a lot of surprise tests. His grading is also lenient and he is very liberal while checking the papers.","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e976c17defaa900228bcc0c","Parent":"5e8a240cc9ce53153564022f","Author":"5e8d805eb4600600229e4b1e","Time_stamp":"2020-04-15T20:18:31.997Z","Description":"It is a very important course from placements perspective. You need to be thorough with the basics of Discrete Mathematics as then only you will be able to comolete this course efficiently.The weekly assignments are very good for practise!\nOverall it's a goto course for Non-CS students","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5e9d8e1f840f14002223aef7","Parent":"5e8f96025a3e12515a2b2edd","Author":"5e9d8d6e840f14002223aef6","Time_stamp":"2020-04-20T11:57:19.382Z","Description":"Test Review","Difficulty":10,"Rating":5,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5eb1ed1689c2b10022bac74d","Parent":"5e8a2437c9ce531535640230","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-05-05T22:47:50.149Z","Description":"This is a test review","Difficulty":10,"Rating":1,"__v":0},
    {"Votes":{"up_vote":0,"down_vote":0},"_id":"5ece92f3125c010022348554","Parent":"5e8a240cc9ce53153564022f","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-05-27T16:18:59.795Z","Description":"This is a test review","Difficulty":10,"Rating":4,"__v":0}
]

const testId = "5edcf7eeeb200d60f8b63a89"


const userIds = [
    "5e4828dcf56ab06faf366602",
    "5e4d095e794c8a0d8f36275a",
    "5e532cff7412cc0022f48a4c",
    "5edcf7eeeb200d60f8b63a89"
]
var count = 0;


var testReview = {"Votes":{"up_vote":0,"down_vote":0},"_id":"5ece92f3125c010022348554","Parent":"5e8a240cc9ce53153564022f","Author":"5e4d095e794c8a0d8f36275a","Time_stamp":"2020-05-27T16:18:59.795Z","Description":"This is a test review","Difficulty":10,"Rating":4,"__v":0}

testReview["author"] = "5edcf7eeeb200d60f8b63a89"

// axios.patch(`http://localhost:5050/api/review/${testReview._id}`,
//     testReview)
//             .then((response) => {
//                 console.log(response)
//                 count = count + 1;
//             })
//             .catch(err => {
//                 console.log(err)
//             })


var reviews = [];

// reviewData.map((review) => {
//     axios.patch(`http://localhost:5050/api/review/${review._id}`,review)
//     .then(response => {
//         console.log("success")
//     })
//     .catch(err => {
//         console.log(err);
//     })
// })

axios.get(`http://localhost:5050/api/review`)
    .then((response) => {
        response.data.map((review) => {
            console.log(review["_id"], userIds.includes(review["Author"]));
            if(!userIds.includes(review["Author"])){
                console.log("updating")
                count = count+1;
                review["Author"] = "5edcf7eeeb200d60f8b63a89"
                axios.patch(`http://localhost:5050/api/review/${review._id}`,review)
                    .then((response) => {
                        console.log("success")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
    })

// console.log(reviews)
// reviewData.map((review) => {
//     console.log(review.Author)
//     if(!userIds.includes(review["Author"])){
//         count = count+1;
//         review["Author"] = "5edcf7eeeb200d60f8b63a89"
//         axios.patch(`http://localhost:5050/api/review/${review._id}`,review)
//             .then((response) => {
//                 console.log("success")
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }
// })

console.log(count);