import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";
import SignUpModal from "../components/modals/SignUpModal";
import TermsModal from "../components/modals/TermsModal";
import bgchair from "../assets/imgs/signup/chair.png";

const SignupPage = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 80px 0;

  /* 배경 이미지 */
  background-image: url(${bgchair});
  background-size: cover;
  background-position: right 0%;
  background-attachment: fixed;

  // 체크박스 크기 다 똑같이
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    top: -2px;
  }

  // 태블릿
  ${Theme.media.tablet} {
    padding: 60px 0;
  }

  // 모바일
  ${Theme.media.mobile} {
    padding: 40px 0;
  }
`;

const SignupWrap = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;

  // 태블릿
  ${Theme.media.tablet} {
    gap: 60px;
  }

  // 모바일
  ${Theme.media.mobile} {
    gap: 55px;
    padding: 0 30px;
  }
`;

const SignupTitle = styled.h2`
  width: 100%;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.section};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.section};
  }
`;

// membership form birth agreement 섹션 다 이걸로
const SignupSection = styled.section`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;

  // 태블릿
  ${Theme.media.tablet} {
    max-width: 440px;
    gap: 20px;
  }

  // 모바일
  ${Theme.media.mobile} {
    max-width: 350px;
    gap: 16px;
  }
`;

// 각 섹션 위에 있는 제목들
const SectionTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  margin-bottom: 20px;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
    margin-bottom: 14px;
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    margin-bottom: 10px;
  }
`;

// 개인회원 사업자회원 선택하는 부분
const MemberTypeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 60px;
  font-size: ${Theme.fontsize.desktop.content};
  accent-color: ${Theme.colors.black};

  // 태블릿
  ${Theme.media.tablet} {
    gap: 40px;
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일
  ${Theme.media.mobile} {
    gap: 30px;
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const SignupForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  // 태블릿
  ${Theme.media.tablet} {
    max-width: 440px;
    gap: 30px;
  }

  // 모바일
  ${Theme.media.mobile} {
    max-width: 350px;
    gap: 25px;
  }
`;

// id pw name 이런것들 한줄씩
const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

// error 나면 빨간색으로
const FormLabel = styled.label`
  width: 100px;
  text-align: left;
  font-size: ${Theme.fontsize.desktop.medium};
  color: ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
    width: 80px;
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    width: 70px;
  }
`;

const FormInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  outline: none;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  padding-left: 5px;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.content};
    width: 100%;
  }
`;

// error 멘트 - 빨간색
const ErrorMsg = styled.span`
  width: 100%;
  padding-left: 100px;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.redaccent};
  margin-top: 4px;

  // 태블릿
  ${Theme.media.tablet} {
    padding-left: 90px;
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일
  ${Theme.media.mobile} {
    padding-left: 80px;
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 성공 멘트 - 초록색
const SuccessMsg = styled.span`
  width: 100%;
  padding-left: 100px;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.greenaccent};
  margin-top: 4px;

  // 태블릿
  ${Theme.media.tablet} {
    padding-left: 90px;
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일
  ${Theme.media.mobile} {
    padding-left: 80px;
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 아이디 인풋이랑 중복확인 버튼 묶음
const IdInputWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 중복확인 버튼
const CheckBtn = styled.button`
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  border: 1px solid ${Theme.colors.blacktext};
  padding: 4px 10px;
  white-space: nowrap;
  background: transparent;
  cursor: pointer;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    padding: 3px 6px;
  }
`;

const PhoneWrap = styled.div`
  flex: 1;
  display: flex;
  gap: 15px;
  min-width: 0;

  // 태블릿
  ${Theme.media.tablet} {
    gap: 10px;
  }

  // 모바일
  ${Theme.media.mobile} {
    gap: 8px;
  }
`;

const PhoneSelect = styled.select`
  width: 80px;
  flex: none;
  border: none;
  border-bottom: 1px solid ${Theme.colors.blacktext};
  outline: none;
  padding: 8px 0 8px 5px;
  text-align: center;
  background: transparent;
  font-size: ${Theme.fontsize.desktop.content};

  // 태블릿
  ${Theme.media.tablet} {
    width: 70px;
    font-size: ${Theme.fontsize.tablet.content};
  }
  // 모바일
  ${Theme.media.mobile} {
    width: 60px;
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const PhoneInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  border-bottom: 1px solid ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  outline: none;
  padding: 8px 0 8px 5px;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }
  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 생년월일 인풋 가운데 정렬
const BirthInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  outline: none;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};
  padding: 0 5px;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 생년월일 error 멘트
