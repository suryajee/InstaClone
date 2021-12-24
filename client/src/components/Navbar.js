import React ,{useContext,useRef,useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar=()=>{
  const searchModel=useRef(null)
  const [search,setSearch]=useState("")
  const [userDetails,setUserDetails]=useState([])
  const {state,dispatch}=useContext(UserContext)
  const navigate=useNavigate()
  useEffect(()=>{
     M.Modal.init(searchModel.current)
  },[])
  const renderList=()=>{
    if(state){
       return [
             <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
             <li key="2"><Link to="/Profile">Profile</Link></li>,
             <li key="3"><Link to="/create">Create Post</Link></li>,
             <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
             <li key="5">
                <button className="btn #c62828 red darken-3" 
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  navigate("/signin")
                }} >Logout
                </button>
             </li>
         ]
    }else{
       return [
        <li key="6"><Link to="/Signin">Signin</Link></li>,
        <li key="7"><Link to="/Signup">Signup</Link></li>
       ]
    }
  }

    const fetchUsers=(query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
    }

return(
 <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">InstaGram</Link>
      <ul id="nav-mobile" className="right">
          {renderList()}
      </ul>
    </div>

    <div id="modal1" className="modal" ref={searchModel} style={{color:"black"}}>
      <div className="modal-content">
      <input 
          type="text"
          placeholder="search users"
          value={search}
          onChange={(e)=>fetchUsers(e.target.value)}
        />
        <ul className="collection">
        {
          userDetails.map(item=>{
            return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
              M.Modal.getInstance(searchModel.current).close()
              setSearch('')
            }}><li className="collection-item">{item.email}</li></Link>
          })
        }
        
        </ul>
      </div>
      <div className="modal-footer">
        <button  className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
      </div>
    </div>
  </nav>
    )
}


export default NavBar;