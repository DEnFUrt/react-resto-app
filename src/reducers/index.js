const initialState = {
  menu: [],
  loading: true,
  errorState: {
    error: false,
    errorMessage: null,
  },
  items: [],
  cost: 0,
}

const findItem = (arr, id) => arr.find(data => data.id === id);
const getCost = (arr) => arr.reduce((acc, item) => acc + (+item.price * +item.count), 0);

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false,
        errorState: {
          error: false,
          errorMessage: null,
        },
      };

    case 'MENU_REQUESTED':
        return {
          ...state,
          loading: true,
          errorState: {
            error: false,
            errorMessage: null,
          },
        };  
  
    case 'MENU_ERROR':
      return {
        ...state,
        loading: false,
        errorState: {
          error: true,
          errorMessage: action.errorMessage,
        },
      };
      
    case 'ITEM_ADD_TO_CART': {
      const id = action.payload;
      const targetItem = findItem(state.items, id);

      if (targetItem !== undefined) {
        return {
          ...state,
          items: state.items.map(item => item.id === targetItem.id ? {...item, count: ++targetItem.count} : item),
        }
      }

      // Если товара в корзине еще нет
      const item = findItem(state.menu, id);
        const newItem = {
          title: item.title,
          price: item.price,
          url: item.url,
          id: item.id,
          count: 1,
        }

      return {
        ...state,
        items: [...state.items, newItem],
      }
    };

    case 'ITEM_REMOVE_FROM_CART': 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    

    case 'RE_COUNT_ITEM_FROM_CART': {
      const targetItem = findItem(state.items, action.payload);
      const newCount = targetItem.count > 0 ? --targetItem.count : 0;

      return {
        ...state,
        items: state.items.map(item => item.id === targetItem.id ? {...item, count: newCount} : item),
      }
    };

    case 'COST_COUNT' :
      return {
        ...state,
        cost: getCost(state.items)
      };

    case 'CLEAR_CART' :
      return {
        ...state,
        items: [],
      }

    default:
      return state;
  }
}

export default reducer;