export async function getMainPage() {
  try {
    const response = await fetch("https://api.mylecture.kr/api/team2/main");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("통신 실패!", error);
  }
}
