// firestore-data-script.js
var db = firebase.firestore();
//顯示圖片
/*var storage = firebase.storage();
var storageRef = storage.ref();
var imageRef = storageRef.child('vsai-55c1d.appspot.com/0000001-2.webp');*/

//var LastID ="000000";

function HoldData() {
    db.collection("2024").doc("01").collection("18").get().then((querySnapshot) => {
        var count = 0;
        
        querySnapshot.forEach((doc) => {
            // 將每個文檔的數據存儲到 sessionStorage
            sessionStorage.setItem(doc.id, JSON.stringify(doc.data()));
            //新增li到list中
            //Round編號
                var currentNo = "01";
                if(count<9){
                    currentNo="0"+(count+1)
                }else{
                    currentNo=count+1
                }
            //取出對話前10個字，目前有些資料為空
            if(doc.data().CChat1 != ""){
                var FirstTen = doc.data().CChat1.split(/(PPurle:|GGreen:)/).slice(0);
                console.log(FirstTen[2]);
                let firstTenChars = FirstTen[2].slice(0, 10);
                console.log(firstTenChars);
                creatListItem(doc.id,currentNo,firstTenChars,"myList");
            }else{
                creatListItem(doc.id,currentNo,"","myList");
            }
            count++;
            
            LastID = doc.id;  
            console.log(LastID);   
            //console.log("這裡");   
            var docData = getDataFromSessionStorage(doc.id);
            //console.log(docData);  
            //getData(docData);
        });
    }).catch((error) => {
        console.log("Error getting documents: ", error);
    });
       
    //console.log(getDataFromSessionStorage(LastID));
    
    // console.log(docData); // 如果存在，將打印 doc1 的數據
    // console.log("-----------------------------------");
    // docData = getDataFromSessionStorage('0000002');
    // console.log(docData); // 如果存在，將打印 doc1 的數據
}

function getDataFromSessionStorage(docName) {
    var data = sessionStorage.getItem(docName);
    return data ? JSON.parse(data) : null; // 將字符串解析回對象
}

function creatListItem(IdNum,NoNum,Front10,ToIdName) {
    // 創建 li 元素
    const li = document.createElement('li');
    li.id = IdNum;

    // 創建第一個 div 元素並設置內容
    const divCircle = document.createElement('div');
    divCircle.className = 'circle';
    divCircle.textContent = NoNum; // 設置文本內容
    li.appendChild(divCircle); // 將它附加到 li 元素

    // 創建第二個 div 元素
    const divListText = document.createElement('div');
    divListText.className = 'ListText';

    // 創建第一個段落並設置內容
    const pTitle = document.createElement('p');
    pTitle.className = 'ListTitle';
    pTitle.textContent = 'Round'+NoNum; // 設置文本內容
    divListText.appendChild(pTitle); // 將它附加到第二個 div 元素

    // 創建第二個段落並設置內容
    const pWord = document.createElement('p');
    pWord.className = 'ListWord';
    pWord.textContent = Front10; // 設置文本內容
    divListText.appendChild(pWord); // 將它附加到第二個 div 元素

    // 將第二個 div 元素附加到 li 元素
    li.appendChild(divListText);

    // 獲取 ul 元素並將 li 元素附加到它
    const ul = document.getElementById(ToIdName);
    ul.appendChild(li);

}

function getData(dataIn) {
    var data = dataIn;
    document.getElementById("CTopic1").textContent = "題目1 | "+ data.CTopic1;
    document.getElementById("ETopic1").textContent = "Topic1 | "+ data.ETopic1;
    document.getElementById("Apromp1").textContent = data.Apromp1;
    document.getElementById("Bpromp1").textContent = data.Bpromp1;
    displayImage(data.Apic1+".webp","Apic1");
    displayImage(data.Bpic1+".webp","Bpic1");
    createCommentFromText(data.CChat1,"CChatDiv1");
    document.getElementById("CTopic2").textContent = "題目2 | "+ data.CTopic2;
    document.getElementById("ETopic2").textContent = "Topic2 | "+data.ETopic2;
    document.getElementById("Apromp2").textContent = data.Apromp2;
    document.getElementById("Bpromp2").textContent = data.Bpromp2;
    displayImage(data.Apic2+".webp","Apic2");
    displayImage(data.Bpic2+".webp","Bpic2");
    createCommentFromText(data.CChat2,"CChatDiv2");
    document.getElementById("CTopic3").textContent = "題目3 | "+ data.CTopic3;
    document.getElementById("ETopic3").textContent = "Topic3 | "+data.ETopic3;
    document.getElementById("Apromp3").textContent = data.Apromp3;
    document.getElementById("Bpromp3").textContent = data.Bpromp3;
    displayImage(data.Apic3+".webp","Apic3");
    displayImage(data.Bpic3+".webp","Bpic3");
    createCommentFromText(data.CChat3,"CChatDiv3");
    console.log(data.Winner);
    SetResultTitle(data.Winner);
}

