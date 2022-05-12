import axios from "axios";

export const getWord = async () => {
    const res = await axios('https://random-word-form.herokuapp.com/random/animal');
    return await res
}