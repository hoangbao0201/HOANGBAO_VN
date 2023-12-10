import { createSlice } from "@reduxjs/toolkit";
import { TagProps } from "@/lib/services/blog.service";


export interface AlertMessageSlideProps {
    messages: string[]
}
const initialState: AlertMessageSlideProps = {
    messages: [],
};

export const counterSlice = createSlice({
    name: "alertMessage",
    initialState,
    reducers: {
        setAlertMessageRDHandle: (state, action) => {
            state.messages.push(action.payload);
        },
        removeAlertMessageRDHandle: (state) => {
            state.messages = state.messages.slice(1);
        },
    },
});

export const { setAlertMessageRDHandle, removeAlertMessageRDHandle } =
    counterSlice.actions;

export default counterSlice.reducer;
