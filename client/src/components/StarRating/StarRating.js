import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/authContext";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recipeService from "../../services/recipeService";


const blackStar = <FontAwesomeIcon icon={faStar} color={'#020202'}/>;
const whiteStar = <FontAwesomeIcon icon={faStar} color={'#cac6c6'}/>;


const StarRating = () => {
    const { userInfo } = useContext(AuthContext);
    const dispatch = useDispatch();
    const rating = useSelector((state) => state.rating.rating);
    console.log(rating);
    const onVoteHandler = async (e) => {
        const rating = e.value;


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
                [...Array(5)].map((x, index) => {
                    const ratingValue = index + 1;
                    ratingValue <= rating ?
                        x =
                        <label htmlFor="rating" className="star-label">
                            <input type="radio" name="rating" className="star-btn"  value={ratingValue}/>
                            {blackStar}
                        </label>
                        :
                        x =
                        <label htmlFor="rating" className="star-label">
                            <input type="radio" name="rating" className="star-btn" value={ratingValue}/>
                            {whiteStar}
                        </label>
                    return x;
                })
            }
        </article>
    )



}

export default StarRating;