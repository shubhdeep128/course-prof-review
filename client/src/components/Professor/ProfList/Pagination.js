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
        for (let i = 1; i <= Math.ceil(this.props.totalProfs / this.props.profsPerPage); i++) {
            pageNumbers.push(i);
        }

        console.log(classStr(this.props.currentPage));
        return(
            <div className = "pageNums has-text-weight-semibold has-text-black">
                <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                <button onClick = {() => {if(this.props.currentPage>1){this.props.paginate(this.props.currentPage-1)}}} className="pagination-previous">Previous</button>
                <button onClick = {() => {if(this.props.currentPage<pageNumbers[pageNumbers.length -1]){this.props.paginate(this.props.currentPage+1)}}} className="pagination-next">Next page</button>
                <ul className="pagination-list">
                    {pageNumbers.map(number => (
                        <li><button onClick = {() => this.props.paginate(number)} className={classStr(number)} aria-label="Goto page 1">{number}</button></li>
                    ))}
                </ul>
            </nav>
            </div>
            


        );
        }
    }
    
export default Pagination;