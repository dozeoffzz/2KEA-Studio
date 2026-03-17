import styled from "@emotion/styled";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import loginLight from "../assets/imgs/loginLight.svg";
import loginChair from "../assets/imgs/loginChair.svg";
import { Theme } from "../styles/theme";

const LoginContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
  margin: 60px 0 100px 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 495px;
  min-height: 42px;
  gap: 10px;
  position: relative;
  z-index: 10;
`;

// error 나면 빨간색으로
const LoginInputWrap = styled.div`
  display: flex;
  gap: 40px;
  border-bottom: 1px solid
    ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  font-size: ${Theme.fontsize.desktop.content};
`;

// error 나면 빨간색으로
const InputInfo = styled.p`
  margin-bottom: 10px;
  color: ${({ error }) =>
    error ? Theme.colors.redaccent : Theme.colors.blacktext};
`;

const LoginInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: ${Theme.fontsize.desktop.content};
  margin-bottom: 10px;
  flex: 1;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 30px;
  margin: 40px 0 250px 0;
`;

const LoginButton = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SignupButton = styled(NavLink)`
  font-size: ${Theme.fontsize.desktop.content};
  text-decoration: none;
  color: inherit;
`;

const DesignText = styled.p`
  font-size: ${Theme.fontsize.desktop.section};
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
  const navigate = useNavigate();

  // 로그인 버튼 눌렀을 때 빈칸이면 빨갛게 표시
  const [errors, setErrors] = useState({
    id: false,
    password: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    let cleanValue = value;

    // 아이디 비밀번호 한글 제외
    if (name === "id" || name === "password") {
      cleanValue = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    setInput((prev) => ({ ...prev, [name]: cleanValue }));

    //입력시 에러 없애기 - 회원가입 로직과 동일하게 적용
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // 빈칸이거나 조건 안맞으면 true로 바꿔서 빨갛게 표시
    const newErrors = {
      id: input.id.trim() === "" || input.id.length < 5,
      password: input.password.trim() === "" || input.password.length < 8,
    };
    setErrors(newErrors);

    // 에러가 하나라도 있으면 멈추기
    if (Object.values(newErrors).some((v) => v === true)) {
      return;
    }

    // 로컬스토리지에 저장된 유저 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    // 아이디가 일치할 때만 로그인 성공
    if (storedUser && storedUser.id === input.id) {
      alert(`${storedUser.name}님 환영합니다!`);
      navigate("/");
    } else {
      alert("등록된 정보가 없거나 아이디가 일치하지 않습니다.");
      setErrors({ id: true, password: true });
    }
  }

  return (
    <LoginContainer>
      <Title>Welcome</Title>
      <LoginForm onSubmit={handleSubmit}>
        {/* ID 입력 - 에러 시 스타일 변경 */}
        <LoginInputWrap error={errors.id}>
          <InputInfo error={errors.id}>ID</InputInfo>
          <LoginInput
            name="id"
            type="text"
            placeholder="ID"
            value={input.id}
            onChange={handleChange}
          />
        </LoginInputWrap>

        {/* Password 입력 - 에러 시 스타일 변경 */}
        <LoginInputWrap error={errors.password}>
          <InputInfo error={errors.password}>Password</InputInfo>
          <LoginInput
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
        </LoginInputWrap>

        <ButtonWrap>
          {/* 로그인 버튼 handleSubmit을 통해 검사 후 이동하게 수정 */}
          <LoginButton type="submit">Login</LoginButton>
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
