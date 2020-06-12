import React,{Component} from 'react'
import API from '../../../utils/API';
import Loading from 'react-loading';
import './RevUpdate.css'

class RevUpdate extends Component 
{
    state = {
        response : [],
        loadStatus : false
    }
    handleSubmit(e){
        e.preventDefault();
        const { match: { params } } = this.props;
      var Review = this.refs.review.value;
      var Rating = this.refs.rating.value;
      var link = '';
      API.patch(`/api/review/${params.id}`,
      {
        Parent:this.state.response.Parent,
        Author:this.state.response.Author,
        Time_stamp: Date.now(),
        Description: Review,
        Difficulty: this.state.response.Difficulty,
        Rating: Rating,
        Votes: {
                up_vote:this.state.response.Votes.up_vote,
                down_vote: this.state.response.Votes.down_vote
        } 
      }
      ).then(response => {
          alert("Review Updated Successfully")
          console.log(response.data);
          link = window.location.href;
          if(link.includes('course'))
          {
            window.location.assign(`/course/${this.state.response.Parent}`) 
          }
          else
          {
            window.location.assign(`/prof/${this.state.response.Parent}`)
          }
      }).catch(error => {
          console.log(error);
      })
    }

    componentDidMount()
    {
        const { match: { params } } = this.props;
        API.get(`/api/review/${params.id}`)
        .then(response => {
            console.log(response.data);
            this.setState({response : response.data,loadStatus : true})
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        var Rating  = [1,2,3,4,5];
        var state  = this.state;
        if(this.state.loadStatus)
        {
            Rating = Rating.map(function(rating){
                if(state.response.Rating === rating)
                {
                    return(
                    <option selected>{rating}</option>
                    )
                }
                else
                {
                    return(
                        <option> {rating} </option>
                    )
                }
            })
        }
        if(this.state.loadStatus === false)
        {
            return(
                <Loading/>
            )
        }
        else
        {
            if(this.state.response.Author !== this.props.current_user._id)
            {
                console.log(this.state.response.Author, this.props.current_user._id)
                return(
                    <div className = "container has-text-centered">
                        <p className ="title has-text-danger is-size-1">40</p>
                        <p className ="subtitle">Forbidden</p>
                    </div>
                )
            }
            else
            {
                return(
                    <div className = "form">
                                          <span className = "is-size-1 has-text-weight-bold has-text-black">Edit your Review</span><br/><br/>
                        <form>
                            {/* <div className="control">
                                <textarea class="textarea is-primary" defaultValue = {this.state.response.Description} ref="review"></textarea>
                            </div> */}
                            <div className="field">
                                <label className="label">Review Body</label>
                                <div className="control">
                                    <textarea className="textarea" placeholder="Review body" defaultValue = {this.state.response.Description} ref="review"></textarea>
                                </div>
                            </div>
                            {/* <div className="select">
                                <select ref = "rating" >
                                    {Rating}
                                </select>
                            </div> */}
                             <div className="field">
                                <label className="label">Overall Rating</label>
                                <div className="control">
                                    <div className="select" >
                                    <select ref = "rating">
                                        {Rating}
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div className = "form-btn"><input onClick = {this.handleSubmit} className = "button is-large is-success is-rounded" type = "submit" value = "Update" /></div>
                        </form>
                    </div>
                )
            
            }
        }
        
        
    }
}
export default RevUpdate;