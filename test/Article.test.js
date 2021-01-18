import {assert} from 'chai'

const Articles=artifacts.require('./Articles.sol')

contract('Articles',([deployer,author,viewer])=>{
    let articles;
    before(async()=>{
        articles=await Articles.deployed()
    })

    describe('articles',async()=>{
        let result,articleCount;
        before(async()=>{
            result=await articles.createArticle("meow meow",{from:author})
            articleCount=await articles.articleCount()
        })

        it('created article',async()=>{
            assert.equal(articleCount,1)
        }) 
        it('liked article',async()=>{
            result=await articles.likeArticle(articleCount,{from:viewer})
            const event=result.logs[0].args
            assert.equal(articleCount.toNumber(),event.id.toNumber(),'id is correct')
            assert.equal(1,event.likes.toNumber(),"likes is equal")
        }) 
        it('payed article',async()=>{
            result=await articles.payAuthor(articleCount,{from:viewer,value:web3.utils.toWei('1','Ether')})
            const event=result.logs[0].args
            assert.equal(articleCount.toNumber(),event.id.toNumber(),'id is correct')
            assert.equal(web3.utils.toWei('1','Ether'),event.totalEarned,"payed")
        }) 
    })
})
