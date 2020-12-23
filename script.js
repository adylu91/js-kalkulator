document.addEventListener("DOMContentLoaded", (event) => {
  let state = ""; //aktualny stan
  let stateTemp = ""; //stan po działaniu np po naciśnieciu +
  let operation = ""; // aktualna przechowywana operacja np odejmowanie
  let memoryText = ""; //tekst wyświetlany nad "wyświetlaczem"

  const input = document.querySelector("[data-input]");
  const plus = document.querySelector("[data-button=plus]");
  const power = document.querySelector("[data-button=power]");
  const divide = document.querySelector("[data-button=divide]");
  const minus = document.querySelector("[data-button=minus]");
  const memory = document.querySelector(".memory");

  handleSetInput = () => {
    //ustawienie wyświetlacza
    input.value = state;
    console.log(
      `state: ${state}, stateTemp: ${stateTemp}, operation: ${operation}`
    );
    handleSetMemory();
  };

  handleToogleActiveElements = (bool) => {
    // włącz/wyłącz klawisze operacyjne
    if (bool) {
      console.log(plus);
      plus.classList.add("disable");
      minus.classList.add("disable");
      power.classList.add("disable");
      divide.classList.add("disable");
    } else {
      plus.classList.remove("disable");
      minus.classList.remove("disable");
      power.classList.remove("disable");
      divide.classList.remove("disable");
    }
  };

  handleSetOperation = (oper) => {
    //ustaw zmienną operation
    operation = oper;
    stateTemp = state;
    state = "";
    handleSetInput();
  };

  handleSetMemory = () => {
    //ustaw tekst nad wyświetlaczem
    if (state === "" && stateTemp === "" && operation === "") {
      memory.innerText = "Memory: 0";
    } else {
      let op = "";
      operation === "power" ? (op = "*") : null;
      operation === "divided" ? (op = "/") : null;
      operation === "plus" ? (op = "+") : null;
      operation === "minus" ? (op = "-") : null;
      memory.innerText = `Memory: ${stateTemp} ${op} ...`;
    }
  };

  handleSetAfterOperation = () => {
    //akcje po nacieśnieciu klawisza operacyjnego np +
    operation = "";
    stateTemp = "";
    handleSetInput();
    handleToogleActiveElements(false);
  };

  handleDotButton = () => {
    //funkcja pomocnicza do obsługi przecinka
    if (state === "") {
      state = "0.";
      handleSetInput();
    } else if (!state.match(/^\.$/)) {
      state += ".";
      handleSetInput();
    }
  };

  handleOnClick = (event) => {
    //obsługa wszystkich guzików
    const buttonEvent = event.target.dataset.button;

    if ("0123456789".match(buttonEvent)) {
      state += buttonEvent;
      handleSetInput();
    } else if (buttonEvent.match(/^dot$/)) {
      handleDotButton();
    } else if (buttonEvent.match(/^plus$/)) {
      handleSetOperation("plus");
      state === "" && stateTemp === "" // nie wyłączaj przycisków +/-/*// gdy state i stateTemp jest puste, moment gdy user zamiast liczb na początku wybierze +/-/*//
        ? null
        : handleToogleActiveElements(true);
    } else if (buttonEvent.match(/^minus$/)) {
      handleSetOperation("minus");
      state === "" && stateTemp === ""
        ? null
        : handleToogleActiveElements(true);
    } else if (buttonEvent.match(/^power$/)) {
      handleSetOperation("power");
      state === "" && stateTemp === ""
        ? null
        : handleToogleActiveElements(true);
    } else if (buttonEvent.match(/^divide$/)) {
      handleSetOperation("divide");
      state === "" && stateTemp === ""
        ? null
        : handleToogleActiveElements(true);
    } else if (buttonEvent.match(/^clear$/)) {
      state = "";
      stateTemp = "";
      operation = "";
      handleSetInput();
      handleToogleActiveElements(false);
    } else if (buttonEvent.match(/^result$/)) {
      //po naciśnięciu =
      switch (operation) {
        case "plus":
          state = Number(state) + Number(stateTemp);
          handleSetAfterOperation();
          break;
        case "minus":
          state = Number(stateTemp) - Number(state);
          handleSetAfterOperation();
          break;
        case "power":
          state = Number(stateTemp) * Number(state);
          handleSetAfterOperation();
          break;
        case "divide":
          state = Number(stateTemp) / Number(state);
          handleSetAfterOperation();
          break;
        default:
          console.log("operacja działania nieznana");
      }
    }
  };

  document.querySelectorAll("[data-button]").forEach((element) => {
    element.addEventListener("click", handleOnClick);
  });
  handleSetInput(); //inicjalizja stanu początkowego
  handleSetMemory(); //inicjalizacja memory
});
