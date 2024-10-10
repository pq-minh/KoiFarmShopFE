import { GoogleLogin } from "@react-oauth/google";

const clientId="481272321702-aj712402ov128i3tupa7bd1g55fg9uie.apps.googleusercontent.com";

// eslint-disable-next-line no-unused-vars
function login(){
    const onSuccess =(res) =>{
        console.log("Login Success! Current user: ", res.profileObj);
    }

    const onFailure =(res) =>{
        console.log("Login Failed! res: ", res);
    }
    return(
        <div id="signinButton">
            <GoogleLogin
               clientId={clientId}
               buttonText="Login"
               onSuccess={onSuccess}
               onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               isSignedIn={true}
            />
        </div>
    )
}