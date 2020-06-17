import React,{Component} from 'react';
import ReviewControls from './ReviewControl'
import './Reviews.css';
import API from '../../../utils/API'
import axios from 'axios'
class Reviews extends Component {
    state = {
        error:false,
        loadStatus: false,
        user : [],
        upVoteisPressed : false,
        downVoteisPressed : false,
        voteArr : [],
        upVotes: 0,
        downVotes: 0,
        voteid : '',
    }
    
    componentDidMount(){
    axios.all([
        axios.get(`/api/user/${this.props.author}`),
        axios.get(`/api/review/votes/${this.props.review_id}`)
    ])
    .then(responseArr => {
        this.setState({error:false, user:responseArr[0].data.user,voteArr : responseArr[1].data, loadStatus:true})
        console.log(responseArr[0].data)
        console.log(this.state.voteArr)
        for(var i=0;i<this.state.voteArr.length;i++)
       {
          if(this.state.voteArr[i].Author === this.state.user._id && this.state.voteArr[i].Value === 1)
          {
              var id = this.state.voteArr[i]._id
              this.setState({upVoteisPressed : true,voteid : id})
          }
          else if(this.state.voteArr[i].Author === this.state.user._id && this.state.voteArr[i].Value === -1)
          {
              var id = this.state.voteArr[i]._id
            this.setState({downVoteisPressed : true,voteid : id})
          }
          if(this.state.voteArr[i].Value ===1)
          {
              this.setState({upVotes : this.state.upVotes +1})
          }
          else
          {
              this.setState({downVotes : this.state.downVotes - 1})
          }
        }
        console.log(this.state.voteid);
    }).catch(function (error) {
        console.log("ERROR LOADING DATA");
        console.log(error);
      })
      console.log("Hello")
      var voteArr = this.state.voteArr
      
    }
    upvote = () => {
        if(this.state.upVoteisPressed)
        {
            API.delete(`/api/vote/${this.state.voteid}`).then((response) => {
                console.log(response.data)
                this.setState({upVoteisPressed : false, voteid : '',upVotes : this.state.upVotes -1});
            })
        }
        else
        {
            if(this.state.downVoteisPressed)
            {
             API.patch(`/api/vote/${this.state.voteid}`,{
                Parent : this.props.review_id,
                Value : 1,
                Author : this.state.user._id,
                timestamps : {
                    createdAt : Date.now(),
                    upDatedAt : Date.now()
                }
             }).then((response) => {
                 console.log(response)
                 this.setState({upVoteisPressed : true,downVoteisPressed : false,upVotes : this.state.upVotes+1,downVotes : this.state.downVotes+1})
             })
            }
            else
            {
               API.post('/api/vote/add',{
                   Parent : this.props.review_id,
                   Value : 1,
                   Author : this.state.user._id,
                   timestamps : {
                       createdAt : Date.now(),
                       upDatedAt : Date.now()
                   }
               }).then(
                   response => {
                       console.log(response.data.newVote._id)
                       this.setState({upVoteisPressed : true,voteid : response.data.newVote._id,upVotes : this.state.upVotes+1})
                   }
               ).catch(error => {
                   console.log(error)
               })

            }
        }
    }  
    downvote = () => {
        if(this.state.downVoteisPressed)
        {
            API.delete(`/api/vote/${this.state.voteid}`).then((response) => {
                console.log(response.data)
                this.setState({downVoteisPressed : false, voteid : '',downVotes : this.state.downVotes+1});
            })
        }
        else
        {
            if(this.state.upVoteisPressed)
            {
                API.patch(`/api/vote/${this.state.voteid}`,{
                    Parent : this.props.review_id,
                    Value : -1,
                    Author : this.state.user._id,
                    timestamps : {
                        createdAt : Date.now(),
                        upDatedAt : Date.now()
                    }
                 }).then((response) => {
                     console.log(response)
                     this.setState({upVoteisPressed : false,downVoteisPressed : true,upVotes : this.state.upVotes-1,downVotes : this.state.downVotes-1})
                 })
            }
            else
            {
                API.post('/api/vote/add',{
                    Parent : this.props.review_id,
                    Value : -1,
                    Author : this.state.user._id,
                    timestamps : {
                        createdAt : Date.now(),
                        upDatedAt : Date.now()
                    }
                }).then(
                    response => {
                        console.log(response.data.newVote._id)
                        this.setState({downVoteisPressed : true, voteid : response.data.newVote._id,downVotes : this.state.downVotes-1})
                    }
                ).catch(error => {
                    console.log(error)
                })
 
            }
        }
    }
    render() {
        var upColor = "black";
        var downColor = "black";
        if(this.state.upVoteisPressed)
        {
            upColor = "green";
        }
        else
        {
            upColor = 'black';
        }
        if(this.state.downVoteisPressed)
        {
            downColor = "red";
        }
        else
        {
            downColor = 'black';
        }

        console.log(this.props)
        return (
            <div className = 'review-container'>
                <div className = "columns is-vcentered is-mobile">
                    <div className = "column is-2">
                        <div className = "course-review-circle">
                            <div className = "review-circle-text"> {this.props.rating}</div>
                        </div>
                    </div>
                    <div className = "column is-9">
                        <div className = "review-desc is-italic">
                            <span className = "has-text-weight-bold">{this.state.user.name} -</span><br/>
                            <span className = " has-text-weight-semibold">"</span>
                            {this.props.desc}
                            <span className = "">"</span>
                        </div>
                        <ReviewControls review_rating = {this.props.rating} review_id = {this.props.review_id} current_user = {this.props.current_user} author = {this.state.user} course_id = {this.props.course_id} course_rating = {this.props.course_rating} course_revCount = {this.props.course_revCount} type = {"course"} />
                    </div>
                    <div className = "column has-text-centered">
                        <span className = "has-text-weight-bold">{this.state.upVotes}</span><br/>
                        <span className = "icon is-medium" style={{color:upColor}} onClick = {this.upvote} ><i className="far fa-thumbs-up icon is-medium"  ></i></span><br/>
                        <br/>
                        <span className = "icon is-medium" style={{color:downColor}} onClick = {this.downvote} ><i className="far fa-thumbs-down icon is-medium" ></i></span><br/>
                        <span className = "has-text-weight-bold">{this.state.downVotes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;
