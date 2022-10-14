import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import produce from "immer";
import PlaneStats from "./PlaneStats";
import "./index.css";

const initialState = {
  altitude: 1200,
  airspeed: 120,
  position: {
    latitude: 72,
    longitude: 42,
  },
  plannedRoute: ["KBOS", "KBED", "KORH"],
  seats: {
    0: { name: "Dave" },
    1: null,
    2: null,
    3: null,
  },
};

const updateAltitude = (alt) => ({
  type: "UPDATE_ALTITUDE",
  payload: alt,
});

const updateLatitude = (lat) => ({
  type: "UPDATE_LATITUDE",
  payload: lat,
});

const updateSeat = (name, index) => ({
  type: "UPDATE_SEAT",
  payload: { name: name, index: index },
});

const updatePilot = (name) => ({
  type: "UPDATE_PILOT",
  payload: name,
});

const addRoute = (route) => ({
  type: "ADD_ROUTE",
  payload: route,
});

const clearRoutes = () => ({ type: "CLEAR_ROUTES" });

function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "UPDATE_ALTITUDE":
        draft.altitude = action.payload;
        return draft;
      case "UPDATE_LATITUDE":
        draft.position.latitude = action.payload;
        return draft;
      case "UPDATE_SEAT":
        draft.seats[action.payload.index] = { name: action.payload.name };
        return draft;
      case "UPDATE_PILOT":
        draft.seats[0] = { name: action.payload };
        return draft;
      case "ADD_ROUTE":
        draft.plannedRoute.push(action.payload);
        return draft;
      case "CLEAR_ROUTES":
        draft.plannedRoute = [];
        return draft;
    }
  });
}

const store = createStore(reducer);

store.dispatch(updateAltitude(1300));
store.dispatch(updateLatitude(23));
store.dispatch(updateSeat("Matt", 1));
store.dispatch(updatePilot("Lynne"));
store.dispatch(addRoute("KASH"));
// Uncomment below to clear routes array.
// store.dispatch(clearRoutes());

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PlaneStats />
  </Provider>
);
