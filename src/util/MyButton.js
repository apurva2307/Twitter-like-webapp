import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';


function MyButton({ children, onClick, tipTitle, btnClassName, tipClassName, placement }) {
    return (
        <Tooltip title={tipTitle} className={tipClassName} placement={placement}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

export default MyButton;
