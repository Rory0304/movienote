import React from 'react';
import { users } from "../../assets/userDB/users";

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id : "",
            pw : "",
            success : false
        }
        this.inputChange = this.inputChange.bind(this);
        this.loginCheck = this.loginCheck.bind(this);
    }

    inputChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    }

    loginCheck = () => {
        const result = users.some((user) => user.id === this.state.id && user.pw === this.state.pw);
        if(result){
            this.setState({
                success : true
            });
            alert("로그인 성공!");
            window.sessionStorage.setItem("id", this.state.id);
            window.sessionStorage.setItem("PW", this.state.pw);
            window.location.replace("/");
        }
    }

    render(){
        return(
            <div>
                <input type="text" placeholder="아이디" name="id" value={this.state.id} onChange={this.inputChange}/>
                <input type="password" placeholder="비밀번호" name="pw" value={this.state.pw} onChange={this.inputChange}/>
                <button onClick={this.loginCheck}>로그인</button>
            </div>
        )
    }
}

export default Login;