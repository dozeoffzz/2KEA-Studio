import React, { useEffect, useState } from "react";
import { Theme } from "../styles/theme";
import styled from "@emotion/styled";
import { useCartStore } from "../stores/useCartStore";
import { authMeApi } from "../apis/authMeApi";
import defaultProfile from "../assets/icons/defaultProfile.svg";
import { NavLink } from "react-router-dom";

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

const NameWrap = styled.div`
  position: absolute;
  top: -35px;
  left: 0;
  font-size: ${Theme.fontsize.desktop.content};
  text-align: left;
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

export default function OrderPage() {
  const [userInfo, setUserInfo] = useState(null);
  // 프로필 이미지 변경을 위한 상태값
  const [profileImg, setProfileImg] = useState(defaultProfile);
  // useCartStore에서 카트 아이템 갯수 가져오기
  const cartItem = useCartStore((state) => state.cartItems);

  // api 연결하기
  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const data = await authMeApi(token);

        if (data.success) {
          // 로컬스토리지에서 주소 가져오기
          const savedAddress = localStorage.getItem("address");
          // 로컬스토리지에서 이미지 저장갑 가져오기
          const savedImg = localStorage.getItem("profileImg");
          // 입력한 주소 또는 기본주소
          setUserInfo({ ...data.userInfo, address: savedAddress || "서울특별시 강남구 테헤란로 123" });
          // 저장한 이미지가 있다면 불러오기
          if (savedImg) {
            setProfileImg(savedImg);
          }
        }
      } catch (error) {
        console.error("false", error);
      }
    }
    fetchUser();
  }, []);
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
            <p>{userInfo?.name || "USER NAME"}</p>
          </NameWrap>

          <img src={profileImg} alt="프로필 이미지" />

          <UserType>*{userInfo?.userType}</UserType>
        </ProfileImg>

        <ProfileInfoWrap>
          <ProfileInfo>
            <p>최근 3개월</p>
          </ProfileInfo>

          <ProfileBuy>
            <p>구매 금액:0</p>
            <p>구매 건수:0</p>
            <p>보유 P:1,220p</p>
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
              <p>배송 중</p>
              <p>0</p>
            </ProfileDelivery>

            <RightArrow>
              <p>&gt;</p>
            </RightArrow>

            <ProfileDeliveryDone>
              <p>배송 완료</p>
              <p>0</p>
            </ProfileDeliveryDone>
          </ProfileStatus>
        </ProfileInfoWrap>
      </ProfileWrap>
    </MyPageContainer>
  );
}
