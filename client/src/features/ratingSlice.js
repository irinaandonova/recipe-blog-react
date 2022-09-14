const { createSlice } = require("@reduxjs/toolkit");

const initialState = { ratingArr: [], rating: 3 };

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        getRatings: (state, action) => {
            state.ratingArr = action.payload.ratingArr;

            if (state.ratingArr.length === 0) {
                state.rating = 3;
            }
            else {
                let allRatings = 0;

                for (const rating of state.ratingArr) {
                    allRatings += rating.rating;
                }
                state.rating = allRatings / state.ratingArr.length;
            }
        },
        rateRecipe: (state, action) => {
            let userId = action.payload.userId;
            let ratingValue = action.payload.rating;
            const index = state.ratingArr.findIndex(x => x.userId.toString() === userId);

            if (index !== -1) {
                state.ratingArr[index].rating = Number(ratingValue);
            }
            else {
                state.ratingArr.push({ userId, rating: ratingValue });
            }

            let allRatings = 0;
            for (const rating of state.ratingArr) {
                allRatings += Number(rating.rating);
            }
            state.rating = allRatings / state.ratingArr.length;
        }
    }
});

export const { getRatings, rateRecipe } = ratingSlice.actions;
export default ratingSlice.reducer;


