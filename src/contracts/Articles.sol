pragma solidity ^0.5.0;

contract Articles{

    uint public articleCount=0;
    mapping(uint=>Article) public articles;
    struct Article{
        uint id;
        string articles;
        address author;
        uint likes;
        address [] likers;
        uint totalEarned;
        address payable [] payers;
        uint [] payed;
        uint totalPayers;
    }
    event articleCreated(
        uint id,
        string articles,
        address author,
        uint likes,
        address [] likers,
        uint totalEarned,
        address payable [] payers,
        uint [] payed,
        uint totalPayers
    );
    event articleLiked(
        uint id,
        string articles,
        address author,
        uint likes,
        address [] likers,
        uint totalEarned,
        address payable [] payers,
        uint [] payed,
        uint totalPayers
    );
    event articlePayed(
        uint id,
        string articles,
        address author,
        uint likes,
        address [] likers,
        uint totalEarned,
        address payable [] payers,
        uint [] payed,
        uint totalPayers
    );




    function createArticle(string memory _article) public {
        require(bytes(_article).length>0);
        articleCount++;
        
        articles[articleCount]=Article(articleCount,_article,msg.sender,0,new address[](1),0,new address payable [](1),new uint[](1),0);
        emit articleCreated(articleCount,_article,msg.sender,0,new address[](1),0,new address payable [](1),new uint[](1),0);
    }

    function likeArticle(uint _id) public{
        require(_id>0 && _id<=articleCount);
        Article memory _article=articles[_id];
        require(_article.author!=msg.sender);
        address[] memory temp=new address [](_article.likes+2);
        for(uint i=0;i<_article.likes;i++){
            temp[i]=_article.likers[i];
        }
        temp[_article.likes]=msg.sender;
        _article.likers=temp;
        _article.likes++;
        emit articleLiked(_article.id,_article.articles,_article.author,_article.likes,_article.likers,_article.totalEarned,_article.payers,_article.payed,_article.totalPayers);


    }

    function payAuthor(uint _id) payable public{
        require(_id>0 && _id<=articleCount);
        Article memory _article=articles[_id];
        require(_article.author!=msg.sender);
        address payable [] memory temp=new address payable[](_article.totalPayers+2);
        uint [] memory temp1=new uint[](_article.totalPayers+2);

        for(uint i=0;i<_article.totalPayers;i++){
            temp[i]=_article.payers[i];
            temp1[i]=_article.payed[i];
        }
        temp[_article.totalPayers]=msg.sender;
        temp1[_article.totalPayers]=msg.value;
        _article.payers=temp;
        _article.payed=temp1;
        _article.totalPayers++;
        _article.totalEarned+=msg.value;
        emit articlePayed(_article.id,_article.articles,_article.author,_article.likes,_article.likers,_article.totalEarned,_article.payers,_article.payed,_article.totalPayers);

    }


}