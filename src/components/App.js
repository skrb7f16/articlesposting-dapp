import React, {Component} from 'react'
import { useState, useEffect } from 'react'
import Web3 from 'web3';
import Articles from '../abis/Articles.json'
import CreateArticle from './createArticle'
import ShowArticle from './showArticle'


class App extends Component{
  constructor(props){
    super(props)
    this.state={
      loading:false,
      account:'',
      articleCount:0,
      allArticles:[],
    }

    this.createArticleFunction=this.createArticleFunction.bind(this)
    this.payArticle=this.payArticle.bind(this)
    this.likeArticle=this.likeArticle.bind(this)
  }
  async componentDidMount(){
    await this.loadWeb3()
    await this.loadBlockChainData()
  }
  async loadWeb3(){
    if(window.ethereum){
      window.web3=new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3=new Web3(window.web3.currentProvider);

    }
    else{
      console.log("not supported")
    }
  }

  async loadBlockChainData(){
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Articles.networks[networkId]

    if(networkData) {
      const articles = web3.eth.Contract(Articles.abi, networkData.address)
      this.setState({ articles })
      const articleCount = await articles.methods.articleCount().call()
      if(articleCount){
      this.setState({articleCount:parseInt(articleCount.toString())})
      for(var i=1;i<=this.state.articleCount;i++){
        const article=await articles.methods.articles(i).call()
        this.setState({
          allArticles:[...this.state.allArticles,article]
        })
      }
    }
      this.setState({ loading: false})
      
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  async createArticleFunction (articleText) {
    this.setState({loading:true})
    await this.state.articles.methods.createArticle(articleText).send({ from: this.state.account })
    .once('reciept',(reciept)=>{
      this.setState({loading:false})
      console.log(reciept)
    })
    
  }

  async likeArticle(id){
    this.setState({loading:true})
    this.state.articles.methods.likeArticle(id).send({from : this.state.account})
    .once('reciept',(reciept)=>{
      this.setState({loading:false})
      
    })
    .catch(e=>{
      alert(e.message)
      console.log(e)
    })
  }
  async payArticle(id,price){
    this.setState({loading:true})
    console.log(id,price)
    this.state.articles.methods.payAuthor(id).send({from : this.state.account,value:price})
    .once('reciept',(reciept)=>{
      this.setState({loading:false})
      
    })
    .catch(e=>{
      alert(e.message)
    })
  }

  handler(){
    this.componentDidMount()
  }


  render(){
    return (
      <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="_blank">
          Meow Articles
        </a>
        <p
        style={{
          color:'#fff',
          fontSize:'20px',
          margin:'10px'
        }}
        >{this.state.account}</p>
      </nav>
      <CreateArticle createArticleFunction={this.createArticleFunction} />
      <ShowArticle allArticles={this.state.allArticles} payArticle={this.payArticle} likeArticle={this.likeArticle} />
    </div>
    )
  }

}


export default App;











// export default function App() {
//   const [loading, setLoading] = useState(false)
//   const [account, setAccount] = useState('')
//   const [articleCount, setArticleCount] = useState(0);
//   const [articles, setArticles] = useState({})
//   const [allArticles, setAllArticles] = useState([])
//   const [test, setTest] = useState({})

//   useEffect( () => {
//     calling()
//   },[])

//   async function  calling(){
//     await loadWeb3()
//     await loadBlockChainData()
//     await loadAllArticle()
//   }

//   const loadWeb3 = async () => {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum)
//       await window.ethereum.enable();
//     }
//     else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider);

//     }
//     else {
//       console.log("not supported")
//     }
//   }

//   const loadBlockChainData = async () => {
//     const web3 = window.web3
//     // Load account
//     const accounts = await web3.eth.getAccounts()
//     setAccount(accounts[0]);
//     const networkId = await web3.eth.net.getId()
//     const networkData = Articles.networks[networkId]
//     if (networkData) {
//       const articlesContract =  Object(web3.eth.Contract(Articles.abi, networkData.address))
    
//       setArticles(articlesContract)
     
      
//     }
//     else {
//       alert("not connected")
//     }
//   }

//   const createArticleFunction = (articleText) => {
//     setLoading(true)
//     console.log(articles)
//     articles.methods.createArticle(articleText).send({ from: account })
//       .once('reciept', (reciept) => {
//         setLoading(false)
//       })
//       .catch(e => {
//         alert(e.message)
//       })
//   }

//   const loadAllArticle = async () => {
//     const count = await articles.methods.articleCount().call();
//       setArticleCount(parseInt(count.toString()))
//       for (var i = 1; i < articleCount; i++) {
//         const article = await articles.methods.articles(i).call()
//         setAllArticles([...allArticles, article])
//       }
//   }

//   function testing(){
//     setLoading(true)
//     console.log(articles);
//     loadAllArticle()
//     setLoading(false)
//     console.log(allArticles)
//   }
//   return (
//     <div>
//       <nav className="navbar navbar-dark bg-dark">
//         <a className="navbar-brand" href="_blank">
//           Meow Articles
//         </a>
//       </nav>
//       <CreateArticle createArticleFunction={createArticleFunction} testing={testing} allArticles={allArticles} />
//     </div>
//   )
// }
