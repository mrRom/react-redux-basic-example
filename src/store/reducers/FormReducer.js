const FormReducer = (state={
    login: "",
    password: "",
    isLoading: false,
    data: {},
	error: false
}, action) => {
    switch (action.type) {
        case "RECV_ERROR":
            state = {...state,
                isLoading: false,
                error: true
            };
            break;
		case "RECV_DATA":
            state = {...state,
                isLoading: false,
                data: action.data,
                error: false
            };
            break;
		case "REQ_DATA":
            state = {...state,
                isLoading: true,
                error: false
            };
            break;
        case "CHANGE_LOGIN":
            state = {...state,
                login: action.payload
            };
            break;
        case "CHANGE_PASSWORD":
            state = {...state,
                password: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};
export default FormReducer;
