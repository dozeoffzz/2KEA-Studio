import { useState, useRef } from "react";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";
import SignUpModal from "../components/modals/SignUpModal";

const SignupPage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 80px 0;

  // 체크박스 크기 다 똑같이
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    top: -2px;
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
`;

const SignupTitle = styled.h2`
  width: 100%;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.section};
  color: ${Theme.colors.blacktext};
`;

// membership form birth agreement 섹션 다 이걸로
const SignupSection = styled.section`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
`;

// 각 섹션 위에 있는 제목들
const SectionTitle = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  margin-bottom: 20px;
`;

// 개인회원 사업자회원 선택하는 부분
const MemberTypeBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 60px;
  font-size: ${Theme.fontsize.desktop.content};
`;

const SignupForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

// id pw name 이런것들 한줄씩
const FormRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

// error 나면 빨간색으로
const FormLabel = styled.label`
  width: 100px;
  text-align: left;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${({ error }) =>
    error ? Theme.colors.redaccent : Theme.colors.blacktext};
`;

const FormInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid
    ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  outline: none;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  padding-left: 5px;
`;

const PhoneWrap = styled.div`
  flex: 1;
  display: flex;
  gap: 15px;
`;

const PhoneSelect = styled.select`
  flex: 1;
  border: none;
  border-bottom: 1px solid ${Theme.colors.blacktext};
  outline: none;
  padding: 8px 0 8px 5px;
  text-align: center;
  background: transparent;
  font-size: ${Theme.fontsize.desktop.content};
`;

const PhoneInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid
    ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  outline: none;
  padding: 8px 0 8px 5px;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};
`;

// 생년월일 인풋 가운데 정렬
const BirthInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid
    ${({ error }) => (error ? Theme.colors.redaccent : Theme.colors.blacktext)};
  outline: none;
  text-align: center;
  font-size: ${Theme.fontsize.desktop.content};
  padding: 0 5px;
`;

const AgreeAllRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
`;

// 동의 항목들 감싸는 회색 박스
const AgreeBox = styled.div`
  width: 100%;
  background-color: #f5f5f3;
  border-radius: 8px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AgreeGroupTitle = styled.p`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};
  margin-bottom: 10px;
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
  font-size: ${Theme.fontsize.desktop.content};
  color: ${({ error }) =>
    error ? Theme.colors.redaccent : Theme.colors.blacktext};
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
`;

// sms 이메일 동의함이랑 화살표 묶음
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
`;

const AgreeArrow = styled.span`
  font-size: 18px;
  color: ${Theme.colors.textsecondary};
  flex-shrink: 0;
`;

const AgreeDivider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 0;
`;

const SignupBtn = styled.button`
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.whitetext};
  background-color: ${Theme.colors.blacktext};
  padding: 12px 40px;
`;

