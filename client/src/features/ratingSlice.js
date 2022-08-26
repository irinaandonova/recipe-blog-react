const { createSlice } = require("@reduxjs/toolkit");

const initialState = { ratingArr: [], rating: 3 };
const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        getRating: (state, action) => {
            state.ratingArr = action.payload.ratingArr;
            if(state.ratingArr.length === 0) {
                state.rating = 3;
            } 
        }
    }
});

export const { getRating } = ratingSlice.actions;
export default ratingSlice.reducer;