import BookItem from "./placeItem";

function Books(props){

    return props.myBooks.map(
        (book)=>{
            return <BookItem myBook={book} key={book._id} Reload={()=>{props.ReloadData();}}></BookItem>
        }
    );

}

export default Books;