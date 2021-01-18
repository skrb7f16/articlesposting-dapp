import React, { useState } from 'react'

export default function ShowArticle(props) {
    const [show, setShow] = useState(false)
    const [price,setPrice]=useState('')
    return (
        <div className="container">
            {props.allArticles.map((value, key) => {
                return (
                    <div className="card" key={key}>
                        <h5 className="card-header">{value.author}</h5>
                        <div className="card-body">
                            <p className="card-text">{value.articles}</p>
                            <button className="btn btn-primary"
                                onClick={
                                    e=>{
                                        e.preventDefault()
                                        props.likeArticle(parseInt(value.id.toString()))
                                        setShow(false)
                                    }
                                }
                            >{value.likes.toString()} Like</button>
                            <button className="ml-2 btn btn-primary" onClick={e=>{
                                setShow(!show)
                            }}> Pay </button>
                            {show ? <form>
                                <div class="form-group">
                                    <input type="number" class="form-control"
                                     id="exampleInputEmail1" 
                                     aria-describedby="emailHelp" 
                                     placeholder="enter amount in eth"
                                     value={price}
                                     onChange={e=>{
                                         setPrice(e.target.value)
                                     }}
                                     />
                                </div>
                                <button type="submit" class="btn btn-primary"
                                onClick={e=>{
                                    e.preventDefault()
                                    props.payArticle(value.id,window.web3.utils.toWei(price,'Ether'))
                                }}
                                >Submit</button>
                            </form> : null}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
