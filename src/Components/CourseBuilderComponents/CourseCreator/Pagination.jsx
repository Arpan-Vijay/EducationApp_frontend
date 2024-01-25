const Pagination = ({slides , paginate , currentSlideId }) => {
    const numbers = slides.map((slide , index)=>{
        return {
            id:slide.id ,
            number:++index
        }
    })
    
    
    return ( <>
        <nav>
            <ul className="pagination">
                {
                    numbers.map((element)=>{
                        return (
                            <li key={element.id} className={`page-item`}>
                                <a onClick={() => paginate(element.id)} className={`page-link ${currentSlideId === element.id && "bg-primary text-white"}`}>{element.number}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    </> );
}
 
export default Pagination;