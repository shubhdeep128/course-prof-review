import React, { Component } from 'react'
import API from '../../../utils/API'
export default class ReviewControl extends Component {

    deleteReview = () => {
        if(window.confirm("Are you sure want to Delete your Review "))
        {
            var newRating = ((this.props.course_rating * this.props.course_revCount) - this.props.review_rating)/( this.props.course_revCount - 1);
            API.patch(`/api/${this.props.type}/${this.props.course_id}`,{
              Rating: newRating,
              revCount: (this.props.course_revCount - 1)
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
    
    render() {
        console.log(this.props)
        var link = `/${this.props.type}/RevUpdate/` + this.props.review_id;
        console.log(link)
        
        const UserButtons = () => {
            if(this.props.current_user._id === this.props.author._id)
            {
                return(
                    <div>
                        <a href = {link}><button className = "button is-white"><i class="far fa-edit"></i></button></a>
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
