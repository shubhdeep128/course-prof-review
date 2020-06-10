import React, { Component } from 'react'
import API from '../../../utils/API'
export default class ReviewControl extends Component {

    
    handleSubmit(e){
        e.preventDefault();
        var desc = this.refs.desc.value;
        var rating = this.refs.rating.value;
        const { match: { params } } = this.props;
        API.patch(`/api/review/${this.props._id}`, {
            Parent : params.courseid,
            Author: this.props.current_user._id,
            Time_stamp : Date.now,
            Description : desc,
            Difficulty : 10,
            Rating : rating,
            Votes : {
                up_vote : 0,
                down_vote : 0
            }
          }).then(function (response) {
              console.log(response);
            window.location.reload(false)
          }).catch(function (error) {
            console.log(error);
          });
        
    }
    deleteReview = () => {
        if(window.confirm("Are you sure want to Delete your Review "))
        {
            var newRating = ((this.props.prof_rating * this.props.prof_revCount) - this.props.review_rating)/( this.props.prof_revCount - 1);
            API.patch(`/api/prof/${this.props.prof_id}`,{
              Rating: newRating,
              revCount: (this.props.prof_revCount - 1)
            })

            API.delete(`/api/review/${this.props.review_id}`)
            .then(response => {
                console.log(response)
                alert("Your Review was deleted Successfully")
                window.location.reload(true)
            }).catch(function (error){
                console.log(error)
                alert("Sorry Review Could not be deleted")
            }) 
        }
    }
    render() {
        console.log(this.props)
        var link = '/profs/RevUpdate/' + this.props.review_id;
        const ReviewForm = ()=>{
            if(this.props.loginStatus && this.props.current_user_review === false){
              return(
                  <div className = "Form">
                  <form>
                    <div className="field">
                      <label className="label">Write your Review</label>
                      <div className="control">
                        <textarea className="textarea" placeholder="Review" ref = "desc"></textarea>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Overall Rating</label>
                      <div className="control">
                        <div className="select" >
                          <select ref = "rating">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
              </div>
              )
            }
            else if(this.props.loginStatus && this.props.current_user_review)
            {
              return(
                <div>
                  You have already given a review
                </div>
              )
            }
            else{
              return(
                <a href = "/auth/google" className = "button is-large is-rounded is-black">Log in To Continue</a>
              )
            }
          }
        const UserButtons = () => {
            if(this.props.current_user._id === this.props.author._id)
            {
                return(
                    <div>
                        <a href = {link}><i class="far fa-edit"></i></a>
                        <button className = "button is-white" onClick = {this.deleteReview}><i class="far fa-trash-alt"></i></button>
                    </div>
                )
            }
        }
        return (
            <div>
                {UserButtons()}
            </div>
        )
    }
}
