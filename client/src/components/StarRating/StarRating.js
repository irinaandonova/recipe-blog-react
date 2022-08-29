import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../context/authContext";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recipeService from "../../services/recipeService";
import { rateRecipe } from "../../features/ratingSlice";
import { useNavigate, useParams } from "react-router-dom";
import ModalPopUp from "../Common/ModalPopUp";

const StarRating = () => {
    const [showModal, setShowModal] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const { _id } = useParams();

    const dispatch = useDispatch();
    const rating = useSelector((state) => state.rating);
    const navigate = useNavigate();
    const onVoteHandler = async (e) => {
        const ratingValue = e.target.value;

        if (!userInfo._id) {
            setShowModal(true);
            return;
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
        <article className="stars-modal-article">
            <ModalPopUp show={showModal} onClose={() => setShowModal(false)} onNavigate={() => navigate('/auth/login')} warningMessage={"You can't rate a recipe without signing in!"} />
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
                        <label className="star-label" key={index}>
                            <input type="radio" className="star-btn white" value={ratingValue} onClick={onVoteHandler} />
                            <FontAwesomeIcon icon={faStar} color={'#cac6c6'} />
                        </label>
                    return star;
                })}
            </article>
        </article>

    )



}

export default StarRating;