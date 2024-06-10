import {
    RESTORE_DATA, RESTORE_DATA_FINISHED,
    MODIFY_MEMBERS,
    GENERATE_DATA, GENERATE_DATA_FINISHED,
} from "../_constant";

const initialState = {
    members: [],
    loadingMembers: false,
    sortedMembers: [],
    loadingSortedMembers: false
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case RESTORE_DATA:
            return { ...state, loadingMembers: true };
        case RESTORE_DATA_FINISHED:
            return { ...state, loadingMembers: false, members: action.payload };
        case MODIFY_MEMBERS:
            return { ...state, members: action.payload };
        case GENERATE_DATA:
            return { ...state, loadingSortedMembers: true };
        case GENERATE_DATA_FINISHED:
            return { ...state, loadingSortedMembers: false, sortedMembers: action.payload };
        default:
            return state;
    };
};
