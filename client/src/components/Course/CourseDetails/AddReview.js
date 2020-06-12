import React, { Component } from 'react'
import './AddReview.css'
import API from '../../../utils/API.js';

export default class AddReview extends Component {

  componentDidMount(){
    API.get(`/api/course/${this.props.course_id}`)
    .then(response => {
      this.setState({review : response.data})
      console.log(this.state.review)
    }).catch(error => {
      console.log(error)
    })
  }

  handleSubmit(e){
    e.preventDefault();
    var desc = this.refs.desc.value;
    var rating = this.refs.rating.value;
    API.post('/api/review/add', {
        Parent : this.props.course_id,
        Author: this.props.current_user,
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
      }).catch(function (error) {
        console.log(error);
      });  

      const overall_rating =+Number(this.props.course_rating);
      const total_rating =+Number(this.props.course_revCount);
      const new_rating =+rating
      const newRevCount = this.props.course_revCount + 1;
      var newOverallRating = (overall_rating*total_rating+new_rating)/(newRevCount)
      API.patch(`/api/course/${this.props.course_id}`,{
        Rating: newOverallRating,
        revCount: newRevCount
      }).then(function(response){
        console.log(response)
        window.location.reload(false)
      }).catch(function (error) {
        console.log(error);
      });  

  }
    render() {
        this.handleSubmit = this.handleSubmit.bind(this);
        document.addEventListener('DOMContentLoaded', function () {

            // Modals
          
            var rootEl = document.documentElement;
            var $modals = getAll('.modal');
            var $modalButtons = getAll('.modal-button');
            var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button');
          
            if ($modalButtons.length > 0) {
              $modalButtons.forEach(function ($el) {
                $el.addEventListener('click', function () {
                  var target = $el.dataset.target;
                  var $target = document.getElementById(target);
                  rootEl.classList.add('is-clipped');
                  $target.classList.add('is-active');
                });
              });
            }
          
            if ($modalCloses.length > 0) {
              $modalCloses.forEach(function ($el) {
                $el.addEventListener('click', function () {
                  closeModals();
                });
              });
            }
          
            document.addEventListener('keydown', function (event) {
              var e = event || window.event;
              if (e.keyCode === 27) {
                closeModals();
              }
            });
          
            function closeModals() {
              rootEl.classList.remove('is-clipped');
              $modals.forEach(function ($el) {
                $el.classList.remove('is-active');
              });
            }
          
            // Functions
          
            function getAll(selector) {
              return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
            }
          
          });
          console.log(this.props)
          const ReviewForm = ()=>{
            if(this.props.loginStatus && this.props.current_user_review === false){
              return(
                  <div className = "Form">
                  <form>
                    <div className="field">
                      <label className="label">Write your Review</label>
                      <div className="control">
                        <textarea className="textarea" placeholder="Review" ref = "desc" id = "revbody"></textarea>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Overall Rating</label>
                      <div className="control">
                        <div className="select" >
                          <select ref = "rating" id = "rating">
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
        return (
            <div className = "add-review">
                <button className="button is-rounded is-medium modal-button" id="add-review" data-target="modal-ter" aria-haspopup="true">Add a Review</button>
                <div className="modal" id = "modal-ter">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                    <p className="modal-card-title has-text-weight-bold">Add a Review</p>
                    <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                    {ReviewForm()}
                    </section>
                    <footer className="modal-card-foot">
                    {(this.props.loginStatus && this.props.current_user_review)?(<div></div>):(<button onClick = {this.handleSubmit} type = "submit" className="button is-rounded is-black" id = "submit-review">Submit Review</button>)}
                    <button className="button is-rounded is-danger">Cancel</button>
                    </footer>
                </div>
                </div>
            </div>
        )
    }
}
