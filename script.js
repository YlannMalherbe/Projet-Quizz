var myArrAnswer = [{
    "question" : "Qui est Zelda ?",
    "réponses": [{"proposition":"Une princess à sauver","valeur":1},
    {"proposition":"Un mec qui casse des pots","valeur":0},
    {"proposition":"Un mec en vert","valeur":0},
    {"proposition":"Le voisin du quartier","valeur":0}]
},{
    "question" : "Que signifie les initials NSI ?",
    "réponses": [{"proposition":"Nombres de Soldats Indisponibles","valeur":0},
    {"proposition":"Nom Sans Intêret","valeur":0},
    {"proposition":"Notoriété Saine et International","valeur":0},
    {"proposition":"Numérique et Science Informatique","valeur":1}]
},{
    "question" : "Pourquoi la terre à des saisons ?",
    "réponses": [{"proposition":"A cause de son atmosphère","valeur":0},
    {"proposition":"A cause de sa rotion autour du Soleil et de son inclinaison","valeur":1},
    {"proposition":"Parce que c'est comme ça","valeur":0},
    {"proposition":"Car la terre tourne sur elle-même","valeur":0}]
},{
    "question" : "Qu'est-ce que le PH",
    "réponses": [{"proposition":"Les HP (health point) à l'envers","valeur":0},
    {"proposition":"Un site de Q","valeur":0},
    {"proposition":"L'indication de l'acidité","valeur":1},
    {"proposition":"Une contrefaçon de la marque HP","valeur":0}]
}]

var AlltextAnswer = []
var AllAnswer = []
var NumeroDeQuestion = 0

function StartProgramme() {
    DelParExp();
    DeleteButton();
    CreateContener();
    NewTemplate();
    createButton("Question Suivante","input", "Programme();",'question_contener', "beforeend");
}

function Programme() {
    let value = GetValue();
    if (NumeroDeQuestion < myArrAnswer.length && value === 1) {
        DeleteOldCard();
        NewTemplate();
    }

    if (NumeroDeQuestion == myArrAnswer.length && value === 1) {
        DeleteOldCard();
        DeleteButton();
        DeleteContener()
        createButton("Voire vos résultat","input SeeResult","SeeResult();",'reponse', "afterbegin");
    }
}

function SeeResult() {
    DeleteButton();
    CreateResult();
    PlayerPoints();
}

function DelParExp() {
    let contener = document.getElementsByClassName("explanation")[0];
    let child = contener.getElementsByTagName("p")[0];
    contener.removeChild(child)
}

function CreateContener() {
    let position = document.getElementsByClassName("card-contener")[0];
    let question_contener = document.createElement("div")
    let proposition = document.createElement("div")

    question_contener.setAttribute("class","question_contener")
    proposition.setAttribute("class","proposition")

    position.insertAdjacentElement("afterbegin", question_contener)
    question_contener.insertAdjacentElement("afterbegin", proposition)
}

function DeleteContener() {
    let question_contener = document.getElementsByClassName("question_contener")[0];
    question_contener.removeChild(question_contener.firstChild)
    question_contener.remove()
}

function DeleteButton() {
    let input_btn = document.getElementsByClassName("input")[0];
    input_btn.remove()
}

function createButton(texte,class_, programme, position, insertion) {
    let buttonPlacement = document.getElementsByClassName(position)[0];
    let NewButton = document.createElement('input');
    NewButton.setAttribute("type","button")
    NewButton.setAttribute("class",class_)
    NewButton.setAttribute("value",texte);
    NewButton.setAttribute("onclick", programme)
    buttonPlacement.insertAdjacentElement(insertion ,NewButton)
}


function DeleteOldCard() {
    let card_contener = document.getElementsByClassName("question_contener")[0];
    let choice_contener = document.getElementsByClassName("proposition")[0];

    card_contener.removeChild(card_contener.firstChild)

    while (choice_contener.firstChild) {
        choice_contener.removeChild(choice_contener.firstChild)
    }
}