function createCommentFromText(text,containerId) {
    const container = document.getElementById(containerId);

    const parts = text.split(/(PPurle:|GGreen:)/).slice(1);
    for (let i = 0; i < parts.length; i += 2) {
        const type = parts[i].trim();
        const content = parts[i + 1].trim();
        //console.log(type);
        //console.log(content);

        // 創建基本的 div 結構
        const commentDiv = document.createElement("div");
        commentDiv.className = type === "PPurle:" ? "comment me" : "comment other";

        // 添加圖像
        const img = document.createElement("img");
        img.src = type === "PPurle:" ? "img/web/03_chat_P.png" : "img/web/03_chat_G.png";
        commentDiv.appendChild(img);

        // 創建 bubble 和 span
        const bubbleDiv = document.createElement("div");
        bubbleDiv.className = "bubble";

        const span = document.createElement("span");
        span.textContent = content;

        bubbleDiv.appendChild(span);
        commentDiv.appendChild(bubbleDiv);

        // 將創建的元素添加到指定的容器中
        container.appendChild(commentDiv);

    }
}

function SetResultTitle(text) {
    const container = document.getElementById("resultDiv");
    const resultWord =document. getElementById("resultTitle");

    if(text == "1"){
        container.style.backgroundColor = "#00FF00";
        resultWord.textContent = "WINNER IS GREEN SIDE";
    }else{
        container.style.backgroundColor = "#6F34FF";
        resultWord.textContent = "WINNER IS PURPLE SIDE";
    }
}

function displayImage(imagePath,imageID) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imageRef = storageRef.child(imagePath);

    imageRef.getDownloadURL().then(function(url) {
        // 创建或获取一个 <img> 元素
        var img = document.getElementById(imageID);
        if (!img) {
            img = document.createElement('img');
            img.id = imageID;
            document.body.appendChild(img);
        }
        // 设置图片的 src 为获取到的 URL
        img.src = url;
    }).catch(function(error) {
        console.error("Error loading image: ", error);
    });
}


// 當頁面加載完畢時，調用 getData 函數
//window.onload = getData;
window.onload = HoldData;


// 備用區
/*
function getData() {
    db.collection("2024").doc("01").collection("17").doc("0000002").get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();
            document.getElementById("CTopic1").textContent += data.CTopic1;
            document.getElementById("ETopic1").textContent += data.ETopic1;
            document.getElementById("Apromp1").textContent += data.Apromp1;
            document.getElementById("Bpromp1").textContent += data.Bpromp1;
            displayImage(data.Apic1+".webp","Apic1");
            displayImage(data.Bpic1+".webp","Bpic1");
            createCommentFromText(data.CChat1,"CChatDiv1");
            document.getElementById("CTopic2").textContent += data.CTopic2;
            document.getElementById("ETopic2").textContent += data.ETopic2;
            document.getElementById("Apromp2").textContent += data.Apromp2;
            document.getElementById("Bpromp2").textContent += data.Bpromp2;
            displayImage(data.Apic2+".webp","Apic2");
            displayImage(data.Bpic2+".webp","Bpic2");
            createCommentFromText(data.CChat2,"CChatDiv2");
            document.getElementById("CTopic3").textContent += data.CTopic3;
            document.getElementById("ETopic3").textContent += data.ETopic3;
            document.getElementById("Apromp3").textContent += data.Apromp3;
            document.getElementById("Bpromp3").textContent += data.Bpromp3;
            displayImage(data.Apic3+".webp","Apic3");
            displayImage(data.Bpic3+".webp","Bpic3");
            createCommentFromText(data.CChat3,"CChatDiv3");
            console.log(data.Winner);
            SetResultTitle(data.Winner);

            //document.getElementById("Apic1").src = "https://firebasestorage.googleapis.com/v0/b/vsai-55c1d.appspot.com/"+data.Apic1+".webp";
            //document.getElementById("Apic1").src = imageRef;
            //https://firebasestorage.googleapis.com/v0/b/vsai-55c1d.appspot.com/o/0000001-1.webp?alt=media&token=bd4d12b1-04ca-430a-946a-903d72a98258
            //https://firebasestorage.googleapis.com/v0/b/vsai-55c1d.appspot.com/o/0000001-2.webp?alt=media&token=b59a1b73-9ed0-45e8-8f8e-0170760adcdc
            //document.getElementById("Bpic1").src = "https://firebasestorage.googleapis.com/v0/b/vsai-55c1d.appspot.com/"+data.Bpic1+".webp";
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}*/