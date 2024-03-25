import { useRef } from 'react';
import './App.css';

function App() {

  const amountRef = useRef(null);
  const nameRef = useRef(null);
  const IMP_init = process.env.REACT_APP_IMP;

  function onClickPayment() {

    const amount = amountRef.current.value;
    const name = nameRef.current.value;
  

    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(IMP_init);

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'kakaopay',                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
      amount: amount,                                 // 결제금액
      name: name,                  // 주문명
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012341234',                     // 구매자 전화번호
      buyer_email: 'example@example',               // 구매자 이메일
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  }

  /* 3. 콜백 함수 정의하기 */
  function callback(response) {
    const {
      success,
      merchant_uid,
      error_msg,
    } = response;

    if (success) {
      alert('결제 성공');
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }

  return (
<div>
  <div>
    금액: <input type="number" ref={amountRef}/>
    <br/>
    상품명: <input type="text" ref={nameRef}/>
    <br/>
    <button onClick={onClickPayment}>전송</button>
  </div>
</div>
  );
}

export default App;
