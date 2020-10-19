import React, {useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Card} from 'react-bootstrap';
import jwt from 'jsonwebtoken';
// importing comments component
import Comments from './comments';
// functions to dispatch for api calls
import {getBlog, DeleteBlog} from '../../redux/actions/blogs';
import {GetVotes, addVote,removeVote} from '../../redux/actions/votes';
import {getComments} from '../../redux/actions/comments';
// heart icons
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import '../../css/home.css';

//Blog Detail component
const Detail = (props) => {
    //data of user
    const data = jwt.decode(localStorage.jwtToken);
    //getting blogid from localstorage
    var blogid = props.location.state.blog_id;
    // getting the data from backend
    const blog = useSelector( state => state.blogReducer.blogDetail);
    // checking if the current user has liked this blog or not
    var isliked = useSelector( state => state.votesReducer.isliked);
    // total number of likes the selected blog has got
    var vote = useSelector( state => state.votesReducer.votes);
    // for changing state and updating component only
    const [votes,setVotes] = useState(0);
    const [profileNav, setProfileNav] = useState(false);
    // storing blog and author id to pass as props in Redirect component
    const [author,setAuthor] = useState();

    console.log('Checking vote in blog-detail:- ' + vote);
    console.log("In blog isliked:- " + isliked);
    // initializing dispatch function
    const dispatch = useDispatch();
    // defining the foll var to pass props to comments component
    const propsData={
        blog_id:blogid,
        user_id:data.id
    };

    // running functions on loading and updating the component
    useEffect( () => {
        dispatch(getBlog(blogid));
        dispatch(getComments(blogid));
        dispatch(GetVotes(blogid,data.id));
        setVotes(vote);
        // return function cleanup() {
        //     localStorage.removeItem('blogid');
        // };
    }, [votes]);

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this blog?')){
            dispatch(DeleteBlog(blogid));
        }
    };

    // adding the like to the backend
    const handleVote = (e) => {
        isliked = true;
        setVotes(vote+1);
        dispatch(addVote(data.id,blogid));
    };

    // unvoting the blog 
    const handleUnvote = (e) => {
        isliked = false;
        setVotes(vote-1);
        dispatch(removeVote(data.id,blogid));
    };

    const handleProfileClick = (id,e) => {
        setAuthor(id)
        //localStorage.setItem('userid', id);
        setProfileNav(true);
    };

    // if user clicked on username then redirecting to user-profile
    if(profileNav){
        return < Redirect to ={ {
            pathname: '/profile',
            state: { user_id: author }
          }} 
          />;
    }


    return (
        <div className='blogs-detail'>
            <Card className="text-center blog-card" key={blog._id} bg='info'>
                <Card.Header className='card-title-home' onClick={(e) => handleProfileClick(blog.user_id,e)}>@{blog.author}</Card.Header>
                <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className='card-text'>
                {blog.content}
                </Card.Text>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'left' }}>
                    { !isliked && <FaRegHeart className='blog-detail-icon'  onClick={handleVote} />}&nbsp;
                    { isliked && <FaHeart className='blog-detail-icon' onClick={handleUnvote} />}&nbsp;
                    <span>{vote}</span>
                    { (data.id === blog.user_id) && <MdDelete className='blog-detail-icon delete' onClick={handleDelete}/>}
                </Card.Footer>
            </Card><br/>

            <Comments data={propsData}/>
        </div>
    );
};

export default Detail;