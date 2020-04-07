import React,{Component} from 'react';
import API from '../../../utils/API.js';

class UpdateForm extends Component {
    state  = {
        loadStatus : false,
        course : [],
        error : false
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        this.setState(this.props.location.state)
        API.get(`/api/course/${params.courseid}`).then((response) => {
          this.setState({error:false, course:response.data, loadStatus:true});
          console.log(response.data);
        }).catch(function (error) {
          console.log("ERROR LOADING DATA");
          console.log(error);
        });
      }
    render(){
        return(
            <div>
                <form >
                    <input value = {this.state.course.Name} />
                    <textarea value = {this.state.course.Description} />
                    <input value = {this.state.course.Current_professor} />
                    <input value = {this.state.course.Average_grade} />
                    <input value = {this.state.course.Rating} />
                    <input type = "submit" value = "Update" />
                </form>
            </div>
        )
    }
}

export default UpdateForm;