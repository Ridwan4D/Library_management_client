import { useParams } from "react-router-dom";
import useBooks from "../../Hooks/useBooks";

const UpdateBook = () => {
    const {id} = useParams();
    const {books,refetch}= useBooks();
    const updateBook = books.find(book => book?._id === id)
    console.log(updateBook);
    return (
        <div>
            
        </div>
    );
};

export default UpdateBook;