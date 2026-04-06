import React, { useEffect, useRef, useState } from "react";
import OrderRatingStar from "./OrderRatingStar";
import styled from "@emotion/styled";
import { Theme } from "../../styles/theme";
import { useAuthStore } from "../../stores/useAuthStore";

const OrderReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 930px;
  height: auto;
  padding: 21px 18px;
  background-color: ${Theme.colors.white};
  border: 1px solid ${Theme.colors.black};

  ${({ theme }) => theme.media.mobile} {
    max-width: 100%;
    padding: 24px 14px 5px;
    gap: 2px;
  }
`;

const OrderTitleWrap = styled.div`
  display: flex;
  gap: 20px;

  ${({ theme }) => theme.media.tablet} {
    p {
      font-size: ${Theme.fontsize.tablet.content};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-align: center;

    p:first-of-type {
      font-size: 14px;
    }

    p:last-of-type {
      font-size: 16px;
    }
  }
`;

const ReviewRatingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 28px;
  }
`;

const ReviewTitle = styled.input`
  width: 400px;
  height: 30px;
  padding: 5px 20px;
  outline: none;
  border-top: 1px solid ${Theme.colors.grayline};
  border-bottom: 1px solid ${Theme.colors.grayline};
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }

  @media screen and (max-width: 850px) {
    width: 300px;
    transition: 0.45s ease;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 38px;
    padding: 8px 10px;
    font-size: 13px;
    border-bottom: none;
  }
`;

const ReviewPhotoWarp = styled(ReviewRatingWrap)`
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    gap: 0px;
  }
`;

const PhotoWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 235px;
  border: 1px solid ${Theme.colors.grayline};
  border-width: 1px 0;

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 160px;
  }
`;

const AddPhotoButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 13px;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  border: 1px solid ${Theme.colors.black};
  z-index: 10;

  input {
    display: none;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100px;
    height: 100px;
    gap: 6px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const UploadedPhoto = styled.p`
  color: ${Theme.colors.black};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${Theme.fontsize.tablet.medium};
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: ${Theme.fontsize.mobile.mini};
  }
`;

const UploadPhotoWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 400px;
  height: auto;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet} {
    width: 380px;
    gap: 10px;
  }
`;

const PreviewPhotoWrap = styled.div`
  position: relative;
  width: calc((100% - 40px) / 3);
  height: 150px;
  flex-shrink: 0;

  ${({ theme }) => theme.media.tablet} {
    width: calc((100% - 20px) / 3);
  }
`;

const PreviewPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
`;

const PhotoDeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  color: ${Theme.colors.blacktext};
  background-color: ${Theme.colors.white};
  font-size: 14px;
`;

const ReviewText = styled.textarea`
  width: 400px;
  height: 235px;
  padding: 5px 20px;
  border: 1px solid ${Theme.colors.grayline};
  border-width: 1px 0;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${Theme.fontsize.desktop.medium};
  }

  ${({ theme }) => theme.media.tablet} {
    &::placeholder {
      font-size: ${Theme.fontsize.tablet.medium};
    }
  }

  @media screen and (max-width: 850px) {
    width: 300px;
    transition: 0.45s ease;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    height: 140px;
    padding: 12px 10px;
    font-size: 13px;

    &::placeholder {
      font-size: 13px;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;

  ${({ theme }) => theme.media.mobile} {
    justify-content: flex-end;
    margin-top: 4px;
  }
`;

const CompleteButton = styled.button`
  width: 60px;
  height: 20px;
  background-color: ${Theme.colors.black};
  color: ${Theme.colors.whitetext};
  font-size: ${Theme.fontsize.desktop.small};

  ${({ theme }) => theme.media.mobile} {
    width: 52px;
    height: 18px;
    font-size: 11px;
  }
`;

const ErrorMagWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const TextErrorWrap = styled(ErrorMagWrap)`
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const ErrorMsg = styled.p`
  position: absolute;
  top: 100%;
  left: 10px;
  font-size: ${Theme.fontsize.desktop.small};
  color: ${Theme.colors.redaccent};