const BirthMsg = styled.span`
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.redaccent};
  margin-top: 4px;
  text-align: center;
  width: 100%;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const AgreeAllRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  accent-color: ${Theme.colors.black};

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 동의 항목들 감싸는 회색 박스
const AgreeBox = styled.div`
  width: 100%;
  background-color: ${Theme.colors.graybg};
  border-radius: 8px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  // 모바일
  ${Theme.media.mobile} {
    padding: 16px 14px;
    gap: 14px;
  }
`;

const AgreeGroupTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const AgreeItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

// error 나면 빨간색
const AgreeItemLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  font-size: ${Theme.fontsize.desktop.medium};
  color: ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  accent-color: ${Theme.colors.black};

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 개인정보 이용약관 아래 작은 글씨
const AgreeItemDesc = styled.span`
  display: block;
  width: 100%;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.textsecondary};
  padding-left: 24px;
  line-height: 1.5;
  margin-top: 6px;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

// sms 이메일 약관보기 버튼 하나로
const AgreeOptWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AgreeOptLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.blacktext};
  white-space: nowrap;
  accent-color: ${Theme.colors.black};

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

// 약관보기 버튼
const AgreeViewBtn = styled.button`
  font-size: ${Theme.fontsize.desktop.mini};
  color: ${Theme.colors.textsecondary};
  background: transparent;
  text-decoration: underline;
  white-space: nowrap;

  cursor: pointer;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.mini};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const AgreeDivider = styled.hr`
  border: none;
  border-top: 1px solid ${Theme.colors.grayline};
  margin: 0;
`;

// 동의 error 멘트
const AgreeMsg = styled.span`
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.redaccent};
  margin-top: 4px;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const SignupBtn = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.whitetext};
  background-color: ${Theme.colors.blacktext};
  padding: 12px 40px;

  // 태블릿
  ${Theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.content};
    padding: 10px 32px;
  }

  // 모바일
  ${Theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
    padding: 10px 28px;
  }
