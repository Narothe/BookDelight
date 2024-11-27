import React from 'react';
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";

function LinkButton({ text, link }) {

    return (
        <Button variant="contained" component={Link} to={link}>{text}</Button>
    );
}

export default LinkButton;
