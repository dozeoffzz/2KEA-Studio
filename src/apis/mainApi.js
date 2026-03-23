export async function fetchMain() {
  try {
    const response = await fetch("https://api.mylecture.kr/api/team2/main");

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("false");
  }
}
