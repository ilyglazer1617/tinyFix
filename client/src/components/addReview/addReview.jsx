import "./addReview.css";
import { useState } from "react";

const AddReview = () => {
    const [newReview, setNewReview] = useState({});
    console.log(newReview);
    return (
        <>
            <form action="">
                <h2>:אמינות</h2>
                <div class="reliabilityRating">
                    <input
                        type="radio"
                        name="rating"
                        value="5"
                        id="5"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="5">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="4"
                        id="4"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="4">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="3"
                        id="3"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="3">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="2"
                        id="2"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="2">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="1"
                        id="1"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="1">☆</label>
                </div>
                <div class="reliabilityRating">
                    <input
                        type="radio"
                        name="rating"
                        value="5"
                        id="5"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="5">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="4"
                        id="4"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="4">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="3"
                        id="3"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="3">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="2"
                        id="2"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="2">☆</label>
                    <input
                        type="radio"
                        name="rating"
                        value="1"
                        id="1"
                        onChange={(ev) =>
                            setNewReview({
                                ...newReview,
                                professionality: ev.target.value,
                            })
                        }
                    />
                    <label for="1">☆</label>
                </div>
            </form>
        </>
    );
};

export default AddReview;
