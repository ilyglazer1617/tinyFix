import "./addReview.css";
import { useContext, useState } from "react";
import { GarageContext } from "./../../context/garageContext";

const AddReview = () => {
    const { newReview, setNewReview, addReviewToGarage, setAddReviewOpen } = useContext(GarageContext);
    console.log(newReview);
    return (
        <div className="addReviewForm">
            <form onSubmit={(ev) => addReviewToGarage(ev)}>
                <h2>:אמינות</h2>
                <div className="reliabilityRating">
                    <input
                        type="radio"
                        name="rating"
                        value="5"
                        id="5"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                reliability: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="5">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="4"
                        id="4"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                reliability: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="4">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="3"
                        id="3"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                reliability: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="3">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="2"
                        id="2"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                reliability: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="2">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="1"
                        id="1"
                        required
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                reliability: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="1">☆</label>
                </div>
                <h2>:מקצועיות</h2>
                <div className="professionailtyRating">
                    <input
                        type="radio"
                        name="rating1"
                        value="5"
                        id="10"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                prfessionalism: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="10">☆</label>
                    <input
                        type="radio"
                        name="rating1"
                        value="4"
                        id="9"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                prfessionalism: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="9">☆</label>
                    <input
                        type="radio"
                        name="rating1"
                        value="3"
                        id="8"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                prfessionalism: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="8">☆</label>
                    <input
                        type="radio"
                        name="rating1"
                        value="2"
                        id="7"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                prfessionalism: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="7">☆</label>
                    <input
                        type="radio"
                        name="rating1"
                        value="1"
                        id="6"
                        required
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                prfessionalism: ev.target.value,
                            })
                        }
                    />
                    <label htmlFor="6">☆</label>
                </div>
                <h2>:טקסט חופשי</h2>
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    onChange={(ev) =>
                        setNewReview({
                            ...newReview,
                            text: ev.target.value,
                        })
                    }
                ></textarea>
                <br />
                <button>שלח</button>
            </form>
        </div>
    );
};

export default AddReview;
