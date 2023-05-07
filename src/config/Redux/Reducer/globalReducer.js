const initialState = {
  isUpdate: false,
  dataProducts: [],
  dataDetailProducts: {},
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_PRODUCTS":
      return {
        ...state,
        dataProducts: action.payload,
      };
    case "SET_DATA_DETAIL_PRODUCT":
      return {
        ...state,
        dataDetailProducts: action.payload,
      };
    case "IS_UPDATE_PRODUCT":
      return {
        ...state,
        isUpdate: action.payload,
      };

    default:
      return state;
  }
};
export default globalReducer;
