import React, { Component } from 'react'
import styles from './AddReview.css'
import API from '../../../utils/API.js';

export default class AddReview extends Component {

  handleSubmit(e){
    console.log("submit")
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
            if(this.props.loginStatus){
              return(
                  <div class = "Form">
                  <form>
                    <div class="field">
                      <label class="label">Write your Review</label>
                      <div class="control">
                        <textarea class="textarea" placeholder="Review" ref = "desc"></textarea>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Overall Rating</label>
                      <div class="control">
                        <div class="select" >
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
            else{
              return(
                <a href = "/auth/google" class = "button is-large is-rounded is-black">Log in To Continue</a>
              )
            }
          }
        return (
            <div class = "add-review">
                <button class="button is-rounded is-medium modal-button" data-target="modal-ter" aria-haspopup="true">Add a Review</button>
                <div class="modal" id = "modal-ter">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title has-text-weight-bold">Add a Review</p>
                    <button class="delete" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">
                    {ReviewForm()}
                    </section>
                    <footer class="modal-card-foot">
                    <button onClick = {this.handleSubmit} type = "submit" class="button is-rounded is-black">Submit Review</button>
                    <button class="button is-rounded is-danger">Cancel</button>
                    </footer>
                </div>
                </div>
            </div>
        )
    }
}
