import { useRef } from "react";
import "./App.css";

function App() {
  const amountRef = useRef(null);
  const nameRef = useRef(null);
  const IMP_init = process.env.REACT_APP_IMP;
  const buyer_tel = process.env.REACT_APP_BUYER_TEL;

  function onClickPayment() {
    const amount = amountRef.current.value;
    const name = nameRef.current.value;

    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(IMP_init);

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "kakaopay", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: amount, // 결제금액
      name: name, // 주문명
      buyer_name: "홍길동", // 구매자 이름
      buyer_tel: buyer_tel, // 구매자 전화번호
      buyer_email: "example@example", // 구매자 이메일
      buyer_addr: "신사동 661-16", // 구매자 주소
      buyer_postcode: "06018", // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
      amountRef.current.value = "";
      nameRef.current.value = "";
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  const currentDate = new Date();
  const nowDdate = currentDate.toLocaleDateString();
  const nowTime = currentDate.toLocaleString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="background">
      <div className="fake-pay">
        <div className="title">알림톡 도착</div>
        <div className="body">
          <div>
            <br />
            <div style={{ color: "gray" }}>결제금액</div>
            <div style={{ fontSize: "1.5rem" }}>
              <input
                type="number"
                ref={amountRef}
                style={{ height: "1.5rem", width: "21rem", fontSize: "1.5rem" }}
                placeholder="원하는 상품금액을 입력해주세요."
              />{" "}
              원
            </div>
            <br />
            <hr />
            <div>결제가 완료되었어요.</div>
            <br />
            <div>- 구매처: KakaoDevelopers</div>
            <div>
              - 상품명:{" "}
              <input
                type="text"
                ref={nameRef}
                placeholder="원하는 상품명을 입력해주세요."
                style={{ width: "15rem" }}
              />
            </div>
            <div>
              - 결제일시: {nowDdate} {nowTime}
            </div>
            <div>- 결제수단: 결제 단계에서 선택 가능합니다.</div>
            <div></div>
            <br />
            <hr />
            <br />
            <div className="info">
              위와 비슷한 양식으로 카카오톡에 알림이 오게 됩니다.
            </div>
            <br />
            <div className="fake-btn">
              <button onClick={onClickPayment}>가짜 결제 진행하기</button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div>
        본 페이지는 가짜 결제를 체험해보는 페이지로서 이를 악용하는 걸 엄격히
        금합니다.
      </div>
    </div>
  );
}

export default App;
