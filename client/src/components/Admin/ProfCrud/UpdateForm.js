import React,{Component} from 'react';
import API from '../../../utils/API.js';
import OuterContainer from '../../OuterContainer/OuterContainer'

class UpdateForm extends Component {
    state  = {
        loadStatus : false,
        profs : [],
        Relevant_tags : [],
        error : false
    }
    handleSubmit(e){
        e.preventDefault();
        const { match: { params } } = this.props;
        var Name = this.refs.name.value;
        var Description = this.refs.desc.value;
        if(this.state.Relevant_tags.length < 3)
        {
            alert("Minimum 3 tags required!")
        }
        else
        {
        API.patch(`/api/prof/${params.profid}`, {
            Name : Name,
            Description: Description,
            Relevant_tags: this.state.Relevant_tags,
          }).then(function (response) {
            alert("Professor Updated successfully!");
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
        }
      }
      componentDidMount(){
        const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        API.get(`/api/prof/${params.profid}`).then((response) => {
          this.setState({error:false, profs:response.data, loadStatus:true,Relevant_tags:response.data.Relevant_tags});
          console.log(this.state.profs);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
        
      }
      addTag(e){
        e.preventDefault();
        var tag = this.refs.tags.value;
        var tags = this.state.Relevant_tags;
        if (tag=="")
        {
           alert("Tags should not be empty!")
        }
        else
        {
        tags.push(tag)
        this.setState({Relevant_tags : tags})
        console.log(this.state.Relevant_tags);
        this.refs.tags.value = '';
        }
      }
      deleteTag = (key) => {
        var tags = this.state.Relevant_tags;
        tags.splice(key,1);
        this.setState({Relevant_tags : tags})
      }
      

    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        var tags = this.state.Relevant_tags;
        let that = this;
        tags = tags.map(function(tag,key){
          console.log(tag,key)
          return(
            <span class="tag is-medium is-success">
            {tag}
            <button type = "button" onClick = {() =>that.deleteTag(key)} class="delete is-small"></button>
          </span>
          )
        }
        )
        return(
            <div>
                <OuterContainer/>
                {/* <div className="form">
        <form onSubmit={this.handleSubmit}>
        <div>
        <input type="text" placeholder="Name" ref="name" defaultValue = {this.state.profs.Name} required/>
        </div>
        <div> 
        <textarea type="text" placeholder="Description" ref="desc" defaultValue = {this.state.profs.Description} required/>
        </div>
        <div>
        <input type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
                    <div> Existing Tags:{tags} </div>
                    <button onClick = {this.addTag}>Add Tags</button>
        </div>
        <div>
        <input type="submit" value="Update" />
        </div>
      </form>
      </div> */}
      <div class = "form box">
                <form class = "form">
                  <span class = "is-size-1 has-text-weight-bold has-text-black">Update Professor</span><br/><br/>
                    <div class = "field">
                      <label class = "label">Name</label>
                      <div class="control">
                      <input class = "input" defaultValue = {this.state.profs.Name} placeholder = "Name" ref = "name" required/>
                      </div>
                    </div>


                    <div class = "field">
                      <label class = "label">Description</label>
                      <div class = "control">
                        <textarea class = "textarea" defaultValue = {this.state.profs.Description} placeholder = "Description" ref= "desc" required/>
                      </div>
                    </div>

                    <div class = "field">
                      <label class = "label">Relevant Tags</label>
                      <div class = "control">
                        <input class = "input" type = "text" placeholder = "Add Relevant Tags" ref = "tags"/>
                        <br/><br/>
                        <button class = "button is-link is-rounded" onClick = {this.addTag}>Add Tags</button>
                      </div>
                    </div>

                    <div class = "field">
                    
                    <br/><br/>
                    <label class = "label"> Existing Tags:{tags} </label>
                    </div>

                </form>
                <div class = "form-btn"><input onClick = {this.handleSubmit} class = "button is-large is-success is-rounded" type = "submit" value = "Update" /></div>
            </div>
            </div>
        )
    }
}

export default UpdateForm;