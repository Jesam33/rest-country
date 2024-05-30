console.log("Starting server");

document.addEventListener("DOMContentLoaded", function () {
  const regionSelect = document.getElementById("Region");
  const countryList = document.querySelector(".countries");

  // Fetch REST API

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Extract unique regions
      const regions = [...new Set(data.map((country) => country.region))];
      regions.forEach((region) => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
      });

      const countryName = [];

      // Display countries
      data.forEach((element) => {
        countryName.push({
          // modalImage: element.flags.svg,
          countryName: element.name.common,
          region: element.region,
        });

        const countryDiv = document.createElement("div");
        countryDiv.classList.add("countryHousing");

        countryDiv.innerHTML = `
          <div class="countryFlag">
            <img src="${element.flags.svg}" alt="flag">
          </div>
          <div class="countryDescription">
            <p class="CountryName" >${element.name.common}</p>
            <p>Population: <span class="feint population">${
              element.population
            }</span></p>
            <p>Capital: <span class="feint">${
              element.capital ? element.capital[0] : "N/A"
            }</span></p>
            <p>Region: <span class="feint countryRegion">${
              element.region
            }</span></p>
          </div>
        `;
        countryDiv.onclick = function (event) {
          showModal(
            event,
            element.name.common,
            element.flags.svg,
            element.name.common,
            element.population,
            element.region,
            element.subregion,
            element.capital,
            element.tld ? element.tld[0] : "N/A",
            element.currencies,
            element.languages,
            element.borders
          );
        };
        countryList.appendChild(countryDiv);
      });
      console.table(countryName);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const togglerIcon = document.querySelector(".toggler");
  const togglerLte = document.querySelector(".toggler-lte");
  const bodyElement = document.body;

  const ModalTogglerIcon = document.querySelector(".Modaltoggler")
  const ModalTogglerLte = document.querySelector(".Modaltoggler-lte");
  // Add click event listener to the icon
  togglerIcon.addEventListener("click", toggleLightMode);
  togglerLte.addEventListener("click", toggleLightMode);

  ModalTogglerIcon.addEventListener("click", toggleLightModes);
  ModalTogglerLte.addEventListener("click", toggleLightModes);

  function toggleLightMode() {
    const isLightMode = bodyElement.classList.contains("light-mode");

    // Toggle the light mode class
    bodyElement.classList.toggle("light-mode", !isLightMode);

    // Toggle visibility of icons
    togglerIcon.style.display = isLightMode ? "flex" : "none";
    togglerLte.style.display = isLightMode ? "none" : "flex";

    console.log("Toggling light mode", !isLightMode);
  }

  function toggleLightModes() {
    const isLightMode = bodyElement.classList.contains("light-mode");

    // Toggle the light mode class
    bodyElement.classList.toggle("light-mode", !isLightMode);

    // Toggle visibility of icons
    ModalTogglerIcon.style.display = isLightMode ? "flex" : "none";
    ModalTogglerLte.style.display = isLightMode ? "none" : "flex";

    console.log("Toggling light mode", !isLightMode);
  }

  // Search functionality
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();
    const countries = document.querySelectorAll(".countryHousing");

    countries.forEach(function (country) {
      const countryName = country
        .querySelector(".CountryName")
        .textContent.toLowerCase();
      if (countryName.includes(searchValue)) {
        country.style.display = "block";
      } else {
        country.style.display = "none";
      }
    });
  });

  // Add click event listener to each country

  function showModal(
    event,
    countryName,
    modalImage,
    nativeNames,
    modalPopulations,
    region,
    subRegion,
    regionCapital,
    modalTld,
    modalCurrencies,
    modalLanguages,
    Borders
  ) {
    const modal = document.getElementById("modal");
    modal.removeAttribute("hidden");
    const modalCountryName = document.getElementById("modalCountryName");
    modalCountryName.innerHTML = countryName;
    const modalImg = document.getElementById("modalImg");
    modalImg.src = modalImage;
    modalImg.alt = `Flag of ${countryName}`;
    modalCountryName.innerHTML = countryName;
    modalImg.innerHTML = modalImage;
    const nativeName = document.getElementById("modalNative");
    nativeName.innerHTML = nativeNames;
    const modalPopulation = document.getElementById("population");
    modalPopulation.innerHTML = modalPopulations;
    const modalRegion = document.getElementById("countryRegion");
    modalRegion.innerHTML = region;
    const modalSubRegion = document.getElementById("subRegion");
    modalSubRegion.innerHTML = subRegion;
    const modalCaptal = document.getElementById("modalCapital");
    modalCaptal.innerHTML = regionCapital;
    const modaldomain = document.getElementById("modalDomain");
    modaldomain.innerHTML = modalTld;
    const modalCurrency = document.getElementById("currency");
    modalCurrency.innerHTML = formatCurrencies(modalCurrencies);
    const modalLanguage = document.getElementById("language");
    modalLanguage.innerHTML = formatLanguages(modalLanguages);
    const modalBorders = document.getElementById("borders");
    modalBorders.innerHTML = Borders;
    // const modalNative = document.getElementById("modalNative");
    // modalNative.innerHTML = modalNative;
  }

  function formatCurrencies(currencies) {
    let currenciesString = "";
    for (const code in currencies) {
      if (currencies.hasOwnProperty(code)) {
        currenciesString += `${code} (${currencies[code].name}) `;
      }
    }
    return currenciesString;
  }

  function formatLanguages(languages) {
    return Object.values(languages).join(", ");
  }

  const goBack = document.querySelector(".back");
  const modalContainer = document.querySelector(".containerModal");
  goBack.addEventListener("click", () => {
    modalContainer.classList.remove("show");
    const modal = document.getElementById("modal");
    modal.setAttribute("hidden", "true");
  });

  // Filter countries by region
  regionSelect.addEventListener("change", function () {
    const selectValue = this.value;
    console.log(selectValue);
    const countries = document.querySelectorAll(".countryHousing");
    countries.forEach(function (country) {
      const countryRegion = country
        .querySelector(".countryRegion")
        .textContent.toLowerCase();
      if (countryRegion.includes(selectValue.toLowerCase())) {
        country.style.display = "block";
      } else {
        country.style.display = "none";
      }
    });
  });
});
