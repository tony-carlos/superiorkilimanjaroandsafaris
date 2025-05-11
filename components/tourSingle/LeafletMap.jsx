import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-polylinedecorator";

const LeafletMap = ({ tour }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [loadingRoutes, setLoadingRoutes] = useState(false);

  useEffect(() => {
    // Don't run on the server
    if (typeof window === "undefined") return;

    // Create a map only if it doesn't exist yet
    if (!mapRef.current && mapContainerRef.current) {
      // Extract all points from itinerary items
      const getAllItineraryPoints = () => {
        const points = [];

        // Add start point from tour coordinates if available
        if (
          tour?.coordinates?.from?.latitude &&
          tour?.coordinates?.from?.longitude
        ) {
          points.push({
            lat: parseFloat(tour.coordinates.from.latitude),
            lng: parseFloat(tour.coordinates.from.longitude),
            title: "Start Location",
            dayIndex: null,
            isStart: true,
            isEnd: false,
            isIntermediate: false,
          });
        }

        // Process all itinerary days to extract coordinates
        if (tour?.itinerary && Array.isArray(tour.itinerary)) {
          tour.itinerary.forEach((day, index) => {
            // Prefer accommodation coordinates if available
            if (
              day.accommodation?.coordinates?.latitude &&
              day.accommodation?.coordinates?.longitude
            ) {
              points.push({
                lat: parseFloat(day.accommodation.coordinates.latitude),
                lng: parseFloat(day.accommodation.coordinates.longitude),
                title:
                  day.accommodation.name || day.title || `Day ${index + 1}`,
                dayIndex: index + 1,
                isStart: false,
                isEnd: false,
                isIntermediate: true,
              });
            }
            // Fall back to destination coordinates if accommodation is not available
            else if (
              day.destination?.coordinates?.latitude &&
              day.destination?.coordinates?.longitude
            ) {
              points.push({
                lat: parseFloat(day.destination.coordinates.latitude),
                lng: parseFloat(day.destination.coordinates.longitude),
                title: day.destination.name || day.title || `Day ${index + 1}`,
                dayIndex: index + 1,
                isStart: false,
                isEnd: false,
                isIntermediate: true,
              });
            }
          });
        }

        // Add end point from tour coordinates if available
        if (
          tour?.coordinates?.end?.latitude &&
          tour?.coordinates?.end?.longitude
        ) {
          points.push({
            lat: parseFloat(tour.coordinates.end.latitude),
            lng: parseFloat(tour.coordinates.end.longitude),
            title: "End Location",
            dayIndex: null,
            isStart: false,
            isEnd: true,
            isIntermediate: false,
          });
        }

        return points;
      };

      const coordinates = getAllItineraryPoints();

      if (coordinates.length === 0) {
        mapContainerRef.current.innerHTML =
          '<div class="py-30 text-center">No valid coordinates found</div>';
        return;
      }

      // Create custom icons with day numbers
      const createNumberedIcon = (number, color) => {
        if (number === null) {
          // For start/end points without day numbers
          return L.divIcon({
            className: "custom-div-icon",
            html: `<div style="background-color: ${color}; color: white; border: 2px solid white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">${
              color === "#e03131" ? "S" : "E"
            }</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15],
          });
        }
        return L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: ${color}; color: white; border: 2px solid white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">${number}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        });
      };

      // Initialize the map with a nicer OSM style
      mapRef.current = L.map(mapContainerRef.current, {
        scrollWheelZoom: false, // Disable scroll wheel zoom to prevent accidental zooming
        zoomControl: true, // Show zoom controls
        attributionControl: true,
      });

      // Add a more modern map style
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(mapRef.current);

      // Add markers for all points
      coordinates.forEach((point) => {
        // Different colors for start, intermediate and end points
        let color;
        if (point.isStart) {
          color = "#e03131"; // Red for start
        } else if (point.isEnd) {
          color = "#2f9e44"; // Green for end
        } else {
          color = "#fea709"; // Olive green for intermediate points (changed from blue)
        }

        const icon = createNumberedIcon(point.dayIndex, color);

        L.marker([point.lat, point.lng], { icon })
          .addTo(mapRef.current)
          .bindPopup(`<b>Day ${point.dayIndex}</b><br>${point.title}`);
      });

      // First draw a temporary route with straight lines to show immediately
      const initialRoute = L.polyline(
        coordinates.map((coord) => [coord.lat, coord.lng]),
        {
          color: "#fea709", // Olive green color
          weight: 3,
          opacity: 0.6,
          dashArray: "5, 5", // Dashed line to indicate temporary
          lineCap: "round",
          lineJoin: "round",
        }
      ).addTo(mapRef.current);

      // Add initial direction arrows
      L.polylineDecorator(initialRoute, {
        patterns: [
          {
            offset: "50%",
            repeat: 0,
            symbol: L.Symbol.arrowHead({
              pixelSize: 12,
              polygon: false,
              pathOptions: {
                color: "#fea709",
                fillOpacity: 0.6,
                weight: 3,
              },
            }),
          },
        ],
      }).addTo(mapRef.current);

      // Fit bounds to show all the points initially
      const bounds = L.latLngBounds(
        coordinates.map((coord) => [coord.lat, coord.lng])
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });

      // Add legend immediately
      const legend = L.control({ position: "bottomright" });
      legend.onAdd = function () {
        const div = L.DomUtil.create("div", "info legend");
        div.style.backgroundColor = "white";
        div.style.padding = "10px";
        div.style.borderRadius = "5px";
        div.style.boxShadow = "0 1px 5px rgba(0,0,0,0.2)";

        div.innerHTML = `
          <div style="margin-bottom: 5px;"><b>Tour Route</b></div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="background-color: #e03131; width: 15px; height: 15px; border-radius: 50%; margin-right: 8px;"></div>
            <span>Start Point</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="background-color: #fea709; width: 15px; height: 15px; border-radius: 50%; margin-right: 8px;"></div>
            <span>Intermediate Points</span>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 5px;">
            <div style="background-color: #2f9e44; width: 15px; height: 15px; border-radius: 50%; margin-right: 8px;"></div>
            <span>End Point</span>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 40px; height: 3px; background-color: #fea709; margin-right: 8px;"></div>
            <span>Road Route</span>
          </div>
        `;

        return div;
      };
      legend.addTo(mapRef.current);

      // Now calculate the actual road routes in the background
      // Primary function to fetch road-based route between two points using OSRM
      const fetchRouteOSRM = async (start, end) => {
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
          );
          const data = await response.json();

          if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
            return null;
          }

          return data.routes[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
        } catch (error) {
          return null;
        }
      };

      // Fallback function to use an alternative routing service (OpenRouteService)
      const fetchRouteAlternative = async (start, end) => {
        try {
          const response = await fetch(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248e404065386ce43cab9ed0cd37e901925&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
          );
          const data = await response.json();

          if (
            !data.features ||
            !data.features[0] ||
            !data.features[0].geometry ||
            !data.features[0].geometry.coordinates
          ) {
            return null;
          }

          return data.features[0].geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ]);
        } catch (error) {
          return null;
        }
      };

      // Combined function to try both routing services
      const fetchRoute = async (start, end) => {
        // Try OSRM first
        const osrmRoute = await fetchRouteOSRM(start, end);
        if (osrmRoute) return osrmRoute;

        // If OSRM fails, try alternative
        const alternativeRoute = await fetchRouteAlternative(start, end);
        if (alternativeRoute) return alternativeRoute;

        // If both fail, return null (will keep the straight line)
        return null;
      };

      // Function to fetch all route segments
      const fetchAllRouteSegments = async () => {
        const routeSegments = [];

        // Create route segments between consecutive points
        for (let i = 0; i < coordinates.length - 1; i++) {
          const segment = await fetchRoute(coordinates[i], coordinates[i + 1]);
          if (segment) {
            routeSegments.push(segment);
          } else {
            // Fallback to straight line if road routing fails
            routeSegments.push([
              [coordinates[i].lat, coordinates[i].lng],
              [coordinates[i + 1].lat, coordinates[i + 1].lng],
            ]);
          }
        }

        return routeSegments;
      };

      // Small, subtle calculating indicator
      const smallIndicator = L.control({ position: "bottomleft" });
      smallIndicator.onAdd = function () {
        const div = L.DomUtil.create("div", "calculating-indicator");
        div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        div.style.padding = "4px 8px";
        div.style.borderRadius = "4px";
        div.style.fontSize = "11px";
        div.style.color = "#666";
        div.innerHTML = "Improving routes...";
        return div;
      };
      smallIndicator.addTo(mapRef.current);

      // Fetch routes in the background and update the map when done
      setTimeout(() => {
        fetchAllRouteSegments().then((routeSegments) => {
          // Remove the small indicator
          mapRef.current.removeControl(smallIndicator);

          if (routeSegments.length === 0) {
            return; // Keep the initial straight lines
          }

          // Remove the initial route
          mapRef.current.removeLayer(initialRoute);

          // Create polylines for each route segment
          const polylines = routeSegments.map((segment, index) => {
            return L.polyline(segment, {
              color: "#fea709", // Olive green color
              weight: 3, // Slightly thicker for better visibility
              opacity: 1, // Full opacity
              lineCap: "round",
              lineJoin: "round",
            }).addTo(mapRef.current);
          });

          // Add arrow decorations to show direction on each segment
          routeSegments.forEach((segment, index) => {
            if (segment.length >= 2) {
              const polyline = L.polyline(segment);

              L.polylineDecorator(polyline, {
                patterns: [
                  {
                    offset: "50%",
                    repeat: 0,
                    symbol: L.Symbol.arrowHead({
                      pixelSize: 12,
                      polygon: false,
                      pathOptions: {
                        color: "#fea709", // Match route color
                        fillOpacity: 1,
                        weight: 3,
                      },
                    }),
                  },
                ],
              }).addTo(mapRef.current);
            }
          });

          // Recalculate bounds to include all route points
          const routeBounds = L.latLngBounds([]);
          routeSegments.flat().forEach((point) => {
            routeBounds.extend(point);
          });

          // Fit map to show all routes
          mapRef.current.fitBounds(routeBounds, {
            padding: [50, 50],
            animate: true,
            duration: 0.5,
          });
        });
      }, 100); // Small delay to ensure the map renders first
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [tour]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        position: "relative",
      }}
    />
  );
};

export default LeafletMap;
