import LoginForm from "./components/LoginForm";
import logo from "@/assets/images/logo.png";
import "./index.less";
import { useState } from "react";

const Login = () => {
	let [inputState, setLoading] = useState<boolean>(false);
	const toEditMode = () => {
		setLoading(true);
	};

	return (
		<div className="login-container">
			<div className="login-box">
				{inputState ? (
					<div className="login-form">
						<div className="login-logo">
							<img className="login-icon" src={logo} alt="logo" />
							<span className="logo-text">React-Chet</span>
						</div>
						<LoginForm />
					</div>
				) : (
					<div className="login-round">
						<div className="logo-title" onClick={toEditMode}>
							🤘
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
