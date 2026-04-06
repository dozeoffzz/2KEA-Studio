import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Theme } from "../../styles/theme";
import styled from "@emotion/styled";
import defaultProfile from "../../assets/icons/defaultProfile.svg";
import changeImg from "../../assets/icons/changeImg.svg";

const MyPageContainer = styled.div`
  position: relative;
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.tablet} {
    height: auto;
  }
  ${({ theme }) => theme.media.mobile} {
    height: auto;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  transition: all 0.3s ease;

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
  }
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;

  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    min-width: 250px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
`;

const ProfileBuy = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${Theme.colors.black};
`;

const BuyMoney = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileStatus = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const ProfileCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
    padding: 10px 0;
  }
`;
const ProfileDelivery = styled(ProfileCart)``;
const ProfileDeliveryDone = styled(ProfileCart)``;

const RightArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;

const ProfileImg = styled.div`
  margin-bottom: 65px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }

  &:hover .overlay {
    opacity: 1;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 200px;
    height: 200px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #0c0c0c8d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Theme.colors.white};
  font-size: ${Theme.fontsize.desktop.medium};
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;
const NameWrap = styled.div`
  position: absolute;
  top: -35px;
  left: 0;
  font-size: ${Theme.fontsize.desktop.content};
  text-align: left;
`;
const NameInput = styled.input`
  width: 50%;
  text-align: right;
  outline: 1px solid ${Theme.colors.black};
`;

const UserType = styled.p`
  position: absolute;
  right: -20px;
  bottom: -20px;
  text-align: right;
  font-size: ${Theme.fontsize.desktop.small};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.small};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

export default function MyProfile({ userInfo, orderData, cartItem }) {
  // 프로필 이미지 변경을 위한 상태값
  const [profileImg, setProfileImg] = useState(() => {
    const saved = localStorage.getItem("profileImg");
    if (!saved || !saved.startsWith("data:image")) {
      return defaultProfile;
    }

    return saved;
  });
  const fileInputRef = useRef(null);
  // 이미지 변경 로직
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("이미지는 1MB 이하만 가능합니다.");
      return;
    }

    // edit버튼 클릭 시 input 열기
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string" && result.startsWith("data:image")) {
        setProfileImg(result);
        localStorage.setItem("profileImg", result);
      }
    };
    reader.readAsDataURL(file);
  };
  // 이미지 변경값 저장
  const handleEditClick = () => {
    fileInputRef.current.click();
  };
  return (
    <MyPageContainer>
      <ProfileWrap>
        <ProfileImg>
          <NameWrap>
            <p>{userInfo?.name}</p>
          </NameWrap>
          <img
            src={profileImg || defaultProfile}
            alt="프로필 이미지"
            onError={(e) => (e.target.src = defaultProfile)}
          />
          <Overlay className="overlay" onClick={handleEditClick}>
            <img src={changeImg} style={{ width: "34px", height: "34px" }} />
          </Overlay>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
          <UserType>*{userInfo?.userType}</UserType>
        </ProfileImg>
        <ProfileInfoWrap>
          <ProfileInfo>
            <p>최근 3개월</p>
          </ProfileInfo>
          <ProfileBuy>
            <BuyMoney>
              <p>구매금액</p>
              <p>{orderData.totalPrice.toLocaleString() || 0}</p>
            </BuyMoney>
            <div>|</div>
            <BuyMoney>
              <p>구매수</p>
              <p>{orderData.totalQuantity || 0}</p>
            </BuyMoney>
            <div>|</div>
            <BuyMoney>
              <p>보유 Point</p>
              <p>{orderData.point.toLocaleString() || 0}p</p>
            </BuyMoney>
          </ProfileBuy>
          <ProfileStatus>
            <ProfileCart>
              <p>쇼핑카트</p>
              <p>{cartItem.length}</p>
            </ProfileCart>
            <RightArrow>
              <p>&gt;</p>
            </RightArrow>
            <ProfileDelivery>
              <p>배송중</p>
              <p>{orderData.delivery.inDelivery || 0}</p>
            </ProfileDelivery>
            <RightArrow>
              <p>&gt;</p>
            </RightArrow>
            <ProfileDeliveryDone>
              <p>배송 완료</p>
              <p>{orderData.delivery.done || 0}</p>
            </ProfileDeliveryDone>
          </ProfileStatus>
        </ProfileInfoWrap>
      </ProfileWrap>
    </MyPageContainer>
  );
}
