import styled from "@emotion/styled";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import loginLight from "../assets/imgs/loginLight.svg";
import loginChair from "../assets/imgs/loginChair.svg";

const LoginContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 32px;
  margin: 60px 0 100px 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 495px;
  min-height: 42px;
  gap: 10px;
`;

const LoginInputWrap = styled.div`
  display: flex;
  gap: 40px;
  border-bottom: 1px solid #0c0c0c;
  font-size: 24px;
`;

const InputInfo = styled.p`
  margin-bottom: 9px;
`;

const LoginInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 24px;
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 30px;
  margin: 40px 0 250px 0;
`;

const LoginButton = styled.button`
  font-size: 24px;
`;

const SignupButton = styled(NavLink)`
  font-size: 24px;
`;

const DesignText = styled.p`
  font-size: 32px;
  text-align: center;
`;

const LightImg = styled.img`
  position: absolute;
  top: 0;
  left: 150px;
  opacity: 30%;
`;

const ChairImg = styled.img`
  position: absolute;
  bottom: 100px;
  right: 200px;
  opacity: 30%;
`;
export default function LoginPage() {
  const [input, setInput] = useState({ id: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.id || !input.password) return;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <LoginContainer>
      <Title>Welcome</Title>
      <LoginForm onSubmit={handleSubmit}>
        <LoginInputWrap>
          <InputInfo>ID</InputInfo>
          <LoginInput name="id" type="text" placeholder="ID" value={input.id} onChange={handleChange} />
        </LoginInputWrap>
        <LoginInputWrap>
          <InputInfo>Password</InputInfo>
          <LoginInput
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
        </LoginInputWrap>
        <ButtonWrap>
          <LoginButton type="submit">
            <NavLink to={"/"}>Login</NavLink>
          </LoginButton>
          <SignupButton to={"/signup"}>Sign Up</SignupButton>
        </ButtonWrap>
      </LoginForm>
      <DesignText>
        It's furniture that makes up space, <br />
        and sensuous furniture is everything.
      </DesignText>
      <LightImg src={loginLight} />
      <ChairImg src={loginChair} />
    </LoginContainer>
  );
}
