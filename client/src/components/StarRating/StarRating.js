import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/authContext";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import * as recipeService from "../../services/recipeService";


const star = <FontAwesomeIcon icon={faStar} />;

const StarRating = () => {
    const { userInfo } = useContext(AuthContext);
    const dispatch = useDispatch()
    const onVoteHandler = async (e) => {
        const rating = e.value;
        console.log(rating);

        const ratingInfo = {
            userId: userInfo._id,
            rating
        }
        try {
            const response = await recipeService.rateRecipe([ratingInfo]);

            if (response.status === 'ok') {
                dispatch()
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <article className="star-rating-article">
            {
                [...Array(5).map((x, index) => {
                    <label htmlFor="rating">
                        <input type="radio" name="rating"/>
                        {star}
                    </label>
                })]
            }
        </article>
    )



}

export default StarRating;