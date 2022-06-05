import {useState, useEffect} from "react";
import {useHistory,useParams} from "react-router-dom";
const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();
    const {id} = useParams();

    const getData = () => {
        fetch('http://localhost:8000/blogs/' + id,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((myJson) => {
            setTitle(myJson.title)
            setBody(myJson.body)
            setAuthor(myJson.author)
        });
    }
    useEffect(() => {
        getData()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {id, title, body, author }

        setIsPending(true)

        fetch('http://localhost:8000/blogs/' + id ,{
            method: 'PUT' ,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log(blog)
            console.log('edit ok')
            setIsPending(false)
            history.go(-1);
            // history.push('/blogs/:id');
        })
    }
    return ( 
        <div className="create">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type="text"
                required
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea 
                className="blog--body"
                required
                value = {body}
                onChange = {(e) => setBody(e.target.value)}
                >
                </textarea>
                <label >Blog author:</label>
                <select 
                value = {author}
                onChange = {(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                    <option value="long">long</option>
                </select>
                {!isPending && <button>Edit Blog</button>}
                {isPending && <button disabled>Editing blog...</button>}
            </form>
        </div>
    );
}

export default Create;