import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const onSuccess = (res) => {
        console.log("Login Success! Current user: ", res);
        // Xử lý dữ liệu người dùng ở đây (ví dụ: gửi token đến backend)
    };

    const onFailure = (res) => {
        console.log("Login Failed! res: ", res);
    };

    return (
        <div id="signinButton">
            <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
}

export default Login;
