import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/authContext";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recipeService from "../../services/recipeService";
import { rateRecipe } from "../../features/ratingSlice";
import { useParams } from "react-router-dom";

const blackStar = <FontAwesomeIcon icon={faStar} color={'#020202'}/>;
const whiteStar = <FontAwesomeIcon icon={faStar} color={'#cac6c6'}/>;


const StarRating = () => {
    const { userInfo } = useContext(AuthContext);
    const { _id } = useParams();

    const dispatch = useDispatch();
    const rating = useSelector((state) => state.rating);
    
    const onVoteHandler = async (e) => {
        const ratingValue = e.target.value;

        if(!userInfo._id) {
            return (
                <p>You need to sign in your profile before logging in!</p>
            )
        }
        const ratingInfo = {
            userId: userInfo._id,
            rating: ratingValue,
            recipeId: _id
        }
        try {
            const response = await recipeService.rateRecipe({ ratingInfo });

            if (response.status === 'ok') {
                dispatch(rateRecipe({ userId: userInfo._id, rating: ratingValue }));
            }
        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <article className="stars-article">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    index < rating.rating ?
                        star =
                        <label className="star-label" key={index}>
                            <input type="radio" className="star-btn" value={ratingValue} onClick={onVoteHandler} />
                            <FontAwesomeIcon icon={faStar} color={'#020202;'} />
                        </label>
                        :
                        star =
                        <label className="star-label">
                            <input type="radio" className="star-btn white" value={ratingValue} onClick={onVoteHandler} />
                            <FontAwesomeIcon icon={faStar} color={'#cac6c6'} />
                        </label>
                    return star;
                })}
            </article>
    )



}

export default StarRating;