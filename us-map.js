/**
 * us-map.js
 * 
 * Implements an inline interactive US map with zoom and state selection.
 * On state click, zooms in and shows cities/towns with legal info panels.
 * Uses SVG map of US states.
 */

import { usStatesData } from './us-states.js';

export class USMap {
  constructor(containerId, locationData, onStateSelect) {
    this.container = document.getElementById(containerId);
    this.locationData = locationData;
    this.onStateSelect = onStateSelect;
    this.selectedState = null;
    this.svg = null;
    this.zoomedIn = false;
    this.selectedCounty = null;

    this.initMap();
    // Bind methods to this instance
    this.showCountyInfo = this.showCountyInfo.bind(this);
    // Add to window for onclick access
    window.usMap = this;
  }

  initMap() {
    const svgNS = "http://www.w3.org/2000/svg";

    this.svg = document.createElementNS(svgNS, "svg");
    this.svg.setAttribute("viewBox", "0 0 960 600");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    this.svg.style.border = "1px solid #ccc";
    this.svg.style.backgroundColor = "#f9fafb";
    this.svg.style.transition = "all 0.5s ease-in-out";

    // Add a background rect for reset click
    const background = document.createElementNS(svgNS, "rect");
    background.setAttribute("width", "100%");
    background.setAttribute("height", "100%");
    background.setAttribute("fill", "transparent");
    background.addEventListener("click", () => this.resetZoom());
    this.svg.appendChild(background);

    // Create a group for all states
    this.statesGroup = document.createElementNS(svgNS, "g");
    this.svg.appendChild(this.statesGroup);

    usStatesData.states.forEach(state => {
      // Create state path
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", state.path);
      path.setAttribute("id", state.id);
      path.setAttribute("fill", "#2563eb");
      path.setAttribute("stroke", "#1e40af");
      path.setAttribute("stroke-width", "1");
      path.style.cursor = "pointer";
      path.style.transition = "all 0.3s ease, transform 0.3s ease";

      // Add hover effects
      path.addEventListener("mouseover", () => {
        if (this.selectedState !== state.id) {
          path.setAttribute("fill", "#3b82f6");
          path.setAttribute("stroke-width", "2");
          path.style.transform = "scale(1.05)";
          path.style.filter = "drop-shadow(0 0 4px rgba(59, 130, 246, 0.7))";
        }
      });

      path.addEventListener("mouseout", () => {
        if (this.selectedState !== state.id) {
          path.setAttribute("fill", "#2563eb");
          path.setAttribute("stroke-width", "1");
          path.style.transform = "scale(1)";
          path.style.filter = "none";
        }
      });

      path.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onStateClick(state);
      });
      this.statesGroup.appendChild(path);

      // Add state label
      const text = document.createElementNS(svgNS, "text");
      text.setAttribute("x", state.center[0]);
      text.setAttribute("y", state.center[1]);
      text.setAttribute("fill", "white");
      text.setAttribute("font-size", "14");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("dominant-baseline", "middle");
      text.style.pointerEvents = "none";
      text.textContent = state.name;

      this.statesGroup.appendChild(text);
    });

    this.container.appendChild(this.svg);
    this.infoPanel = document.getElementById('state-info');
  }

  onStateClick(state) {
    if (this.selectedState === state.id && this.zoomedIn) {
      this.resetZoom();
      return;
    }

    this.selectedState = state.id;
    this.selectedCounty = null;
    this.highlightState(state.id);
    this.showStateInfo(state.id);
    this.zoomToState(state);
    if (this.onStateSelect) this.onStateSelect(state.id);
  }

  zoomToState(state) {
    // Calculate the bounding box of the state path
    const path = this.svg.getElementById(state.id);
    const bbox = path.getBBox();
    
    // Add padding
    const padding = 50;
    const viewBox = [
      bbox.x - padding,
      bbox.y - padding,
      bbox.width + (padding * 2),
      bbox.height + (padding * 2)
    ].join(" ");
    
    // Animate zoom
    this.svg.style.transform = "scale(1.0)";
    setTimeout(() => {
      this.svg.setAttribute("viewBox", viewBox);
      this.zoomedIn = true;
    }, 50);
  }

  resetZoom() {
    if (!this.zoomedIn) return;
    
    this.svg.setAttribute("viewBox", "0 0 960 600");
    this.zoomedIn = false;
    
    if (this.selectedState) {
      const paths = this.svg.querySelectorAll("path");
      paths.forEach(path => {
        path.setAttribute("fill", "#2563eb");
        path.setAttribute("stroke-width", "1");
      });
      this.selectedState = null;
      this.selectedCounty = null;
      this.infoPanel.innerHTML = "";
    }
  }

  highlightState(stateId) {
    const paths = this.svg.querySelectorAll("path");
    paths.forEach(path => {
      if (path.id === stateId) {
        path.setAttribute("fill", "#fbbf24");
        path.setAttribute("stroke-width", "2");
      } else {
        path.setAttribute("fill", "#2563eb");
        path.setAttribute("stroke-width", "1");
      }
    });
  }

  showStateInfo(stateId) {
    const stateName = this.getStateName(stateId);
    const counties = this.locationData[stateName] ? Object.keys(this.locationData[stateName]) : [];

    this.infoPanel.innerHTML = `
      <div class="bg-indigo-50 p-6 rounded-lg transition-all duration-500 ease-in-out shadow-inner">
        <h3 class="text-xl font-semibold mb-4 text-indigo-900">Selected State: ${stateName}</h3>
        ${counties.length > 0 ? `
          <p class="mb-3 text-indigo-800 font-medium">Counties:</p>
          <ul class="list-disc list-inside text-indigo-700">
            ${counties.map(county => `
              <li class="mb-2">
                <button 
                  class="text-left hover:text-indigo-900 focus:outline-none ${this.selectedCounty === county ? 'font-semibold text-indigo-900' : ''}"
                  onclick="window.usMap.showCountyInfo('${stateName}', '${county}')"
                >
                  ${county}
                </button>
              </li>
            `).join("")}
          </ul>
          <p class="mt-6 text-sm text-indigo-600 italic">Click a county to see towns and legal resources.</p>
        ` : `
          <p class="text-indigo-700 italic">No county data available for this state.</p>
        `}
      </div>
      <div id="county-info" class="mt-6"></div>
    `;
  }

  showCountyInfo(stateName, county) {
    this.selectedCounty = county;
    const towns = this.locationData[stateName][county];
    const countyInfoContainer = this.infoPanel.querySelector('#county-info');
    
    // Update county list to highlight selected county
    const countyButtons = this.infoPanel.querySelectorAll('button');
    countyButtons.forEach(button => {
      if (button.textContent.trim() === county) {
        button.classList.add('font-semibold', 'text-indigo-900');
      } else {
        button.classList.remove('font-semibold', 'text-indigo-900');
      }
    });

    countyInfoContainer.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-md border border-indigo-200 transition-all duration-500 ease-in-out">
        <h4 class="text-lg font-semibold mb-4 text-indigo-900">${county}</h4>
        <p class="mb-3 text-indigo-800 font-medium">Towns:</p>
        <ul class="list-disc list-inside text-indigo-700">
          ${towns.map(town => `
            <li class="mb-2 hover:text-indigo-900 cursor-default">
              ${town}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  getStateName(stateId) {
    const state = usStatesData.states.find(s => s.id === stateId);
    return state ? state.name : stateId;
  }
}