function NewTemplate() {
    let card_contener = document.getElementsByClassName("question_contener")[0];
    let template = document.getElementsByTagName("template")[0];
    let choice_contener = document.getElementsByClassName("proposition")[0];
    let question_selector = template.content.querySelector("p");
    let radio_selector = template.content.querySelector("input[type=radio]")
    let label_selector = template.content.querySelector("label")
    var réponse = 0;

    var question = document.importNode(question_selector, false)
    question.textContent += myArrAnswer[NumeroDeQuestion]["question"];

    card_contener.insertAdjacentElement('afterbegin',question)

    for (var i = 0; i < myArrAnswer[NumeroDeQuestion]["réponses"].length; ++i) {
        let propostion = document.importNode(radio_selector, false)
        let label = document.importNode(label_selector, false)

        propostion.setAttribute("value", String(myArrAnswer[NumeroDeQuestion]["réponses"][i]["valeur"]))
        propostion.setAttribute("name",("propostion "+String(NumeroDeQuestion)))
        propostion.setAttribute("data-text", myArrAnswer[NumeroDeQuestion]["réponses"][i]["proposition"])
        propostion.setAttribute('id', ("propostion "+String(NumeroDeQuestion)+" "+String(réponse))) 
        label.setAttribute('for',("propostion "+String(NumeroDeQuestion)+" "+String(réponse)))
        label.setAttribute("class","propositionAnswer")
        
        choice_contener.appendChild(label)
        label.insertAdjacentElement("afterbegin",propostion)
        label.insertAdjacentText("beforeend",myArrAnswer[NumeroDeQuestion]["réponses"][i]["proposition"])
        
        réponse += 1
    }
}

function GetValue() {
    var for_the_check = 0;
    let Answer = document.querySelectorAll( 'input[type=radio]:checked' );
    for (var item of Answer) {
        if(item.checked == true) {
            for_the_check = 1;
            let TextData = item.dataset.text
            AlltextAnswer.push(TextData)
            AllAnswer.push(item.value)
            NumeroDeQuestion += 1
        }
      }
    console.log(NumeroDeQuestion)
    return for_the_check
}

function CreateResult() {
    let styleContener = document.getElementsByClassName("reponse")[0]
    let PlayerAnswerPlacement = document.getElementsByClassName("PlayerAnswers")[0];
    let AnswerPlacement = document.getElementsByClassName("GoodAnswer")[0];
    let tableau_reponse = document.getElementsByClassName("tableau_reponse")[0];

    styleContener.setAttribute("class", "reponse card")

    for (var iter = 0; iter < AlltextAnswer.length; ++iter) {
        let paragraphePlayerAnswer = document.createElement("p");
        paragraphePlayerAnswer.textContent = String(iter)+" - "+AlltextAnswer[iter];

        if (AllAnswer[iter] == 1) {
            paragraphePlayerAnswer.setAttribute("class", "PlayerAnswer True")
            PlayerAnswerPlacement.insertAdjacentElement("beforeend", paragraphePlayerAnswer)
        } else {
            paragraphePlayerAnswer.setAttribute("class","PlayerAnswer False")
            PlayerAnswerPlacement.insertAdjacentElement("beforeend", paragraphePlayerAnswer)
        }
    }

    let count = 0;

    for (var element of myArrAnswer) {
        for (var iter = 0; iter < myArrAnswer.length; ++iter){
            if (myArrAnswer[count]["réponses"][iter]["valeur"] == 1) {
                let paragrapheAnswer = document.createElement('p');
                paragrapheAnswer.textContent = String(count)+" - "+ myArrAnswer[count]["réponses"][iter]["proposition"]
                AnswerPlacement.insertAdjacentElement('beforeend', paragrapheAnswer)
            } 
        }
        count += 1
    }

    tableau_reponse.classList.add("IsVisible");

}

function PlayerPoints() {
    let PlayerPoint = 0;
    for (var i = 0; i < AllAnswer.length; i++) {
        console.log(AllAnswer[i])
        PlayerPoint += parseInt(AllAnswer[i],10)
    }

    let scorePlacement = document.getElementsByClassName("reponse")[0];
    let score = document.createElement('p');
    score.innerHTML = "Félicitation, vous avez fini le quizz <br> Votre score est de : <strong class='score'>"+String(PlayerPoint)+"/"+String(AllAnswer.length)+"</strong>"
    scorePlacement.insertAdjacentElement("afterbegin", score)
}