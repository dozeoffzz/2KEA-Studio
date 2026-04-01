import React from "react";
import { NavLink } from "react-router-dom";
import { Theme } from "../../styles/theme";
import styled from "@emotion/styled";

const MyPageContainer = styled.div`
  position: relative;
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;

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
`;

const ProfileInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;

const ProfileInfo = styled.div`
  display: flex;
`;

const ProfileBuy = styled.div`
  padding: 10px 0 20px 0;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid ${Theme.colors.black};
`;

const BuyMoney = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileStatus = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ProfileCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileDelivery = styled(ProfileCart)``;
const ProfileDeliveryDone = styled(ProfileCart)``;

const RightArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
  width: 150px;
  height: 150px;
  border-radius: 50%;

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

  ${({ theme }) => theme.media.tablet} {
    width: 100px;
    height: 100px;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100px;
    height: 100px;
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

const ImgEdit = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  font-size: ${Theme.fontsize.desktop.content};
  color: ${Theme.colors.blacktext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.medium};
  }
`;

const UserType = styled.p`
  position: absolute;
  right: -20px;
  bottom: -20px;
  text-align: right;
  font-size: ${Theme.fontsize.desktop.medium};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.small};
  }
`;
const SideMenu = styled.div`
  position: fixed;
  top: 200px;
  right: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
  min-height: 250px;
  border-top: 1px solid ${Theme.colors.grayline};
  border-bottom: 1px solid ${Theme.colors.grayline};
`;

const SideMenuTap = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Theme.colors.grayline};
`;
const SideMenuReview = styled(SideMenuTap)``;
const SideMenuInsta = styled(SideMenuTap)``;
const SideMenuOut = styled(SideMenuTap)`
  border: none;
`;
const NavLinkTo = styled(NavLink)`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export default function MyProfile({
  userInfo,
  orderData,
  cartItem,
  isEdit,
  editData,
  setEditData,
  profileImg,
  handleEditClick,
  handleImageChange,
  fileInputRef,
}) {
  return (
    <MyPageContainer>
      <SideMenu>
        <SideMenuTap>
          <NavLinkTo to={"/auth/me"}>
            <p>마이페이지</p>
            <p>&gt;</p>
          </NavLinkTo>
        </SideMenuTap>
        <SideMenuTap>
          <NavLinkTo to={"/auth/me/order"}>
            <p>주문내역</p>
            <p>&gt;</p>
          </NavLinkTo>
        </SideMenuTap>
        <SideMenuTap>
          <NavLinkTo to={"/auth/me/review"}>
            <p>리뷰</p>
            <p>&gt;</p>
          </NavLinkTo>
        </SideMenuTap>
        <SideMenuTap>
          <p>인스타그램</p>
          <p>&gt;</p>
        </SideMenuTap>
        <SideMenuOut>
          <p>회원탈퇴</p>
          <p>&gt;</p>
        </SideMenuOut>
      </SideMenu>
      <ProfileWrap>
        <ProfileImg>
          <NameWrap>
            {isEdit ? (
              <NameInput value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            ) : (
              <p>{userInfo?.name}</p>
            )}
          </NameWrap>
          <img src={profileImg} alt="프로필 이미지" onClick={handleEditClick} />
          <Overlay className="overlay">이미지 수정</Overlay>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
          <UserType>*{userInfo?.userType}</UserType>
        </ProfileImg>
        <ProfileInfoWrap>
          <ProfileInfo>
            <p>최근 3개월</p>
          </ProfileInfo>
          <ProfileBuy>
            <BuyMoney>
              <p>구매 금액</p>
              <p>{orderData.totalPrice.toLocaleString() || 0}</p>
            </BuyMoney>
            <BuyMoney>
              <p>구매 건수</p>
              <p>{orderData.totalQuantity || 0}</p>
            </BuyMoney>
            <BuyMoney>
              <p>보유 P</p>
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