export default function Signup() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    email: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    agree: false,
  });

  const phone2Ref = useRef(null);
  const phone3Ref = useRef(null);
  const birthMonthRef = useRef(null);
  const birthDayRef = useRef(null);

  // 에러 나면 해당 섹션으로 스크롤 이동
  const formRef = useRef(null);
  const birthRef = useRef(null);
  const agreeRef = useRef(null);

  const [memberType, setMemberType] = useState("personal");

  const [agreement, setAgreement] = useState({
    all: false,
    privacy: false,
    privacyPolicy: false,
    service: false,
    servicePolicy: false,
    sms: false,
    store: false,
    email: false,
  });

  // sign up 버튼 눌렀을때 빈칸이면 빨갛게 표시
  const [errors, setErrors] = useState({
    id: false,
    password: false,
    name: false,
    phone2: false,
    phone3: false,
    email: false,
    birthYear: false,
    birthMonth: false,
    birthDay: false,
    privacy: false,
    service: false,
  });

  // 회원가입 완료 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    // 아이디 비밀번호 이메일 한글 못쓰게
    if (name === "id" || name === "password" || name === "email") {
      value = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    }

    setForm({ ...form, [name]: value });

    // 뭔가 입력하면 에러 없애기
    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
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
      if (name === "id" || name === "password" || name === "email") {
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
    }
  }

  function handleAllAgree(e) {
    const checked = e.target.checked;
    setAgreement({
      all: checked,
      privacy: checked,
      privacyPolicy: checked,
      service: checked,
      servicePolicy: checked,
      store: checked,
      sms: checked,
      email: checked,
    });

    // 전체동의 누르면 동의 관련 에러 다 없애기
    if (checked) {
      setErrors({ ...errors, privacy: false, service: false });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // 빈칸이거나 조건 안맞으면 true로 바꿔서 빨갛게 표시
    const newErrors = {
      id: form.id.length < 5,
      password: form.password.length < 8,
      name: form.name.trim() === "",
      phone2: form.phone2.trim() === "",
      phone3: form.phone3.trim() === "",
      email: form.email.trim() === "",
      birthYear: form.birthYear.trim() === "",
      birthMonth: form.birthMonth.trim() === "",
      birthDay: form.birthDay.trim() === "",
      privacy: !agreement.privacy,
      service: !agreement.service,
    };
    setErrors(newErrors);

    // 하나라도 에러 있으면 첫번째 에러 위치로 스크롤 이동
    if (Object.values(newErrors).some((v) => v === true)) {
      // 폼 에러면 폼으로
      if (
        newErrors.id ||
        newErrors.password ||
        newErrors.name ||
        newErrors.phone2 ||
        newErrors.phone3 ||
        newErrors.email
      ) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        // 생년월일 에러면 생년월일로
      } else if (
        newErrors.birthYear ||
        newErrors.birthMonth ||
        newErrors.birthDay
      ) {
        birthRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // 동의 에러면 동의로
      } else if (newErrors.privacy || newErrors.service) {
        agreeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    // 로컬스토리지에 저장 - 비밀번호 빼고 저장
    const userInfo = {
      id: form.id,
      name: form.name,
      phone: `${form.phone1}-${form.phone2}-${form.phone3}`,
      email: form.email,
      birth: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,
      memberType: memberType,
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
                value="personal"
                checked={memberType === "personal"}
                onChange={() => setMemberType("personal")}
              />
              개인회원
            </label>
            <label>
              <input
                type="radio"
                name="memberType"
                value="business"
                checked={memberType === "business"}
                onChange={() => setMemberType("business")}
              />
              사업자회원
            </label>
          </MemberTypeBox>
        </SignupSection>

        {/* 입력 폼 - ref 달아서 에러시 스크롤 이동 */}
        <SignupForm onSubmit={handleSubmit} ref={formRef}>
          <FormRow>
            <FormLabel error={errors.id}>ID</FormLabel>
            <FormInput
              error={errors.id}
              type="text"
              name="id"
              value={form.id}
              placeholder="5글자 이상 입력하세요"
              onChange={handleChange}
              onCompositionEnd={handleComposition}
            />
          </FormRow>
          <FormRow>
            <FormLabel error={errors.password}>Password</FormLabel>
            <FormInput
              error={errors.password}
              type="password"
              name="password"
              value={form.password}
              placeholder="8글자 이상 입력하세요"
              onChange={handleChange}
              onCompositionEnd={handleComposition}
            />
          </FormRow>
          <FormRow>
            <FormLabel error={errors.name}>Name</FormLabel>
            <FormInput
              error={errors.name}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <FormLabel error={errors.phone2}>Phone</FormLabel>
            <PhoneWrap>
              <PhoneSelect
                name="phone1"
                value={form.phone1}
                onChange={handleChange}
              >
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
          </FormRow>
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
        </SignupSection>

        {/* 이용 동의 - ref 달아서 에러시 스크롤 이동 */}
        <SignupSection ref={agreeRef}>
          <SectionTitle>Whole agreement</SectionTitle>
          <AgreeAllRow>
            <input
              type="checkbox"
              name="all"
              checked={agreement.all}
              onChange={handleAllAgree}
            />
            이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신 (선택) 에 모두
            동의합니다.
          </AgreeAllRow>

          <AgreeBox>
            {/* 홈페이지 개인정보 처리 동의 */}
            <div>
              <AgreeGroupTitle>홈페이지 개인정보 처리 동의</AgreeGroupTitle>
              <AgreeItemRow>
                <AgreeItemLabel error={errors.privacy}>
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={agreement.privacy}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 개인정보 이용약관
                </AgreeItemLabel>
                <AgreeArrow>›</AgreeArrow>
              </AgreeItemRow>
              <AgreeItemDesc>
                이용자 식별자, 휴대전화번호, 이름, 이메일 주소, 생일 출생연도,
                <br />
                암호화된 동일인 식별정보ⓒ
              </AgreeItemDesc>
            </div>

            <AgreeDivider />

            {/* 서비스 약관 및 개인정보 동의 */}
            <div>
              <AgreeGroupTitle>
                Avie much 서비스 약관 및 개인정보 동의
              </AgreeGroupTitle>
              <AgreeItemRow>
                <AgreeItemLabel error={errors.service}>
                  <input
                    type="checkbox"
                    name="service"
                    checked={agreement.service}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 쇼핑몰 이용약관
                </AgreeItemLabel>
                <AgreeArrow>›</AgreeArrow>
              </AgreeItemRow>
              <AgreeItemRow>
                <AgreeItemLabel error={errors.service}>
                  <input
                    type="checkbox"
                    name="servicePolicy"
                    checked={agreement.servicePolicy}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 개인정보 수집 및 이용 동의 (필수)
                </AgreeItemLabel>
                <AgreeArrow>›</AgreeArrow>
              </AgreeItemRow>
            </div>

            <AgreeDivider />

            {/* 선택 수신 동의 - sms 이메일 */}
            <div>
              <AgreeGroupTitle>[ 선택 ] 쇼핑정보 수신 동의</AgreeGroupTitle>
              <AgreeItemRow>
                <span>SMS 수신을 동의하십니까?</span>
                <AgreeOptWrap>
                  <AgreeOptLabel>
                    <input
                      type="checkbox"
                      name="sms"
                      checked={agreement.sms}
                      onChange={handleAgreement}
                    />
                    동의함
                  </AgreeOptLabel>
                  <AgreeArrow>›</AgreeArrow>
                </AgreeOptWrap>
              </AgreeItemRow>
              <AgreeItemRow>
                <span>이메일 수신을 동의하십니까?</span>
                <AgreeOptWrap>
                  <AgreeOptLabel>
                    <input
                      type="checkbox"
                      name="email"
                      checked={agreement.email}
                      onChange={handleAgreement}
                    />
                    동의함
                  </AgreeOptLabel>
                  <AgreeArrow>›</AgreeArrow>
                </AgreeOptWrap>
              </AgreeItemRow>
            </div>
          </AgreeBox>
        </SignupSection>

        <SignupBtn onClick={handleSubmit}>Sign Up</SignupBtn>
      </SignupWrap>

      {/* 회원가입 완료 모달 */}
      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </SignupPage>
  );
}
