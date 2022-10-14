import * as ReactDOMClient from "react-dom/client";
import CashDrawer from "./CashDrawer";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import produce from "immer";
import "./index.css";

const initialState = [
  { id: 0, type: "SALE", value: 3.99 },
  { id: 1, type: "REFUND", value: -2.99 },
  { id: 2, type: "SALE", value: 13.99 },
];

const newTrans = (id, type, value) => {
  return { id: id, type: type, value: value };
};

const firstTrans = newTrans(3, "SALE", 100.59);
const secondTrans = newTrans(4, "REFUND", 20.21);
const thirdTrans = newTrans(5, "REFUND", 10.43);

const addBeginningEvent = (trans) => ({
  type: "ADD_BEGINNING",
  payload: trans,
});

const addEndingEvent = (trans) => ({
  type: "ADD_ENDING",
  payload: trans,
});

const addSecondEvent = (trans) => ({
  type: "ADD_SECOND",
  payload: trans,
});

const removeEvent = (index) => ({
  type: "REMOVE_EVENT",
  payload: index,
});

const removeID = (eventID) => ({
  type: "REMOVE_ID",
  payload: eventID,
});

const onlySales = () => ({
  type: "ONLY_SALES",
});
function reducer(state = initialState, action) {
  console.log(action);
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_BEGINNING":
        draft.unshift(action.payload);
        return draft;
      case "ADD_ENDING":
        draft.push(action.payload);
        return draft;
      case "ADD_SECOND":
        draft.splice(1, 0, action.payload);
        return draft;
      case "REMOVE_EVENT":
        return draft.filter((_, index) => index !== action.payload);
      case "REMOVE_ID":
        return draft.filter((item) => item.id !== action.payload);
      case "ONLY_SALES":
        return draft.filter((item) => item.type === "SALE");
    }
  });
}

const store = createStore(reducer);

store.dispatch(addBeginningEvent(firstTrans));
store.dispatch(addEndingEvent(secondTrans));
store.dispatch(addSecondEvent(thirdTrans));
store.dispatch(removeEvent(1));
store.dispatch(removeID(1));
store.dispatch(onlySales());

const App = () => (
  <Provider store={store}>
    <CashDrawer />
  </Provider>
);

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);
