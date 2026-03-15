import { useState, useRef } from "react";
import "../styles/signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    id: "",
    password: "",
    name: "",
    address: "",
    detailAddress: "",
    streetAddress: "",
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

  const [memberType, setMemberType] = useState("personal");

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;

    // 전화번호 숫자만
    if (name === "phone2" || name === "phone3") {
      value = value.replace(/[^0-9]/g, "");
    }
    setForm({
      ...form,
      [name]: value,
    });

    // 자동 이동
    if (name === "phone2" && value.length === 4) {
      phone3Ref.current.focus();
    }
  }

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

  function handleAgreement(e) {
    const name = e.target.name;
    const checked = e.target.checked;
    setAgreement({
      ...agreement,
      [name]: checked,
    });
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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.id.length < 5) {
      alert("- 아이디는 4글자 이상 입력해주세요 -");
      return;
    }
    if (form.password.length < 8) {
      alert("- 비밀번호는 8자 이상 입력해주세요 -");
      return;
    }
    if (!agreement.privacy || !agreement.service) {
      alert("- 필수 약관 동의가 체크되지 않았습니다 -");
      return;
    }
    alert("- 회원가입 완료 -");
  }

  return (
    <div className="signup-page">
      <div className="signup-visual"></div>

      <div className="signup-container">
        <h2 className="signup-title">회원가입</h2>

        <section className="membership-section">
          <p className="membership-title">Membership</p>
          <div className="membership-options">
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
          </div>
        </section>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              name="id"
              value={form.id}
              placeholder="5글자 이상 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="8글자 이상 입력하세요"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Zip Code                 Search"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="detailAddress"
              placeholder="BaseAddress"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="streetAddress"
              placeholder="Street-Address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <div className="phone-row">
              <select name="phone1" value={form.phone1} onChange={handleChange}>
                <option>010</option>
                <option>011</option>
                <option>022</option>
                <option>033</option>
              </select>
              <input
                type="text"
                name="phone2"
                value={form.phone2}
                maxLength="4"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={phone2Ref}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone3"
                value={form.phone3}
                maxLength="4"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={phone3Ref}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </form>

        <section className="birth-section">
          <p className="birth-title">Date of Birth</p>
          <div className="birth-date">
            <input
              type="text"
              name="birthYear"
              placeholder="YYYY"
              value={form.birthYear}
              onChange={handleChange}
            />
            <input
              type="text"
              name="birthMonth"
              placeholder="MM"
              value={form.birthMonth}
              onChange={handleChange}
            />
            <input
              type="text"
              name="birthDay"
              placeholder="DD"
              value={form.birthDay}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="agreement-section">
          <p className="agreement-title">Whole agreement</p>
          <div className="agreement-all">
            <input
              type="checkbox"
              name="all"
              checked={agreement.all}
              onChange={handleAllAgree}
            />
            이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신 (선택) 에 모두
            동의합니다.
          </div>
          {/* 박스 영역 */}
          <div className="agreement-box">
            {/* 개인정보 */}
            <div className="agreement-group">
              <p className="agreement-group-title">
                홈페이지 개인정보 처리 동의
              </p>
              <div className="agreement-item">
                <span className="item-left">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={agreement.privacy}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 개인정보 이용약관
                </span>
                <span className="item-desc">
                  이용자 식별자, 휴대전화번호, 이름, 이메일 주소, 생일 출생연도,
                  <br />
                  암호화된 동일인 식별정보ⓒ
                </span>
                <span className="arrow">›</span>
              </div>
            </div>

            <hr className="agreement-divider" />

            {/* Avie much 서비스 */}
            <div className="agreement-group">
              <p className="agreement-group-title">
                Avie much 서비스 약관 및 개인정보 동의
              </p>
              <div className="agreement-item">
                <span className="item-left">
                  <input
                    type="checkbox"
                    name="service"
                    checked={agreement.service}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 쇼핑몰 이용약관
                </span>
                <span className="arrow">›</span>
              </div>
              <div className="agreement-item">
                <span className="item-left">
                  <input
                    type="checkbox"
                    name="servicePolicy"
                    checked={agreement.servicePolicy}
                    onChange={handleAgreement}
                  />
                  [ 필수 ] 개인정보 수집 및 이용 동의 (필수)
                </span>
                <span className="arrow">›</span>
              </div>
            </div>

            <hr className="agreement-divider" />

            {/* 선택 수신 동의 */}
            <div className="agreement-group">
              <p className="agreement-group-title">
                [ 선택 ] 쇼핑정보 수신 동의
              </p>
              <div className="agreement-item">
                <span className="item-left">SMS 수신을 동의하십니까?</span>
                <span className="item-right">
                  <input
                    type="checkbox"
                    name="sms"
                    checked={agreement.sms}
                    onChange={handleAgreement}
                  />
                  동의함
                </span>
                <span className="arrow">›</span>
              </div>
              <div className="agreement-item">
                <span className="item-left">이메일 수신을 동의하십니까?</span>
                <span className="item-right">
                  <input
                    type="checkbox"
                    name="email"
                    checked={agreement.email}
                    onChange={handleAgreement}
                  />
                  동의함
                </span>
                <span className="arrow">›</span>
              </div>
            </div>
          </div>
        </section>

        <button className="signup-button" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
