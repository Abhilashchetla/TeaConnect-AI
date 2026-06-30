import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [user,setUser]=useState({});

    useEffect(()=>{

        loadProfile();

    },[]);

    const loadProfile=async()=>{

        const res=await API.get("/users/profile/1/");

        setUser(res.data);

    };

    return(

        <div>

            <h1>My Profile</h1>

            <h3>Name : {user.name}</h3>

            <p>Email : {user.email}</p>

            <p>Phone : {user.phone}</p>

            <p>Role : {user.role}</p>

        </div>

    );

}

export default Profile;