`;

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    email: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  });

  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);
  const birthMonthRef = useRef(null);
  const birthDayRef = useRef(null);

  // error 나면 해당 섹션으로 스크롤 이동
  const formRef = useRef(null);
  const birthRef = useRef(null);
  const agreeRef = useRef(null);

  // api userType 값이랑 맞춰서 한글로
  const [memberType, setMemberType] = useState("개인회원");

  const [agreement, setAgreement] = useState({
    all: false,
    agreePrivacy: false,
    privacyPolicy: false,
    agreeTerms: false,
    servicePolicy: false,
    sms: false,
    store: false,
    email: false,
  });

  // sign up 버튼 눌렀을때 빈칸이면 빨갛게 표시
  const [errors, setErrors] = useState({
    id: false,
    password: false,
    passwordCheck: false,
    name: false,
    phone2: false,
    phone3: false,
    email: false,
    birthYear: false,
    birthMonth: false,
    birthDay: false,
    agreePrivacy: false,
    agreeTerms: false,
  });

  // 각 에러/성공 멘트
  const [msgs, setMsgs] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    mobile: "",
    email: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    agree: "",
  });

  // 아이디 중복확인 했는지
  const [idChecked, setIdChecked] = useState(false);
  const [idCheckPassed, setIdCheckPassed] = useState(false);

  // 회원가입 완료 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 약관 모달 선택한거 열리게
  const [modalType, setModalType] = useState(null);

  // 아이디 영문 필수, 숫자와 _ 만 허용
  const idRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]+$/;

  // 비밀번호 영문, 숫자, 특수문자 각 1개 이상
  const pwRegex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])/;

  // 이름 한글만 2~10글자
  const nameRegex = /^[가-힣]{2,10}$/;

  // 아이디 중복확인
  async function handleIdCheck() {
    // 빈칸 체크
    if (form.id.trim() === "") {
      setErrors({ ...errors, id: true });
      setMsgs({ ...msgs, id: "아이디를 입력해주세요" });
      setIdChecked(false);
      setIdCheckPassed(false);
      return;
    }

    // 5~10글자
    if (form.id.length < 5 || form.id.length > 10) {
      setErrors({ ...errors, id: true });
      setMsgs({ ...msgs, id: "아이디는 5~10글자로 입력해주세요" });
      setIdChecked(false);
      setIdCheckPassed(false);
      return;
    }

    // 영문 필수, 숫자와 _ 만 허용
    if (!idRegex.test(form.id)) {
      setErrors({ ...errors, id: true });
      setMsgs({ ...msgs, id: "영문이 반드시 포함되어야 합니다" });
      setIdChecked(false);
      setIdCheckPassed(false);
      return;
    }

    // api로 중복확인 요청
    try {
      const res = await fetch("https://api.mylecture.kr/api/team2/auth/check-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });
      // 콘솔로 중복결과 확인
      const data = await res.json();

      if (data.success) {
        // 사용 가능한 아이디
        setErrors({ ...errors, id: false });
        setMsgs({ ...msgs, id: data.message });
        setIdChecked(true);
        setIdCheckPassed(true);
      } else {
        // 중복이거나 금지어 포함
        setErrors({ ...errors, id: true });
        setMsgs({ ...msgs, id: data.message });
        setIdChecked(true);
        setIdCheckPassed(false);
      }
    } catch (error) {
      // 네트워크 오류
      setMsgs({ ...msgs, id: "중복확인 중 오류가 발생했습니다" });
      console.log(error);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;

    // 전화번호 숫자만 입력
    if (name === "phone2" || name === "phone3") {
      value = value.replace(/[^0-9]/g, "");
    }

    // 생년월일도 숫자만
    if (name === "birthYear" || name === "birthMonth" || name === "birthDay") {
      value = value.replace(/[^0-9]/g, "");
    }

    // 생년월일 최대 2026 12 31 까지만
    if (name === "birthYear") {
      if (value.length === 4 && Number(value) > 2026) return;
    }
    if (name === "birthMonth") {
      if (Number(value) > 12) return;
    }
    if (name === "birthDay") {
      if (Number(value) > 31) return;
    }

    // 아이디 비밀번호 이메일 한글 못쓰게
    if (name === "id" || name === "password" || name === "passwordCheck" || name === "email") {
      value = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    // 아이디 스페이스바 못쓰게
    if (name === "id") {
      value = value.replace(/\s/g, "");
    }

    // 이름 한글만 입력
    if (name === "name") {
      value = value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    setForm({ ...form, [name]: value });

    // 아이디 바꾸면 중복확인 초기화되서 다시하게
    if (name === "id") {
      setIdChecked(false);
      setIdCheckPassed(false);
      setMsgs({ ...msgs, id: "" });
    }

    // 비밀번호 확인 - 입력하면서 바로 체크
    if (name === "passwordCheck") {
      if (value === form.password && value !== "") {
        setMsgs({ ...msgs, passwordCheck: "비밀번호가 일치합니다" });
        setErrors({ ...errors, passwordCheck: false });
      } else if (value !== "") {
        setMsgs({ ...msgs, passwordCheck: "비밀번호가 일치하지 않습니다" });
        setErrors({ ...errors, passwordCheck: true });
      } else {
        setMsgs({ ...msgs, passwordCheck: "" });
      }
      return;
    }

    // password 바뀌면 passwordCheck도 다시 체크
    if (name === "password" && form.passwordCheck !== "") {
      if (value !== form.passwordCheck) {
        setMsgs({ ...msgs, passwordCheck: "비밀번호가 일치하지 않습니다" });
        setErrors({ ...errors, passwordCheck: true });
      } else {
        setMsgs({ ...msgs, passwordCheck: "비밀번호가 일치합니다" });
        setErrors({ ...errors, passwordCheck: false });
      }
    }

    // 뭔가 입력하면 error 없애기
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
      setMsgs({ ...msgs, [name]: "" });
    }

    // phone2 4자리 채우면 phone3으로 자동 이동
    if (name === "phone2" && value.length === 4) {
      phone3Ref.current.focus();
    }

    // 생년월일 자동 이동 - year 4자리 채우면 month로
    if (name === "birthYear" && value.length === 4) {
      birthMonthRef.current.focus();
    }

    // 생년월일 자동 이동 - month 2자리 채우면 day로
    if (name === "birthMonth" && value.length === 2) {
      birthDayRef.current.focus();
    }
  }

  // password 타입은 한글 막는게 다르게 동작해서 따로 처리
  function handleComposition(e) {
    if (e.type === "compositionend") {
      const name = e.target.name;
      if (name === "id" || name === "password" || name === "passwordCheck" || name === "email") {
        const value = e.target.value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
        setForm({ ...form, [name]: value });
      }
    }
  }

  function handleAgreement(e) {
    const { name, checked } = e.target;
    setAgreement({ ...agreement, [name]: checked });

    // 체크하면 에러 없애기
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
      setMsgs({ ...msgs, agree: "" });
    }
  }

  function handleAllAgree(e) {
    const checked = e.target.checked;
    setAgreement({
      all: checked,
      agreePrivacy: checked,
      privacyPolicy: checked,
      agreeTerms: checked,
      servicePolicy: checked,
      store: checked,
      // sms, 이메일은 선택 항목이라 전체동의해도 선택 안되게
      sms: false,
      email: false,
    });

    // 전체동의 누르면 동의 관련 error 다 없애기
    if (checked) {
      setErrors({ ...errors, agreePrivacy: false, agreeTerms: false });
      setMsgs({ ...msgs, agree: "" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let hasError = false;
    let newErrors = { ...errors };
    let newMsgs = { ...msgs };

    // 아이디
    if (form.id.trim() === "") {
      newErrors.id = true;
      newMsgs.id = "아이디를 입력해주세요";
      hasError = true;
    } else if (form.id.length < 5 || form.id.length > 10) {
      newErrors.id = true;
      newMsgs.id = "아이디는 5~10글자로 입력해주세요";
      hasError = true;
    } else if (!idRegex.test(form.id)) {
      newErrors.id = true;
      newMsgs.id = "영문이 반드시 포함되어야 합니다";
      hasError = true;
    } else if (!idChecked) {
      newErrors.id = true;
      newMsgs.id = "아이디 중복확인을 해주세요";
      hasError = true;
    } else if (!idCheckPassed) {
      newErrors.id = true;
      hasError = true;
    }

    // 비밀번호 - 8~15글자, 영문/숫자/특수문자 각 1개 이상
    if (form.password.trim() === "") {
      newErrors.password = true;
      newMsgs.password = "비밀번호를 입력해주세요";
      hasError = true;
    } else if (form.password.length < 8 || form.password.length > 15) {
      newErrors.password = true;
      newMsgs.password = "비밀번호는 8~15글자로 입력해주세요";
      hasError = true;
    } else if (!pwRegex.test(form.password)) {
      newErrors.password = true;
      newMsgs.password = "영문, 숫자, 특수문자(!@#$%^&*()_+)를 각 1개 이상씩 포함해주세요";
      hasError = true;
    }

    // 비밀번호 확인
    if (form.passwordCheck.trim() === "") {
      newErrors.passwordCheck = true;
      newMsgs.passwordCheck = "비밀번호를 한번 더 입력해주세요";
      hasError = true;
    } else if (form.password !== form.passwordCheck) {
      newErrors.passwordCheck = true;
      newMsgs.passwordCheck = "비밀번호가 일치하지 않습니다";
      hasError = true;
    }

    // 이름 - 한글만, 2~10글자
    if (form.name.trim() === "") {
      newErrors.name = true;
      newMsgs.name = "이름을 입력해주세요";
      hasError = true;
    } else if (!nameRegex.test(form.name)) {
      newErrors.name = true;
      newMsgs.name = "이름은 한글로 2~10글자 입력해주세요";
      hasError = true;
    }

    // 전화번호
    if (form.phone2.trim() === "") {
      newErrors.phone2 = true;
      newMsgs.mobile = "전화번호를 입력해주세요";
      hasError = true;
    }
    if (form.phone3.trim() === "") {
      newErrors.phone3 = true;
      newMsgs.mobile = "전화번호를 입력해주세요";
      hasError = true;
    }

    // 이메일
    if (form.email.trim() === "") {
      newErrors.email = true;
      newMsgs.email = "이메일을 입력해주세요";
      hasError = true;
    }

    // 생년월일
    if (form.birthYear.length !== 4) {
      newErrors.birthYear = true;
      newMsgs.birthYear = "ex) 2002 · 숫자 4자리로 입력해주세요";
      hasError = true;
    }
    if (form.birthMonth.trim() === "") {
      newErrors.birthMonth = true;
      newMsgs.birthMonth = "ex) 11 · 월을 입력해주세요";
      hasError = true;
    }
    if (form.birthDay.trim() === "") {
      newErrors.birthDay = true;
      newMsgs.birthDay = "ex) 18 · 일을 입력해주세요";
      hasError = true;
    }

    // 이용동의 - api 키 이름으로
    if (!agreement.agreePrivacy) {
      newErrors.agreePrivacy = true;
      newMsgs.agree = "필수 약관에 동의해주세요";
      hasError = true;
    }
    if (!agreement.agreeTerms) {
      newErrors.agreeTerms = true;
      newMsgs.agree = "필수 약관에 동의해주세요";
      hasError = true;
    }

    setErrors(newErrors);
    setMsgs(newMsgs);

    // 하나라도 에러 있으면 스크롤 이동
    if (hasError) {
      if (
        newErrors.id ||
        newErrors.password ||
        newErrors.passwordCheck ||
        newErrors.name ||
        newErrors.phone2 ||
        newErrors.phone3 ||
        newErrors.email
      ) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (newErrors.birthYear || newErrors.birthMonth || newErrors.birthDay) {
        birthRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else if (newErrors.agreePrivacy || newErrors.agreeTerms) {
        agreeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    // 로컬스토리지에 저장
    const userInfo = {
      userType: memberType,
      id: form.id,
      name: form.name,
      mobile: `${form.phone1}-${form.phone2}-${form.phone3}`,
      email: form.email,
      birthdate: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,
      agreeTerms: agreement.agreeTerms,
      agreePrivacy: agreement.agreePrivacy,
      agreeMarketing: agreement.sms || agreement.email,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    setIsModalOpen(true);
  }

  return (
    <SignupPage>
      <SignupWrap>
        <SignupTitle>회원가입</SignupTitle>

        {/* 멤버십 선택 */}
        <SignupSection>
          <SectionTitle>Membership</SectionTitle>
          <MemberTypeBox>
            <label>
              <input
                type="radio"
                name="memberType"
                value="개인회원"
                checked={memberType === "개인회원"}
                onChange={() => setMemberType("개인회원")}
              />
              개인회원
            </label>
            <label>
              <input
                type="radio"
                name="memberType"
                value="사업자회원"
                checked={memberType === "사업자회원"}
                onChange={() => setMemberType("사업자회원")}
              />
              사업자회원
            </label>
          </MemberTypeBox>
        </SignupSection>

        {/* 입력 폼 - ref 달아서 에러시 스크롤 이동 */}
        <SignupForm onSubmit={handleSubmit} ref={formRef}>
          {/* 아이디 - 오른쪽에 중복확인 버튼 */}
          <FormRow>
            <FormLabel error={errors.id}>ID</FormLabel>
            <IdInputWrap>
              <FormInput
                error={errors.id}
                type="text"
                name="id"
                value={form.id}
                placeholder="영문 포함 5~10글자"
                onChange={handleChange}
                onCompositionEnd={handleComposition}
              />
              <CheckBtn type="button" onClick={handleIdCheck}>
                중복확인
              </CheckBtn>
            </IdInputWrap>
            {msgs.id && (idCheckPassed ? <SuccessMsg>{msgs.id}</SuccessMsg> : <ErrorMsg>{msgs.id}</ErrorMsg>)}
          </FormRow>

          {/* 비밀번호 */}
          <FormRow>
            <FormLabel error={errors.password}>Password</FormLabel>
            <FormInput
              error={errors.password}
              type="password"
              name="password"
              value={form.password}
              placeholder="영문, 숫자, 특수문자 포함 8~15글자"
              onChange={handleChange}
              onCompositionEnd={handleComposition}
            />
            {msgs.password && <ErrorMsg>{msgs.password}</ErrorMsg>}
          </FormRow>

          {/* 비밀번호 확인 */}
          <FormRow>
            <FormLabel error={errors.passwordCheck}></FormLabel>
            <FormInput
              error={errors.passwordCheck}
              type="password"
              name="passwordCheck"
              value={form.passwordCheck}
              placeholder="비밀번호를 한번 더 입력하세요"
              onChange={handleChange}
              onCompositionEnd={handleComposition}
            />
            {msgs.passwordCheck &&
              (msgs.passwordCheck === "비밀번호가 일치합니다" ? (
                <SuccessMsg>{msgs.passwordCheck}</SuccessMsg>
              ) : (
                <ErrorMsg>{msgs.passwordCheck}</ErrorMsg>
              ))}
          </FormRow>

          {/* 이름 */}
          <FormRow>
            <FormLabel error={errors.name}>Name</FormLabel>
            <FormInput
              error={errors.name}
              type="text"
              name="name"
              value={form.name}
              placeholder="한글로 2~10글자"
              onChange={handleChange}
            />
            {msgs.name && <ErrorMsg>{msgs.name}</ErrorMsg>}
          </FormRow>

          {/* 전화번호 */}
          <FormRow>
            <FormLabel error={errors.phone2}>Phone</FormLabel>
            <PhoneWrap>
              <PhoneSelect name="phone1" value={form.phone1} onChange={handleChange}>
                <option>010</option>
                <option>011</option>
                <option>022</option>
                <option>033</option>
              </PhoneSelect>
              <PhoneInput
                error={errors.phone2}
                type="text"
                name="phone2"
                value={form.phone2}
                maxLength="4"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={phone2Ref}
                onChange={handleChange}
              />
              <PhoneInput
                error={errors.phone3}
                type="text"
                name="phone3"
                value={form.phone3}
                maxLength="4"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={phone3Ref}
                onChange={handleChange}
              />
            </PhoneWrap>
            {msgs.mobile && <ErrorMsg>{msgs.mobile}</ErrorMsg>}
          </FormRow>

          {/* 이메일 */}
          <FormRow>
            <FormLabel error={errors.email}>Email</FormLabel>
            <FormInput
              error={errors.email}
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              onCompositionEnd={handleComposition}
            />
            {msgs.email && <ErrorMsg>{msgs.email}</ErrorMsg>}
          </FormRow>
        </SignupForm>

        {/* 생년월일 - ref 달아서 에러시 스크롤 이동 */}
        <SignupSection ref={birthRef}>
          <SectionTitle>Date of Birth</SectionTitle>
          <BirthInput
            error={errors.birthYear}
            type="text"
            name="birthYear"
            placeholder="YYYY"
            value={form.birthYear}
            maxLength="4"
            inputMode="numeric"
            onChange={handleChange}
          />
          {msgs.birthYear && <BirthMsg>{msgs.birthYear}</BirthMsg>}
          <BirthInput
            error={errors.birthMonth}
            type="text"
            name="birthMonth"
            placeholder="MM"
            value={form.birthMonth}
            maxLength="2"
            inputMode="numeric"
            ref={birthMonthRef}
            onChange={handleChange}
          />
          {msgs.birthMonth && <BirthMsg>{msgs.birthMonth}</BirthMsg>}
          <BirthInput
            error={errors.birthDay}
            type="text"
            name="birthDay"
            placeholder="DD"
            value={form.birthDay}
            maxLength="2"
            inputMode="numeric"
            ref={birthDayRef}
            onChange={handleChange}
          />
          {msgs.birthDay && <BirthMsg>{msgs.birthDay}</BirthMsg>}
        </SignupSection>

        {/* 이용 동의 - ref 달아서 에러시 스크롤 이동 */}
        <SignupSection ref={agreeRef}>
          <SectionTitle>Whole agreement</SectionTitle>
          <AgreeAllRow>
            <input type="checkbox" name="all" checked={agreement.all} onChange={handleAllAgree} />
            이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신 (선택) 에 모두 동의합니다.
          </AgreeAllRow>

          <AgreeBox>
            {/* 홈페이지 개인정보 처리 동의 */}
            <div>
              <AgreeGroupTitle>
                홈페이지 개인정보 처리 동의
                {/* 약관보기 버튼 */}
                <AgreeViewBtn type="button" onClick={() => setModalType("privacy")}>
                  약관보기
                </AgreeViewBtn>
              </AgreeGroupTitle>
              <AgreeItemRow>
                <AgreeItemLabel error={errors.agreePrivacy}>
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={agreement.agreePrivacy}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 개인정보 이용약관
                </AgreeItemLabel>
              </AgreeItemRow>
              <AgreeItemDesc>
                이용자 식별자, 휴대전화번호, 이름, 이메일 주소, 생일 출생연도, 암호화된 동일인 식별정보ⓒ
              </AgreeItemDesc>
            </div>

            <AgreeDivider />

            {/* 서비스 약관 및 개인정보 동의 */}
            <div>
              <AgreeGroupTitle>
                Avie much 서비스 약관 및 개인정보 동의
                {/* 약관보기 버튼 */}
                <AgreeViewBtn type="button" onClick={() => setModalType("terms")}>
                  약관보기
                </AgreeViewBtn>
              </AgreeGroupTitle>
              <AgreeItemRow>
                <AgreeItemLabel error={errors.agreeTerms}>
                  <input type="checkbox" name="agreeTerms" checked={agreement.agreeTerms} onChange={handleAgreement} />[
                  필수 ] 쇼핑몰 이용약관
                </AgreeItemLabel>
              </AgreeItemRow>
              <AgreeItemRow>
                <AgreeItemLabel error={errors.agreeTerms}>
                  <input
                    type="checkbox"
                    name="servicePolicy"
                    checked={agreement.servicePolicy}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 개인정보 수집 및 이용 동의
                </AgreeItemLabel>
              </AgreeItemRow>
            </div>

            <AgreeDivider />

            {/* 선택 수신 동의 sms */}
            <div>
              <AgreeGroupTitle>
                [ 선택 ] 쇼핑정보 수신 동의
                {/* 약관보기 버튼 */}
                <AgreeViewBtn type="button" onClick={() => setModalType("marketing")}>
                  약관보기
                </AgreeViewBtn>
              </AgreeGroupTitle>

              <AgreeItemRow>
                <span>SMS 수신을 동의하십니까?</span>
                <AgreeOptWrap>
                  <AgreeOptLabel>
                    <input type="checkbox" name="sms" checked={agreement.sms} onChange={handleAgreement} />
                    동의함
                  </AgreeOptLabel>
                </AgreeOptWrap>
              </AgreeItemRow>
              <AgreeItemRow>
                <span>이메일 수신을 동의하십니까?</span>
                <AgreeOptWrap>
                  <AgreeOptLabel>
                    <input type="checkbox" name="email" checked={agreement.email} onChange={handleAgreement} />
                    동의함
                  </AgreeOptLabel>
                </AgreeOptWrap>
              </AgreeItemRow>
            </div>
          </AgreeBox>

          {msgs.agree && <AgreeMsg>{msgs.agree}</AgreeMsg>}
        </SignupSection>

        <SignupBtn onClick={handleSubmit}>Sign Up</SignupBtn>
      </SignupWrap>

      {/* 회원가입 완료 모달 */}
      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/");
        }}
      />
      {/* 약관 모달 선택하면 나오게  */}
      <TermsModal type={modalType} onClose={() => setModalType(null)} />
    </SignupPage>
  );
}
