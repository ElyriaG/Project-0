//Hide content until mood is chosen
$("#spotify").slideUp(1);

var config = {
  apiKey: "AIzaSyA9II18kgiRBsKko3xJVcsQ5ai9PsNJtMY",
  authDomain: "mindset-c4818.firebaseapp.com",
  databaseURL: "https://mindset-c4818.firebaseio.com",
  projectId: "mindset-c4818",
  storageBucket: "mindset-c4818.appspot.com",
  messagingSenderId: "4140115652",
};

firebase.initializeApp(config);

var database = firebase.database();

//Variables to house mood count for chart
var happy = 0;
var sad = 0;
var angry = 0;
var scared = 0;
var tired = 0;
var love = 0;

$(".dropdown-menu a").on("click", function () {
  //When mood is chosen, spotify playlist will appear
  $("#spotify").slideDown();

  //Topic is set from dropdown text
  var topic = $(this).text();

  //Count goes up and background colors change
  if (topic === "Sad") {
    sad++;
    $(".contentDiv").css(
      "background-image",
      "linear-gradient(#4c4c4c, #345467)"
    );
  } else if (topic === "Happy") {
    happy++;
    $(".contentDiv").css(
      "background-image",
      "linear-gradient(#FFDD00, #01BEFE)"
    );
  } else if (topic === "Angry") {
    console.log("Angry");
    angry++;
    $(".contentDiv").css(
      "background-image",
      "linear-gradient(#f03e3e, #471c1c)"
    );
  } else if (topic === "Scared") {
    scared++;
    $(".contentDiv").css(
      "background-image",
      "linear-gradient(#3f1a49, #36492e)"
    );
  } else if (topic === "Tired") {
    tired++;
    $(".contentDiv").css(
      "background-image",
      "linear-gradient(#4a4e69, #c9ada7)"
    );
  } else {
    love++;
    $(".contentDiv").css(
      "background-image",
      "linear-gradient(#ff4770, #ffbbca)"
    );
  }

  //Update Firebase click count
  database.ref().set({
    fHappy: happy,
    fSad: sad,
    fAngry: angry,
    fScared: scared,
    fTired: tired,
    fLove: love,
  });
});

//Draw chart
Chart.defaults.global.defaultFontFamily = "Roboto";
var ctx = document.getElementById("myChart").getContext("2d");

var chart = new Chart(ctx, {
  //Chart characteristics
  type: "bar",
  data: {
    labels: ["Happy", "Sad", "Angry", "Scared", "Tired", "Love"],
    datasets: [
      {
        label: "The World's Mindset",
        backgroundColor: [
          "#F9FF2F",
          "#5E7685",
          "#D52424",
          "#300018",
          "#645C62",
          "#E66A80",
        ],
        borderColor: "rgb(255, 99, 132)",
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
  },

  // Configuration options
  options: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    legend: {
      labels: {
        fontColor: "white",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "white",
          },
        },
      ],
    },
  },
});

//Get Firebase data
database.ref().on(
  "value",
  function (snapshot) {
    //Mood values from Firebase
    happy = snapshot.val().fHappy;
    sad = snapshot.val().fSad;
    angry = snapshot.val().fAngry;
    scared = snapshot.val().fScared;
    tired = snapshot.val().fTired;
    love = snapshot.val().fLove;

    //Update chart
    chart.data.datasets[0].data = [happy, sad, angry, scared, tired, love];
    chart.update();

    // Create Error Handling
  },
  function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);
