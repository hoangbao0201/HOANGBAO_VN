import { configureStore } from "@reduxjs/toolkit";
import blogEditSlide from "./blogEditSlide";
import alertMessageSlide from "./alertMessageSlide";

const store = configureStore({
    reducer: {
        blogEdit: blogEditSlide,
        alertMessage: alertMessageSlide,
    },
});

export default store;
