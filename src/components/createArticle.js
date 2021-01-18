import React, { useEffect } from 'react'
import {useState} from 'react'

export default function CreateArticle(props) {
    const [articleText, setArticleText] = useState('')  
    return (
        <div className="container">
            <h1>Create Your Article</h1>
            <br/>
            <br/>
            <br/>
            <form>
                <div className="form-group">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" 
                    placeholder="Enter the article "
                    value={articleText}
                    onChange={e=>setArticleText(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary"
                onClick={e=>{
                    e.preventDefault()
                    props.createArticleFunction(articleText);
                    setArticleText('')
                }}
                >Submit</button>
            </form>
        </div>
    )
}
