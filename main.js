//1. 박스 2개 만들기
//2. 드랍다운 리스트 만들기
//3. 환율정보 들고 오기
//4. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
//5. 금액을 입력하면 환전이 된다
//6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨
//7. 숫자를 한국어로 읽는 법
//8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다!


let currencyRatio={
    USD:{
        KRW:1260.88,  
        USD:1,
        YEN:132.16,
        unit:"달러"
    },
    KRW:{
        KRW:1,
        USD:0.00079,
        YEN:0.10,
        unit:"원"
    },
    YEN:{
        KRW:9.55,
        USD:0.0076,
        YEN:1,
        unit:"엔"
    }
};
//1. console.log(currencyRatio.YEN.unit);
//2. console.log(currencyRatio['YEN']['unit']); 환율정보 들고 오기

let fromCurrency = 'KRW';
let toCurrency = 'KRW';
document.querySelectorAll("#from-currency-list a").forEach(menu=>menu.addEventListener("click",function(){
    //1. 버튼을 가져온다
    //2. 버튼에 값을 바꾼다
    document.getElementById("from-button").textContent=this.textContent
    
    //3. 선택된 currency값을 변수에 저장해준다
    fromCurrency=this.textContent;
    convert("from");
    moneyNum("from");
}));

document.querySelectorAll("#to-currency-list a").forEach(menu=>menu.addEventListener("click",function(){
    //1. 버튼을 가져온다
     //2. 버튼에 값을 바꾼다
    document.getElementById("to-button").textContent=this.textContent
    
    //3. 선택된 currency값을 변수에 저장해준다
    toCurrency=this.textContent;
    convert("from");
    moneyNum("to");
  
}));

//1. 키를 입력하는 순간 
//2. 환전이 되서 
//3. 환전된 값이 보인다.

function convert(type){
    //1. 환전
    //2. 얼마를 환전? 가지고 있는 화폐가 뭔지? 환전할려는 화폐가 뭔지?
    //3. 돈*환율 = 환전
    let amount = 0;
    if(type=="from"){
        amount = document.getElementById("from-input").value;
        let convertedAmount = amount*currencyRatio[fromCurrency][toCurrency];
        document.getElementById("to-input").value=convertedAmount;
    }
    else{
        let amount = document.getElementById("to-input").value;
        let convertedAmount = amount*currencyRatio[toCurrency][fromCurrency];
        document.getElementById("from-input").value=convertedAmount;
    }
}

//화폐를 고르면 화폐에 맞는 단위 표시
function moneyNum(type){
    if(type=="from"){
        document.getElementById("from-money").textContent=currencyRatio[fromCurrency].unit;
    }
    else if(type=="to"){
        document.getElementById("to-money").textContent=currencyRatio[toCurrency].unit;
    }
}