`;

export default function OrderReview({ item, onComplete, editingReview }) {
  const [rating, setRating] = useState(editingReview?.rating || 0); //별점
  const [title, setTitle] = useState(editingReview?.title || ""); //리뷰 제목
  const [content, setContent] = useState(editingReview?.content || ""); //리뷰 본문
  const [images, setImages] = useState(editingReview?.images || []); // 이미지를 Base64 인코딩으로 문자열로 변환후 담을 배열
  const [errors, setErrors] = useState({
    rating: false,
    input: false,
  }); // 에러메시지 상태
  const { userInfo } = useAuthStore(); // 로그인 유저 정보 가져오기
  const photoRef = useRef(null); // 사진 업로드 버튼 조작을 위한 리모컨

  useEffect(() => {
    setRating(editingReview?.rating || 0);
    setTitle(editingReview?.title || "");
    setContent(editingReview?.content || "");
    setImages(editingReview?.images || []);
  }, [editingReview]);

  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const contentChange = (e) => {
    setContent(e.target.value);
  };
  const handleRatingChange = (value) => {
    setRating(value);
  };

  //별점 설정시 에러 삭제
  useEffect(() => {
    if (rating > 0 && errors.rating) {
      setErrors((prev) => ({ ...prev, rating: false }));
    }
  }, [rating]);

  //내용과 제목이 채워지면 에러 삭제
  useEffect(() => {
    if (title.trim() && content.trim() && errors.input) {
      setErrors((prev) => ({ ...prev, input: false }));
    }
  }, [title, content]);

  //사진 추가 버튼 클릭 로직
  const handlePhotoClick = () => {
    photoRef.current.click();
  };

  // 로컬스토리지는 문자열만 저장이 가능함
  // 때문에 이미지를 Base64 인코딩으로 문자열로 변환 후 저장
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    //파일이 없거나 이미 5장 이상이면 함수 종료
    if (!file || images.length >= 5) return;

    // 파일 타입 검증 (이미지 파일만 허용)
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일을 가져오는 비동기 도구
    const reader = new FileReader();
    // 가져온 파일을 Base64 문자열로 읽기 시작
    reader.readAsDataURL(file);
    // 성공적으로 파일을 읽었을 때 실행되는 이벤트
    reader.onload = (event) => {
      // 메모리 상에 가상의 img 태그 생성
      const img = new Image();
      // 읽어낸 Base64 데이터를 이미지 소스로 설정
      img.src = event.target.result;

      // 이미지 소스가 완전히 로드된 이후 압축 작업
      img.onload = () => {
        // 메모리 상에 가상의 캔버스 생성 (화면엔 안보임)
        const canvas = document.createElement("canvas");
        // 평면 그림을 그릴 도구 호출
        const ctx = canvas.getContext("2d");

        // 이미지 리사이징
        const MAX_WIDTH = 400; // 이미지의 최대 너비 (용량 압축 핵심)
        const scaleSize = MAX_WIDTH / img.width; // 원본 이미지 대비 축소 비율 계산
        // 계산된 비율에 맟춰 캔버스 크기 재설정
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        // 원본 이미지를 설정된 크기에 맞춰 캔버스에 재구성
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 캔버스에 그려진 이미지를 image/jpeg 형식으로 변환
        // 압축 품질을 0.6(60%) 로 설정해 용량을 대폭 낮춤
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);

        //상태 업데이트
        setImages((prev) => {
          if (prev.length >= 5) return prev; //중복 방지
          return [...prev, compressedBase64]; //최신 상태의 이미지 배열에 저장
        });
      };
      // 이미지 로드 실패 시 에러 처리
      img.onerror = () => {
        console.error("이미지 로드 중 오류가 발생했습니다.");
      };
    };
    // 같은 파일 다시 올릴수 있게 input 값 초기화
    e.target.value = "";
  };

  // 올린 사진 삭제하기
  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  //리뷰 데이터 로컬스토리지 저장 로직
  const handleComplete = () => {
    //유효성 검사
    const isRatingError = rating === 0;
    const isInputError = !title.trim() || !content.trim();

    //에러 발생시 함수 종료
    if (isRatingError || isInputError) {
      setErrors({
        rating: isRatingError,
        input: isInputError,
      });
      return;
    }

    //리뷰 작성 사용자 확인
    if (!confirm("리뷰를 등록하시겠습니까?")) {
      return; // 취소를 누르면 함수 종료
    }

    try {
      //리뷰 내역 불러오기
      const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

      const reviewData = {
        id: editingReview?.id || crypto.randomUUID(), // 고유 ID (상품 ID는 중복가능성이 높기 때문에 랜덤 UUID로 고유 ID 설정)
        orderId: item.orderId,
        productId: item.id, // 상품 ID
        name: item.name, // 상품 이름
        rating: rating, // 별점
        title: title, // 리뷰 제목
        content: content, // 리뷰 내용
        date: new Date().toISOString().split("T")[0], // 리뷰 작성 날짜
        orderDate: item.orderDate, // 상품 구매 날짜
        author: userInfo.name, // 작성자 이름
        images: images, // 이미지
      };

      // 작성한 리뷰 추가 및 로컬스토리지 저장
      const updatedReviews = [reviewData, ...existingReviews];

      localStorage.setItem("reviews", JSON.stringify(updatedReviews));

      // 저장에 성공했을 때만 부모에게 알리고 창 닫기
      if (onComplete) {
        onComplete(item.id, item.orderDate);
      }

      //저장 후 모든 상태 초기화
      setRating(0);
      setTitle("");
      setContent("");
      setErrors({ rating: false, input: false });
      setImages([]);
    } catch (error) {
      console.error("리뷰 저장 중 오류 발생:", error);
    }
  };
  const handleCancel = () => {
    setRating(0);
    setTitle("");
    setContent("");
    setImages([]);
    setErrors({ rating: false, input: false });
    if (onComplete) onComplete(); // 아코디언 닫기
  };

  return (
    <OrderReviewContainer>
      <OrderTitleWrap>
        <p>{item.name}</p>
        <p>상품은 만족하셨나요?</p>
      </OrderTitleWrap>
      <ReviewRatingWrap>
        <ErrorMagWrap>
          <OrderRatingStar rating={rating} setRating={handleRatingChange} />
          {errors.rating && <ErrorMsg>별점을 선택해 주세요.</ErrorMsg>}
        </ErrorMagWrap>
        <ReviewTitle type="text" placeholder="리뷰 제목을 작성해주세요" value={title} onChange={titleChange} />
      </ReviewRatingWrap>
      <ReviewPhotoWarp>
        <PhotoWrap>
          <AddPhotoButton onClick={handlePhotoClick}>
            <input type="file" accept="image/*" ref={photoRef} onChange={handleImageChange} />
            <svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 -960 960 960" width="19px" fill="#0c0c0c">
              <path d="M240-280h480L597-444q-11-2-22.5-5t-22.5-7L450-320l-90-120-120 160Zm-40 160q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h200v80H200v560h560v-213l80 80v133q0 33-23.5 56.5T760-120H200Zm280-360Zm382 56L738-548q-21 14-45 21t-51 7q-74 0-126-52.5T464-700q0-75 52.5-127.5T644-880q75 0 127.5 52.5T824-700q0 27-8 52t-20 46l122 122-56 56ZM644-600q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z" />
            </svg>
            <UploadedPhoto>사진 {images.length}/5</UploadedPhoto>
          </AddPhotoButton>
          <UploadPhotoWrap>
            {/* 문자열로 저장된 이미지는 별도 변환과정 없이 그대로 다시 쓰면 됨 */}
            {images.map((src, idx) => (
              <PreviewPhotoWrap key={idx}>
                <PreviewPhoto src={src} alt={`review-image-${idx}`} />
                <PhotoDeleteButton type="button" onClick={() => handleRemoveImage(idx)}>
                  X
                </PhotoDeleteButton>
              </PreviewPhotoWrap>
            ))}
          </UploadPhotoWrap>
        </PhotoWrap>
        <TextErrorWrap>
          <ReviewText placeholder="리뷰 본문을 작성해주세요" value={content} onChange={contentChange} />
          {errors.input && <ErrorMsg>제목과 내용을 모두 입력해 주세요.</ErrorMsg>}
        </TextErrorWrap>
      </ReviewPhotoWarp>
      <ButtonWrap>
        <CompleteButton type="button" onClick={handleCancel}>
          취소
        </CompleteButton>
        <CompleteButton type="button" onClick={handleComplete}>
          완료
        </CompleteButton>
      </ButtonWrap>
    </OrderReviewContainer>
  );
}
