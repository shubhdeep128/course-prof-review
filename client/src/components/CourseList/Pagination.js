import React, {Component} from 'react'

class Pagination extends Component{

    render(){
        const pageNumbers = [];
        const classStr = (number)=>{
            if(this.props.currentPage === number){
                return "pagination-link is-current";
            }
            else{
                return "pagination-link";
            }
        }
        for (let i = 1; i <= Math.ceil(this.props.totalCourses / this.props.coursesPerPage); i++) {
            pageNumbers.push(i);
        }

        console.log(classStr(this.props.currentPage));
        return(
            <div class = "pageNums has-text-weight-semibold has-text-black">
                <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
                <a onClick = {() => {if(this.props.currentPage>1){this.props.paginate(this.props.currentPage-1)}}} class="pagination-previous">Previous</a>
                <a onClick = {() => {if(this.props.currentPage<pageNumbers[pageNumbers.length -1]){this.props.paginate(this.props.currentPage+1)}}} class="pagination-next">Next page</a>
                <ul class="pagination-list">
                    {pageNumbers.map(number => (
                        <li><a onClick = {() => this.props.paginate(number)} class={classStr(number)} aria-label="Goto page 1">{number}</a></li>
                    ))}
                </ul>
            </nav>
            </div>
            


        );
        }
    }
    
export default Pagination;