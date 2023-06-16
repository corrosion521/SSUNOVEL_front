import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import './MyPageNav.css'
import './MyPageStyle.css'

const GetNickName = ({ nickname, setNickname }) => {
    const navigate = useNavigate();

    
    useEffect(() => {
        // if(nickname === ""){
        fetch(`/member`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("회원 정보 :", result.result);
                if (result.message === "로그인 필요") {
                    navigate("/member/login")
                }
                else if (result.message == "성공") {
                    setNickname(result.result.nickname);
                }
            })
        // }
    }, []);
}


export default GetNickName;