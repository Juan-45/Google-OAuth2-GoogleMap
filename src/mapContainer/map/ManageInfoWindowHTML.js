const ManageInfoWindowHTML = ({ markersSettings }) => {
  const infoWindowHtml = markersSettings.map((item) => {
    return (
      '<div class="infoWindowContainer">' +
      `<span class="infoWindowText infoWindowTitle">${item.title}</span>` +
      `<span class="infoWindowText infoWindowP">${item.adress}</span>` +
      `<span class="infoWindowText infoWindowP">${item.contact}</span>` +
      '<div class="infoWindowsButtonContainer">' +
      `<button class="gpsButton" id="gpsButton">GPS</button>` +
      `<button class="streetButton" id="streetButton">Vista en calle</button></div></div>`
    );
  });

  const gpsButtonHanlder = () => console.log("GPS clicked");
  const streetButtonHandler = () => console.log("StreetView clicked");

  const addHandlers = () => {
    document
      .getElementById("gpsButton")
      .addEventListener("click", gpsButtonHanlder);
    document
      .getElementById("streetButton")
      .addEventListener("click", streetButtonHandler);
  };

  return { infoWindowHtml, addHandlers };
};

export default ManageInfoWindowHTML;
