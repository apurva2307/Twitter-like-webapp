import { SET_SCREAMS, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, POST_SCREAM, SUBMIT_COMMENT } from "../types";

const initialState = {
    screams: [],
    scream: {},
    loading: false
};

export default function dataReducer(state = initialState, action) {
    switch(action.type){
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
                loading: false
            };
        case LIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                return {
                    ...state,
                    scream: {
                        ...state.scream,
                        likeCount: state.scream.likeCount + 1
                    }
                }
            } else {
                return {
                    ...state,
                }
            }
        case UNLIKE_SCREAM:
            let index1 = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index1] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                return {
                    ...state,
                    scream: {
                        ...state.scream,
                        likeCount: state.scream.likeCount - 1
                    }
                }
            } else {
                return {
                    ...state,
                }
            }
            
        case DELETE_SCREAM:
            // index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            // delete state.screams[index];
            const updatedScreams =  state.screams.filter((scream) => scream.screamId !== action.payload)
            return {
                ...state,
                screams: updatedScreams
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [action.payload, ...state.screams]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments],
                    commentCount: state.scream.commentCount + 1
                }
            }
        case LOADING_DATA: 
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}