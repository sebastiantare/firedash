export const getConfidence = (con) => {
    switch (con) {
      case "n":
        return "Normal";
      case "h":
        return "Alta";
      case "l":
        return "Baja";
      default:
        return "";
    }
  };

  export const formatHour = (hour) => {
    // Hour comes in a number like: 344 (3:44), 1234 (12:34).
    // We need to convert it to a string and add a leading zero if needed.
    const hourStr = hour.toString();
    if (hourStr.length === 3) {
      return `0${hourStr[0]}:${hourStr.slice(1)}`;
    } else if (hourStr.length === 4) {
      return `${hourStr.slice(0, 2)}:${hourStr.slice(2)}`;
    }
    return "";

  };
  
